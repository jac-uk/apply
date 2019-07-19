<template>
  <section>
    <form @submit.prevent="save">
      <h2>Citizenship</h2>

      <fieldset>
        <legend>What is your citizenship?</legend>
        <SelectList id="nationality" :options="options" v-model="applicant.citizenship" />
        <div v-if="applicant.citizenship === 'Non-Commonwealth'" class="mt-3">
          Email <a href="mailto:dcj128@judicialappointments.gov.uk">dcj128@judicialappointments.gov.uk</a> to provide further details
        </div>
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
        options: [
          {value: 'British', label: 'I am a citizen of the United Kingdom',},
          {value: 'Irish', label: 'I am a citizen of the Republic of Ireland',},
          {value: 'Commonwealth', label: 'I am a citizen of another Commonwealth country',},
          {value: 'Non-Commonwealth', label: 'I am none of these',}
        ],
      };
    },
    methods: {
      async save() {
        this.isSaving = true;
        await this.$store.dispatch('saveApplicant', this.applicant);
        this.isSaving = false;
      },
      async saveAndContinue() {
        await this.save();
        this.$emit('continue');
      },
    },
  };
</script>
