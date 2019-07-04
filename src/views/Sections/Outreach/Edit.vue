<template>
  <section>
    <form @submit.prevent="save">

      <fieldset>
        <legend>How did you hear about this vacancy?</legend>
        <div class="fieldset-text">Select any that apply:</div>
        <SelectList id="how_did_you_hear" :multiple="true" :options="selectListOptions.heard_about_from" v-model="applicant.how_did_you_hear" />
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" type="checkbox" id="how_did_you_hear_has_other" :value="true" v-model="applicant.how_did_you_hear_has_other">
          <label class="custom-control-label" for="how_did_you_hear_has_other">
            Other form of communication (please specify)
          </label>
          <input v-if="applicant.how_did_you_hear_has_other" type="text" class="form-control" v-model="applicant.how_did_you_hear_other">
        </div>
      </fieldset>

      <fieldset>
        <legend>Have you attended an outreach event on JAC selection exercises?</legend>
        <SelectList id="has_attended_outreach_event" :options="selectListOptions.yesNo" v-model="applicant.has_attended_outreach_event" />
      </fieldset>

      <fieldset>
        <legend>Did you participate in a Judicial Work Shadowing Scheme?</legend>
        <SelectList id="participated_in_judicial_work_shadowing_scheme" :options="selectListOptions.yesNo" v-model="applicant.participated_in_judicial_work_shadowing_scheme" />
      </fieldset>

      <SaveAndContinueButtons :isSaving="isSaving" @saveAndContinue="saveAndContinue" />
    </form>
  </section>
</template>

<script>
import SelectList from '@/components/SelectList';
import SaveAndContinueButtons from '@/components/SaveAndContinueButtons';

export default {
  components: {
    SaveAndContinueButtons,
    SelectList,
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
        yesNo: [
          'Yes',
          'No',
          'Prefer not to answer',
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
}
</script>
