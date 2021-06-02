<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Statement of eligibility
        </h1>

        <ErrorSummary :errors="errors" />

        <div v-if="vacancy.aSCApply && vacancy.selectionCriteria">
          <div
            v-for="(item, index) in vacancy.selectionCriteria"
            :key="index"
          >
            <p
              class="govuk-heading-m govuk-!-font-weight-bold"
            >
              {{ item.title }}
            </p>
            <!-- eslint-disable -->
            <div 
              class="govuk-body" 
              v-html="item.text"
            />
            <!-- eslint-enable -->

            <RadioGroup
              :id="`meet_requirements_${index}`"
              v-model="application.selectionCriteriaAnswers[index].answer"
              label="Do you meet this requirement?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <TextareaInput
                  :id="`meet_requirements_details${index}`"
                  v-model="application.selectionCriteriaAnswers[index].answerDetails"
                  label="In 250 words, tell us how."
                  required
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
        </div>

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button info-btn--statement-of-eligibility--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  data(){
    const defaults = {
      selectionCriteriaAnswers: [],
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    const vacancy = this.$store.state.vacancy.record;
    if (vacancy && vacancy.aSCApply && vacancy.selectionCriteria) {
      const aSCArray = [];
      for (let i = 0, len = vacancy.selectionCriteria.length; i < len; ++i) {
        aSCArray.push({
          answer: null,
          answerDetails: null,
        });
        application.selectionCriteriaAnswers = aSCArray;
      }
    }
    return {
      application: application,
      files: {},
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.currentUser.uid;
    },
    vacancy() {
      return this.$store.state.vacancy.record;
    },
  },
  methods: {
    async save() {
      this.validate();

      if (this.isValid()) {
        this.application.progress.statementOfEligibility = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
