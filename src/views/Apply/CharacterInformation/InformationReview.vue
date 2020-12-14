<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />

        <div class="govuk-grid-row govuk-!-margin-left-1">
          <h2 class="govuk-heading-l">
            Check your character declaration information
          </h2>

          <div>
            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Criminal Offences
              </h2>
            </div>

            <CriminalOffencesSummary
              :application="application"
              :can-edit="isDraftApplication"
            />

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Fixed penalty notices, (including motoring)
              </h2>
            </div>

            <FixedPenaltiesSummary
              :application="application"
              :can-edit="isDraftApplication"
            />

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Motoring Offences
              </h2>
            </div>

            <MotoringOffencesSummary
              :application="application"
              :can-edit="isDraftApplication"
            />

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Financial Matters
              </h2>
            </div>

            <FinancialMattersSummary
              :application="application"
              :can-edit="isDraftApplication"
            />

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Professional Conduct
              </h2>
            </div>

            <ProfessionalConductSummary
              :application="application"
              :can-edit="isDraftApplication"
            />

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Further Information to be disclosed
              </h2>
            </div>

            <FurtherInformationSummary
              :application="application"
              :can-edit="isDraftApplication"
            />
          </div>

          <div class="govuk-grid-row govuk-!-margin-left-1">
            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Save character information declaration
              </h2>
            </div>
            <ErrorSummary :errors="errors" />
          </div>

          <div class="govuk-grid-row">
            <div class="govuk-grid-column-full">
              <Checkbox
                id="declaration1"
                v-model="characterInformation.declaration1"
                multiline-label
                class="govuk-!-margin-left-0 custom"
              >
                <span> I understand that it is my continuing duty, throughout the time that my application is being considered, to inform the Selection Exercise Team of all relevant matters that might affect the acceptability of my application when considered against this guidance.</span>
              </Checkbox>
            </div>
          </div>

          <div class="govuk-grid-row">
            <div class="govuk-grid-column-full">
              <Checkbox
                id="declaration2"
                v-model="characterInformation.declaration2"
                multiline-label
                class="govuk-!-margin-left-0"
              >
                I understand that failure to declare on the application form relevant information which later comes to light is likely to rule out further consideration of my application.
              </Checkbox>
            </div>
          </div>

          <div class="govuk-grid-row">
            <div class="govuk-grid-column-full">
              <Checkbox
                id="declaration3"
                v-model="characterInformation.declaration3"
                multiline-label
                class="govuk-!-margin-left-0"
              >
                <span class="govuk-!-padding-top-0">I also understand that failure to disclose information additional to that included on my application for, upon the request of the JAC and to the timetable requested by the JAC, may also rule out further consideration of my application.
                </span>
              </Checkbox>
            </div>
          </div>

          <div class="govuk-grid-row govuk-!-margin-left-1">
            <div class="govuk-body govuk-!-font-weight-bold">
              Please note that you can edit or update this character declaration information up until your final application submission.
            </div>
          </div>

          <StartButton
            v-if="isDraftApplication"
            class="govuk-!-margin-top-5 govuk-button--success"
            @click="save"
          >
            Save and continue
          </StartButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary';
import BackLink from '@/components/BackLink';
import CriminalOffencesSummary from './InformationReview/CriminalOffencesSummary';
import FixedPenaltiesSummary from './InformationReview/FixedPenaltiesSummary';
import MotoringOffencesSummary from './InformationReview/MotoringOffencesSummary';
import FinancialMattersSummary from './InformationReview/FinancialMattersSummary';
import ProfessionalConductSummary from './InformationReview/ProfessionalConductSummary';
import FurtherInformationSummary from './InformationReview/FurtherInformationSummary';
import StartButton from '@/components/Page/StartButton';
import Checkbox from '../../../components/Form/Checkbox';
import Form from '@/components/Form/Form';

export default {
  components: {
    Checkbox,
    FurtherInformationSummary,
    ProfessionalConductSummary,
    FinancialMattersSummary,
    MotoringOffencesSummary,
    FixedPenaltiesSummary,
    CriminalOffencesSummary,
    BackLink,
    ErrorSummary,
    StartButton,
  },
  extends: Form,
  data() {
    const defaults = {
      declaration1: null,
      declaration2: null,
      declaration3: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    const application = this.$store.getters['application/data']();
    return {
      characterInformation: characterInformation,
      application: application,
    };
  },
  computed: {
    isDraftApplication() {
      return this.application.status === 'draft';
    },
  },
  methods: {
    validateDeclaration() {
      if (this.characterInformation.declaration1 !== true ||
        this.characterInformation.declaration2 !== true ||
        this.characterInformation.declaration3 !== true) {
        this.errors.push({ id: 'error', message: 'Please check all boxes to continue' });
        return false;
      }
      return true;
    },
    async save() {
      this.validate();
      if (this.isValid() && this.validateDeclaration()) {
        this.application.characterInformation = this.characterInformation;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .govuk-summary-list__value,
  .govuk-summary-list__value:last-child,
  .govuk-summary-list__key {
    @include govuk-media-query($from: tablet) {
      width: auto;
    }
  }
  .change-link {
    float: right;
  }
</style>
