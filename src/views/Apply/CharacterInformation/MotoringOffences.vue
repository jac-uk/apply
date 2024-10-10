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
              Motoring Offences
            </h2>

            <ErrorSummary
              :errors="errors"
              :show-save-button="true"
              @save="save"
            />

            <RadioGroup
              id="driving-disqualifications"
              v-model="characterInformation.drivingDisqualifications"
              required
              label="4. Have you ever been disqualified from driving?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.drivingDisqualificationDetails"
                  required
                  :component="repeatableFields.DrivingDisqualificationDetails"
                  :component-props="{
                    hint: isCharacterInformationV3
                      ? 'Please add details of your disqualification here including the start and end dates of your disqualification period'
                      : 'Please add details of your disqualification here including the dates of your disqualification period'
                  }"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>

            <RadioGroup
              id="recent-driving-convictions"
              v-model="characterInformation.recentDrivingConvictions"
              label="5. Were you convicted of any motoring offences in the past 4 years?"
              required
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.recentDrivingConvictionDetails"
                  required
                  :component="repeatableFields.RecentDrivingConvictionDetails"
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
              :url="motoringOffences"
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
import { shallowRef } from 'vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import RepeatableFields from '@/components/RepeatableFields.vue';
import DrivingDisqualificationDetails from '@/components/RepeatableFields/CharacterInformation/DrivingDisqualificationDetails.vue';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus.vue';
import RecentDrivingConvictionDetails from '@/components/RepeatableFields/CharacterInformation/RecentDrivingConvictionDetails.vue';
import BackLink from '@/components/BackLink.vue';
import InfoIcon from '@/components/ModalViews/InfoIcon.vue';
import { MOTORING_OFFENCES_URL } from './character-information-constants';

export default {
  name: 'MotoringOffences',
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
      drivingDisqualifications: null,
      drivingDisqualificationDetails: null,
      recentDrivingConvictions: null,
      recentDrivingConvictionDetails: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    return {
      characterInformation: characterInformation,
      formId: 'characterInformation',
      repeatableFields: shallowRef({
        DrivingDisqualificationDetails,
        RecentDrivingConvictionDetails,
      }),
      motoringOffencesUrl: MOTORING_OFFENCES_URL,
    };
  },
  computed: {
    motoringOffences() {
      return this.motoringOffencesUrl;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        if (this.characterInformation.drivingDisqualifications === false ) {
          this.characterInformation.drivingDisqualificationDetails = null;
        }
        if (this.characterInformation.recentDrivingConvictions === false ) {
          this.characterInformation.recentDrivingConvictionDetails = null;
        }
        const data = this.initCharacterInformation(this.characterInformation);
        data[`progress.${this.formId}`] = this.isCharacterInformationComplete(this.characterInformation);
        await this.$store.dispatch('application/save', data);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);

        if (this.application.progress.characterInformation === true) {
          this.$router.push({ name: 'character-information-review' });
        } else {
          this.$router.push({ name: 'character-information-financial-matters' });
        }
      }
    },
  },
};
</script>

