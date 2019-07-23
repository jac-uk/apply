<template>
  <section>
    <h2>Check your answers before submitting your application</h2>
    <Citizenship />
    <Personal />
    <Qualifications />
    <Experience />
    <SelfAssessment />
    <Assessors />
    <Character />
    <Preferences />
    <Declarations />
    <Diversity />
    <Outreach />
    <div
      v-if="application.state != 'submitted'"
      class="form-actions"
    >
      <button
        class="btn btn-primary mr-2"
        @click.prevent="saveAndSubmit"
      >
        Submit application
      </button>
      <span
        v-if="isSaving"
        class="spinner-border spinner-border-sm text-secondary"
      />
    </div>
  </section>
</template>

<script>
import Citizenship from '@/views/Sections/Citizenship/Show';
import Experience from '@/views/Sections/Experience/Show';
import Personal from '@/views/Sections/Personal/Show';
import Qualifications from '@/views/Sections/Qualifications/Show';
import SelfAssessment from '@/views/Sections/SelfAssessment/Show';
import Assessors from '@/views/Sections/Assessors/Show';
import Character from '@/views/Sections/Character/Show';
import Preferences from '@/views/Sections/Preferences/Show';
import Declarations from '@/views/Sections/Declarations/Show';
import Diversity from '@/views/Sections/Diversity/Show';
import Outreach from '@/views/Sections/Outreach/Show';
export default {
  components: {
    Citizenship,
    Experience,
    Personal,
    Qualifications,
    SelfAssessment,
    Assessors,
    Character,
    Preferences,
    Declarations,
    Diversity,
    Outreach,
  },
  data() {
    return {
      application: this.$store.getters.application(),
      isSaving: false,
    };
  },
  methods: {
    async saveAndSubmit() {
      await this.save();
      this.$emit('continue');
    },
    async save() {
      this.isSaving = true;
      this.application.state = 'submitted';
      await this.$store.dispatch('saveApplication', this.application);
      this.isSaving = false;
    },
  },
};
</script>
