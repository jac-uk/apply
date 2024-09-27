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
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--character-information--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import RepeatableFields from '@/components/RepeatableFields.vue';
import FixedPenaltyDetails from '@/components/RepeatableFields/CharacterInformation/FixedPenaltyDetails.vue';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus.vue';
import BackLink from '@/components/BackLink.vue';
import InfoIcon from '@/components/ModalViews/InfoIcon.vue';
import { FIXED_PENALTY_NOTICES_URL } from './character-information-constants';

export default {
  name: 'FixedPenaltyNotices',
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
    return {
      characterInformation: characterInformation,
      formId: 'characterInformation',
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
        if (this.characterInformation.fixedPenalties === false ) {
          this.characterInformation.fixedPenaltyDetails = null;
        }
        const data = this.initCharacterInformation(this.characterInformation);
        data[`progress.${this.formId}`] = this.isCharacterInformationComplete(this.characterInformation);
        await this.$store.dispatch('application/save', data);
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

