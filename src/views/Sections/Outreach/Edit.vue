<template>
  <section>
    <form @submit.prevent="save">
      <fieldset>
        <legend>How did you hear about this vacancy?</legend>
        <div class="fieldset-text">
          Select all that apply
        </div>
        <SelectList
          id="how_did_you_hear"
          v-model="applicant.how_did_you_hear"
          :multiple="true"
          :options="selectListOptions.heard_about_from"
        />
        <div class="custom-control custom-checkbox">
          <input
            id="how_did_you_hear_has_other"
            v-model="applicant.how_did_you_hear_has_other"
            class="custom-control-input"
            type="checkbox"
            :value="true"
          >
          <label
            class="custom-control-label"
            for="how_did_you_hear_has_other"
          >
            Other form of communication (please specify)
          </label>
          <input
            v-if="applicant.how_did_you_hear_has_other"
            v-model="applicant.how_did_you_hear_other"
            type="text"
            class="form-control"
          >
        </div>
      </fieldset>

      <fieldset>
        <legend>Have you attended an outreach event on JAC selection exercises?</legend>
        <BooleanInput v-model="applicant.has_attended_outreach_event" />
      </fieldset>

      <fieldset>
        <legend>Have you taken part in the Judicial Work Shadowing Scheme?</legend>
        <BooleanInput v-model="applicant.taken_part_in_judicial_work_shadowing_scheme" />
      </fieldset>

      <SaveAndContinueButtons
        :is-saving="isSaving"
        @saveAndContinue="saveAndContinue"
      />
    </form>
  </section>
</template>

<script>
import SelectList from '@/components/SelectList';
import SaveAndContinueButtons from '@/components/SaveAndContinueButtons';
import BooleanInput from '@/components/BooleanInput';

export default {
  components: {
    SaveAndContinueButtons,
    SelectList,
    BooleanInput,
  },
  data() {
    return {
      applicant: this.$store.getters.applicant(),
      isSaving: false,
      selectListOptions: {
        heard_about_from: [
          'JAC website',
          'JAC newsletter: Judging Your Future',
          'Judiciary website',
          'Judiciary extranet',
          'Twitter',
          'LinkedIn',
          'Word of mouth',
          'From one of the presiding judges',
        ],
      },
    };
  },
  methods: {
    async saveAndContinue() {
      await this.save();
      this.$emit('continue');
    },
    async save() {
      this.isSaving = true;
      await this.$store.dispatch('saveApplicant', this.applicant);
      this.isSaving = false;
    },
  },
};
</script>
