<template>
  <section>
    <form @submit.prevent="save">
      <h2>Preferences</h2>

      <fieldset>
        <legend>Are you interested in salaried part-time working?</legend>
        <BooleanInput v-model="applicant.work_part_time" />
      </fieldset>

      <fieldset v-if="applicant.work_part_time">
        <legend>What sitting patterns are you interested in?</legend>
        <SelectList id="sitting_patterns" :multiple="true" :options="selectListOptions.sitting_patterns" v-model="applicant.sitting_patterns" />
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
        sitting_patterns: [
           '80%',
           '90%',
           'Blocks of at least 6 to 8 weeks',
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
  }
}
</script>
