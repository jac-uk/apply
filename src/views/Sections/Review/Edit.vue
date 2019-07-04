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
    <p v-if="application.state != 'submitted'">
      You are applying for <strong>{{vacancy.jac_ref}}: {{vacancy.title}}</strong>
    </p>
    <form v-if="application.state != 'submitted'"  @submit.prevent="save">
      <fieldset>
        <legend>
          We’re looking for people to take part in user research activities
          such as testing a future version of this form. Tell us if you’re
          happy for us to contact you.
        </legend>
        <BooleanInput v-model="application.willing_to_participate_in_user_research" />
      </fieldset>
      <div class="form-actions">
        <button class="btn btn-primary mr-2" type="button" @click.prevent="saveAndSubmit">
          Submit application
        </button>
        <span class="spinner-border spinner-border-sm text-secondary" v-if="isSaving"></span>
      </div>
    </form>
  </section>
</template>

<script>
import BooleanInput from '@/components/BooleanInput';
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
export default {
  components: {
    BooleanInput,
    Citizenship,
    Experience,
    Personal,
    Qualifications,
    SelfAssessment,
    Assessors,
    Character,
    Preferences,
    Declarations,
    Diversity
  },
  data() {
    return {
      vacancy: this.$store.getters.vacancy,
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
  }
}
</script>
