<template>
  <div
    v-if="qualifyingTestResponse"
    class="govuk-grid-column-two-thirds"
  >
    <h1 class="govuk-heading-l">
      {{ qualifyingTestResponse.qualifyingTest.title }}
    </h1>

    <Banner
      v-if="hasCompleted"
      status="information"
    >
      <template>
        You have already finished this test.
      </template>
    </Banner>

    <template v-else>
      <ErrorSummary :errors="errors" />

      <h2 class="govuk-heading-m">
        Important information
      </h2>

      <ul class="govuk-list govuk-list--bullet">
        <li
          v-if="numberOfQuestions"
        >
          This test contains
          <b style="white-space: pre;">
            {{ numberOfQuestions }}
          </b>
        </li>
        <li>
          You have <b>{{ qualifyingTestResponse.duration.testDurationAdjusted }} minutes</b> to complete this test.
          <span v-if="extraTime"> This includes <b>{{ extraTimeAmount }} minutes</b> of reasonable adjustment time.</span>
        </li>
        <li>
          You must submit your test by <b>{{ endTime }}</b>.
        </li>
        <li>
          Make sure you've got a stable internet connection before you start.
        </li>
        <li>
          Your answers will be saved as you go through the test, but you can still edit them at the end before you submit your test.
        </li>
        <li>
          If you run out of time, we will submit whatever answers you have completed up until that point.
        </li>
      </ul>

      <template v-if="hasAdditionalInstructions">
        <h2 class="govuk-heading-m">
          Additional instructions
        </h2>

        <ul class="govuk-list govuk-list--bullet">
          <li
            v-for="(instruction, index) in additionalInstructions"
            :key="index"
          >
            {{ instruction.text }}
          </li>
        </ul>
      </template>

      <form
        ref="formRef"
        @submit.prevent="onSubmit"
      >
        <Banner
          v-if="qtNotActivatedYet"
          status="information"
        >
          <template>
            This online test is not open yet.
          </template>
        </Banner>

        <fieldset
          v-else
          class="govuk-fieldset"
        >
          <template v-if="!hasStarted">
            <Checkbox
              id="confirm-checkbox"
              ref="confirm-checkbox"
              v-model="confirmationChecked"
              name="confirm-checkbox"
              required
              :messages="{'required': 'Please confirm you agree'}"
            >
              <b>I confirm I will keep this test confidential and not share scenarios or questions at any point during or after the selection exercise.</b>
            </Checkbox>

            <StartButton
              :disabled="!confirmationChecked"
            >
              Start now
            </StartButton>
          </template>
          <StartButton v-else>
            Continue
          </StartButton>
        </fieldset>
      </form>
    </template>
  </div>
</template>
<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import Checkbox from '@/components/Form/Checkbox';
import StartButton from '@/components/Page/StartButton';
import Banner from '@/components/Page/Banner';
import { isToday, formatDate } from '@/helpers/date';
import { QUALIFYING_TEST } from '@/helpers/constants';

export default {
  components: {
    ErrorSummary,
    Checkbox,
    StartButton,
    Banner,
  },
  extends: Form,
  data() {
    return {
      confirmationChecked: false,
    };
  },
  computed: {
    qualifyingTestResponse() {
      return this.$store.getters['qualifyingTestResponse/data']();
    },
    endTime() {
      const time = formatDate(this.qualifyingTestResponse.qualifyingTest.endDate, 'time');
      const day = formatDate(this.qualifyingTestResponse.qualifyingTest.endDate);
      return isToday(this.qualifyingTestResponse.qualifyingTest.endDate) ? `${time} today` : `${time} on ${day}`;
    },
    extraTime() {
      return this.qualifyingTestResponse.duration.reasonableAdjustment != 0;
    },
    extraTimeAmount() {
      return this.qualifyingTestResponse.duration.testDurationAdjusted - this.qualifyingTestResponse.duration.testDuration;
    },
    numberOfQuestions() {
      const questions = this.qualifyingTestResponse.testQuestions.questions;
      const plural = questions.length > 1 ? 's' : '';
      let result;
      if (!(this.qualifyingTestResponse.qualifyingTest.type === 'scenario')) {
        result = `${questions.length} question${plural}`;
      } else {
        result = `${questions.length} Scenario${plural}:\n`;
        questions.forEach((question, index) => {
          result += ` Scenario ${index + 1} with ${question.options.length} question${question.options.length > 1 ? 's' : ''}`;
          if (!(index + 1 === questions.length)){
            result += ',\n';
          } else {
            result += '.';
          }
        });
      }
      return result;
    },
    additionalInstructions() {
      return this.qualifyingTestResponse.qualifyingTest.additionalInstructions;
    },
    hasStarted() {
      return this.qualifyingTestResponse.status === QUALIFYING_TEST.STATUS.STARTED && this.qualifyingTestResponse.statusLog.started != null;
    },
    hasCompleted() {
      return this.qualifyingTestResponse.status === QUALIFYING_TEST.STATUS.COMPLETED && this.qualifyingTestResponse.statusLog.completed != null;
    },
    hasAdditionalInstructions(){
      let result;
      this.additionalInstructions.forEach(instruction => {
        result = !!Object.keys(instruction).length;
      });
      return result;
    },
    qtNotActivatedYet() {
      return this.qualifyingTestResponse.status === QUALIFYING_TEST.STATUS.CREATED;
    },
    nextPage() {
      if (this.qualifyingTestResponse.qualifyingTest.type === QUALIFYING_TEST.TYPE.SCENARIO) {
        return {
          name: 'qualifying-test-scenario',
          params: {
            scenarioNumber: 1,
            questionNumber: 1,
          },
        };
      }
      return {
        name: 'qualifying-test-question',
        params: {
          questionNumber: 1,
        },
      };
    },
  },
  methods: {
    scrollToTop () {
      this.$el.scrollIntoView();
    },
    async onSubmit() {
      this.validate();
      if (this.isValid()) {
        try {
          if (this.hasStarted) {
            await this.$store.dispatch('qualifyingTestResponse/save', {});
            // ensures we refresh lastUpdated timestamps so we have a current `serverOffset`
          } else {
            if (!this.confirmationChecked) {
              throw new Error('You must agree to keep this test confidential.');
            }
            await this.$store.dispatch('qualifyingTestResponse/startTest');
          }
          this.$router.push(this.nextPage);
        } catch (error) {
          this.errors.push({ message: error.message });
          this.scrollToTop();
        }
      }
    },
  },
};
</script>
