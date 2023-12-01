<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Reasonable Adjustments
      </h1>
      <RadioGroup
        id="reasonable-adjustments"
        v-model="formData.reasonableAdjustments"
        required
        label="Reasonable Adjustments"
      >
        <p class="govuk-body-m govuk-!-margin-top-0">
          With reference to our
          <a
            class="govuk-link"
            href="https://judicialappointments.gov.uk/equality-and-diversity/diversity-and-equality-measures/reasonable-adjustments/"
            target="_blank"
          >reasonable adjustments policy</a>
          please update this section to take into account any changes since you submitted your application
        </p>
        <RadioItem
          :value="true"
          label="Yes"
        >
          <TextareaInput
            id="reasonable-adjustments-details"
            v-model="formData.reasonableAdjustmentsDetails"
            label="Give details here"
          />
        </RadioItem>
        <RadioItem
          :value="false"
          label="No"
        />
      </RadioGroup>

      <button
        class="govuk-button info-btn--candidate-availability--save-and-continue"
        @click="save()"
      >
        Save and continue
      </button>
    </div>
  </div>
</template>
<script>
import { APPLICATION_FORM_PARTS } from '@/helpers/constants';
import BackLink from '@/components/BackLink.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
export default {
  name: 'CandidateFormReasonableAdjustments',
  components: {
    BackLink,
    RadioGroup,
    RadioItem,
    TextareaInput,
  },
  mixins: [CandidateFormsMixIn],
  data() {
    const application = this.$store.getters['application/data']();
    const formData = {
      reasonableAdjustments: application.personalDetails.reasonableAdjustments,
      reasonableAdjustmentsDetails: application.personalDetails.reasonableAdjustmentsDetails,
    };
    return {
      formData,
    };
  },
  created() {
    this.setupPart(APPLICATION_FORM_PARTS.REASONABLE_ADJUSTMENTS);
  },
  methods: {
    async save(){
      const saveData = {
        personalDetails: {
          reasonableAdjustments: this.formData.reasonableAdjustments,
          reasonableAdjustmentsDetails: this.formData.reasonableAdjustmentsDetails,
        },
      };
      await this.$store.dispatch('application/save', saveData);
      await this.savePart(true);
    },
  },
};
</script>
