<template>
  <section>
    <form @submit.prevent="save">
      <h2>Introduction</h2>
      <p>You are applying for <strong>{{ vacancy.jac_ref }}: {{ vacancy.title }}</strong></p>

      <fieldset>
        <legend>Confidentiality</legend>
        <SelectList
          id="confidentiality"
          v-model="applicant.confidentiality"
          :multiple="true"
          :options="selectListOptions.confidentiality"
        />
      </fieldset>

      <div class="form-actions">
        <button
          class="btn btn-primary mr-2"
          type="button"
          @click.prevent="saveAndContinue"
        >
          Start application
        </button>
        <span
          v-if="isSaving"
          class="spinner-border spinner-border-sm text-secondary"
        />
      </div>
    </form>
  </section>
</template>

<script>
import SelectList from '@/components/SelectList';

export default {
  components: {
    SelectList,
  },
  data() {
    return {
      vacancy: this.$store.getters.vacancy,
      applicant: this.$store.getters.applicant(),
      isSaving: false,
      selectListOptions: {
        confidentiality: [
          'I undertake to maintain absolute confidentiality relating to all aspects of the selection process for this selection exercise.',
          'As I progress in the exercise I undertake to ensure that any relevant materials provided to me as part of the selection process are kept secure and not shared with anyone else.',
          'I understand that the Judicial Appointments Commission will automatically refer any suspected breach of this agreement to the Bar Standards Board, the Solicitors Regulatory Authority, CILEx Regulation, Judicial Conduct Investigations Office or other relevant regulatory body to consider as a potential breach of my professional obligations, or as misconduct, and this could result in disciplinary action by my regulator.',
          'I understand that the Judicial Appointments Commission takes very seriously the integrity of the selection process and any evidence that a candidate has breached this agreement might result in disqualification from this and future exercises.',
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

<style scoped>

</style>
