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
              Civil Proceedings
            </h2>

            <ErrorSummary
              :errors="errors"
              :show-save-button="true"
              @save="save"
            />

            <RadioGroup
              id="civil-proceedings"
              v-model="characterInformation.civilProceedings"
              required
              label="19. Have you ever been, or are you currently, the subject of any civil proceedings that you have not already mentioned above? You do not need to declare any proceedings that were dismissed or withdrawn without a settlement."
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.furtherInformationDetails"
                  required
                  :component="repeatableFields.FurtherInformationDetails"
                  :component-props="{
                    hint: 'Please add details of any civil proceedings, including any findings or orders made against you.'
                  }"
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
import FurtherInformationDetails from '@/components/RepeatableFields/CharacterInformation/FurtherInformationDetails.vue';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus.vue';
import BackLink from '@/components/BackLink.vue';

export default {
  name: 'CivilProceedings',
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    RepeatableFields,
    BackLink,
  },
  extends: CharacterInformationStatus,
  data() {
    const defaults = {
      civilProceedings: null,
      civilProceedingsDetails: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    return {
      characterInformation: characterInformation,
      formId: 'characterInformation',
      repeatableFields: {
        FurtherInformationDetails,
      },
    };
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        if (this.characterInformation.civilProceedings === false ) {
          this.characterInformation.civilProceedingsDetails = null;
        }
        const data = this.initCharacterInformation(this.characterInformation);
        data[`progress.${this.formId}`] = this.isCharacterInformationComplete(this.characterInformation);
        await this.$store.dispatch('application/save', data);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);
        if (this.application.progress.characterInformation === true) {
          this.$router.push({ name: 'character-information-review' });
        } else {
          this.$router.push({ name: 'character-information-further-information' });
        }
      }
    },
  },
};
</script>
