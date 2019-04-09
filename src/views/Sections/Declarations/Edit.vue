<template>
  <section>
    <form @submit.prevent="save">
      <h2>Declarations</h2>

      <fieldset>
        <legend>Are you related to, or known to any of the JAC Commissioners?</legend>
        <BooleanInput v-model="applicant.are_you_known_to_the_commissioners" />

        <div class="form-group mt-3" v-if="applicant.are_you_known_to_the_commissioners">
          <label for="known_to_commissioners">Select all the Commissioners that apply:</label>
          <SelectList id="known_to_commissioners" :multiple="true" :options="selectListOptions.known_to_commissioners" v-model="applicant.known_to_commissioners" />
        </div>
        <div class="form-group mt-3" v-if="applicant.are_you_known_to_the_commissioners">
          <label for="how_do_you_know_them_details">How do you know them?</label>
          <textarea id="how_do_you_know_them_details" class="form-control" v-model="applicant.how_do_you_know_the_commissioners" placeholder="Please provide details."></textarea>
        </div>
      </fieldset>
      <SaveAndContinueButtons :isSaving="isSaving" @saveAndContinue="saveAndContinue" />
    </form>
  </section>
</template>

<script>
import BooleanInput from '@/components/BooleanInput';
import SelectList from '@/components/SelectList';
import SaveAndContinueButtons from '@/components/SaveAndContinueButtons';

export default {
  components: {
    SaveAndContinueButtons,
    BooleanInput,
    SelectList
  },
  data() {
    return {
      applicant: this.$store.getters.applicant(),
      isSaving: false,
      selectListOptions: {
        known_to_commissioners: [
          'Professor Lord Ajay Kakkar, Chairman',
          'Lady Justice Rafferty, Vice Chairman',
          'Judge Mathu Asokan',
          'Her Honour Judge Anuja Dhir',
          'Emir Khan Feisal',
          'Jane Furniss CBE',
          'Andrew Kennon',
          'Sarah Lee',
          'Professor Noel Lloyd CBE',
          'Judge Fiona Monk',
          'Brie Stevens-Hoare',
          'Dame Valerie Strachan DCB',
          'His Honour Judge Phillip Sycamore',
          'Sir Simon Wessely',
          'Dame Philippa Whipple DBE'
        ]
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
  }
}
</script>
