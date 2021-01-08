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

            <div v-if="isCriminalOffencesSectionComplete()">
              <CriminalOffencesSummary
                :character-information="characterInformation"
                :can-edit="isDraftApplication"
                :display-change-link="isInformationReview"
              />
            </div>
            <span
              v-else
              class="govuk-body"
            >No information provided</span>

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Fixed penalty notices, (including motoring)
              </h2>
            </div>

            <div v-if="isFixedPenaltiesSectionComplete()">
              <FixedPenaltiesSummary
                :character-information="characterInformation"
                :can-edit="isDraftApplication"
                :display-change-link="isInformationReview"
              />
            </div>
            <span
              v-else
              class="govuk-body"
            >No information provided</span>

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Motoring Offences
              </h2>
            </div>

            <div v-if="isMotoringOffencesSectionComplete()">
              <MotoringOffencesSummary
                :character-information="characterInformation"
                :can-edit="isDraftApplication"
                :display-change-link="isInformationReview"
              />
            </div>
            <span
              v-else
              class="govuk-body"
            >No information provided</span>

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Financial Matters
              </h2>
            </div>

            <div v-if="isFinancialOffencesSectionComplete()">
              <FinancialMattersSummary
                :character-information="characterInformation"
                :can-edit="isDraftApplication"
                :display-change-link="isInformationReview"
              />
            </div>
            <span
              v-else
              class="govuk-body"
            >No information provided</span>

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Professional Conduct
              </h2>
            </div>

            <div v-if="isProfessionalConductSectionComplete()">
              <ProfessionalConductSummary
                :character-information="characterInformation"
                :can-edit="isDraftApplication"
                :display-change-link="isInformationReview"
              />
            </div>
            <span
              v-else
              class="govuk-body"
            >No information provided</span>

            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m"
                style="display:inline-block;"
              >
                Further Information to be disclosed
              </h2>
            </div>

            <div v-if="isFurtherInformationSectionComplete()">
              <FurtherInformationSummary
                :character-information="characterInformation"
                :can-edit="isDraftApplication"
                :display-change-link="isInformationReview"
              />
            </div>
            <span
              v-else
              class="govuk-body"
            >No information provided</span>
          </div>

          <div class="govuk-grid-row">
            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-m govuk-!-margin-left-3"
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
              >
                <span>
                  {{ declarationText1 }}
                </span>
              </Checkbox>
            </div>
          </div>

          <div class="govuk-grid-row">
            <div class="govuk-grid-column-full">
              <Checkbox
                id="declaration2"
                v-model="characterInformation.declaration2"
                multiline-label
              >
                <span>
                  {{ declarationText2 }}
                </span>
              </Checkbox>
            </div>
          </div>

          <div class="govuk-grid-row">
            <div class="govuk-grid-column-full">
              <Checkbox
                id="declaration3"
                v-model="characterInformation.declaration3"
                multiline-label
              >
                <span>
                  {{ declarationText3 }}
                </span>
              </Checkbox>
            </div>

            <div class="govuk-body govuk-!-font-weight-bold govuk-!-margin-left-3">
              Please note that you can edit or update this character declaration information up until your final application submission.
            </div>

            <StartButton
              v-if="isDraftApplication"
              class="govuk-!-margin-top-5 govuk-!-margin-left-3 govuk-button--success"
              @click="save"
            >
              Save and continue
            </StartButton>
          </div>
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
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus';
import { DECLARATION1, DECLARATION2, DECLARATION3 } from '@/helpers/constants';

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
  extends: CharacterInformationStatus,
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
      declarationText1: DECLARATION1,
      declarationText2: DECLARATION2,
      declarationText3: DECLARATION3,
    };
  },
  computed: {
    isDraftApplication() {
      return this.application.status === 'draft';
    },
    isInformationReview() {
      return this.$route.name === 'character-information-review';
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
        this.updateProgress();
        this.application.characterInformationV2 = this.characterInformation;
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
