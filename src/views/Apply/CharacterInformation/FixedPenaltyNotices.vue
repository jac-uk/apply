<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />

        <div class="govuk-grid-row">
          <div class="govuk-grid-column-three-quarters">
            <h2 class="govuk-heading-l">
              Fixed Penalty Notices
            </h2>

            <ErrorSummary
              :errors="errors"
              :show-save-button="true"
              @save="save"
            />

            <RadioGroup
              id="fixed-penalties"
              v-model="characterInformation.fixedPenalties"
              required
              label="3. Have you received a fixed penalty notice in the last 4 years?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.fixedPenaltyDetails"
                  required
                  :component="repeatableFields.FixedPenaltyDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
          <div class="govuk-grid-column-one-quarter">
            <InfoIcon
              :url="fixedPenaltyNotices"
            />
          </div>
        </div>
        <button
          :disabled="application.status != 'draft'"
          class="govuk-button info-btn--character-information--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import RepeatableFields from '@/components/RepeatableFields';
import FixedPenaltyDetails from '@/components/RepeatableFields/CharacterInformation/FixedPenaltyDetails';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus';
import BackLink from '@/components/BackLink';
import InfoIcon from '@/components/ModalViews/InfoIcon';
import { FIXED_PENALTY_NOTICES_URL } from './character-information-constants';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    RepeatableFields,
    BackLink,
    InfoIcon,
  },
  extends: CharacterInformationStatus,
  data() {
    const defaults = {
      fixedPenalties: null,
      fixedPenaltyDetails: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    const application = this.$store.getters['application/data']();
    return {
      characterInformation: characterInformation,
      application: application,
      repeatableFields: {
        FixedPenaltyDetails,
      },
      fixedPenaltyNoticesUrl: FIXED_PENALTY_NOTICES_URL,
    };
  },
  computed: {
    fixedPenaltyNotices() {
      return this.fixedPenaltyNoticesUrl;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.updateProgress();
        if (this.characterInformation.fixedPenalties === false ) {
          this.characterInformation.fixedPenaltyDetails = null;
        }
        this.application.characterInformationV2 = this.characterInformation;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);

        if (this.application.progress.characterInformation === true) {
          this.$router.push({ name: 'character-information-review' });
        } else {
          this.$router.push({ name: 'character-information-motoring-offences' });
        }
      }
    },
  },
};
</script>

