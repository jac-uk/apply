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
              Further Information to be disclosed
            </h2>

            <ErrorSummary
              :errors="errors"
              :show-save-button="true"
              @save="save"
            />

            <RadioGroup
              id="criminal-offenses-cautions"
              v-model="characterInformation.furtherInformation"
              required
              label="18. Do you have any other issues that you think we should know about when considering your character?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.furtherInformationDetails"
                  required
                  :component="repeatableFields.FurtherInformationDetails"
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
              :url="furtherInformation"
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
import ErrorSummary from '@/components/Form/ErrorSummary';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import RepeatableFields from '@/components/RepeatableFields';
import FurtherInformationDetails from '@/components/RepeatableFields/CharacterInformation/FurtherInformationDetails';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus';
import BackLink from '@/components/BackLink';
import InfoIcon from '@/components/ModalViews/InfoIcon';
import { FURTHER_INFORMATION_URL } from './character-information-constants';

export default {
  name: '',
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
      furtherInformation: null,
      furtherInformationDetails: null,
      url: '#further-information-to-be-disclosed',
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    return {
      characterInformation: characterInformation,
      formId: 'characterInformation',
      repeatableFields: {
        FurtherInformationDetails,
      },
      furtherInformationUrl: FURTHER_INFORMATION_URL,
    };
  },
  computed: {
    furtherInformation() {
      return this.furtherInformationUrl;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        if (this.characterInformation.furtherInformation === false ) {
          this.characterInformation.furtherInformationDetails = null;
        }
        const data = {
          progress: {},
          characterInformationV2: this.characterInformation,
        };
        data.progress[this.formId] = this.isCharacterInformationComplete(this.characterInformation);
        await this.$store.dispatch('application/save', data);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);
        this.$router.push({ name: 'character-information-review' });
      }
    },
  },
};
</script>
