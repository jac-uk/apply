<template>
  <section>
    <form @submit.prevent="save">
      <h2>Your self assessment</h2>

      <div class="card mb-3" v-if="application.state === 'submitted'">
        <div class="card-header">
          <h2 class="card-title">
            You have submitted your application for this vacancy
          </h2>
        </div>
        <div class="card-body">
          Email dcj128@judicialappointments.gov.uk or call 020 3334 0123 to
          discuss changes to your application.
        </div>
      </div>

      <fieldset :disabled="application.state === 'submitted'">
        <legend>Self Assessment</legend>
        <div class="fieldset-text">
          <p>Please refer to the
          <a href="https://www.judicialappointments.gov.uk/sites/default/files/sync/128_final_competency_framework.pdf" target="_blank">guidance and competency framework</a>
            on the JAC website before completing this part of your application.</p>
          <p>You have a maximum of 250 words for each competency.</p>
        </div>
        <div class="form-group">
          <label for="leadership">Leadership</label>
          <textarea class="form-control" id="leadership" rows="9" v-model="application.competency_leadership"></textarea>
        </div>
        <div class="form-group">
          <label for="exercising_judgement">Exercising Judgement</label>
          <textarea class="form-control" id="exercising_judgement" rows="9" v-model="application.competency_exercising_judgement"></textarea>
        </div>
        <div class="form-group">
          <label for="possessing_and_building_knowledge">Possessing and Building Knowledge</label>
          <textarea class="form-control" id="possessing_and_building_knowledge" rows="9" v-model="application.competency_possessing_and_building_knowledge"></textarea>
        </div>
        <div class="form-group">
          <label for="assimilating_and_clarifying_information">Assimilating and Clarifying Information</label>
          <textarea class="form-control" id="assimilating_and_clarifying_information" rows="9" v-model="application.competency_assimilating_and_clarifying_information"></textarea>
        </div>
        <div class="form-group">
          <label for="working_and_communicating_with_others">Working and Communicating with Others</label>
          <textarea class="form-control" id="working_and_communicating_with_others" rows="9" v-model="application.competency_working_and_communicating_with_others"></textarea>
        </div>
        <div class="form-group">
          <label for="managing_work_effectively">Managing Work Effectively</label>
          <textarea class="form-control" id="managing_work_effectively" rows="9" v-model="application.competency_managing_work_effectively"></textarea>
        </div>
      </fieldset>

      <fieldset :disabled="application.state === 'submitted'">
        <legend>Additional Selection Criterion</legend>
        <div class="fieldset-text">
          Refer to the
          <a href="https://www.judicialappointments.gov.uk/128-senior-circuit-judge-designated-civil-judge-information-page#additional-selection-criterion"
             target="_blank">‘Additional Selection Criterion’</a>
          section of the vacancy information page for more information about this requirement.
        </div>
        <div class="form-group">
          <label for="additional_selection_criteria">Provide details of how you meet this requirement</label>
          <textarea class="form-control" id="additional_selection_criteria" rows="3" v-model="application.additional_selection_criteria"></textarea>
        </div>
      </fieldset>

      <fieldset :disabled="application.state === 'submitted'">
        <legend>Reasonable Length of Service</legend>
        <div class="fieldset-text">
          Refer to the
          <a href="https://www.judicialappointments.gov.uk/128-senior-circuit-judge-designated-civil-judge-information-page#reasonable-length-of-service"
             target="_blank">‘Reasonable Length of Service’</a>
          section of the vacancy information page for more information about this requirement.
        </div>
        <div class="form-group">
          <label>Are you able to provide 3 years’ service?</label>
          <BooleanInput v-model="application.length_of_service_accepted" />
        </div>
        <div class="form-group" v-if="application.length_of_service_accepted === false">
          <label for="length_of_service_mitigation">Provide any mitigation you’d like considered</label>
          <textarea class="form-control" id="length_of_service_mitigation" rows="3" v-model="application.length_of_service_mitigation"></textarea>
        </div>
      </fieldset>

      <fieldset :disabled="application.state === 'submitted'">
        <legend>Authorisations</legend>
        <p>Do you currently have a Section 9(1) authorisation?</p>
        <BooleanInput v-model="application.has_section_9_1_authorisation" />
      </fieldset>

      <SaveAndContinueButtons v-if="application.state !== 'submitted'" :isSaving="isSaving" @saveAndContinue="saveAndContinue" />
    </form>
  </section>
</template>

<script>
import BooleanInput from '@/components/BooleanInput';
import SaveAndContinueButtons from '@/components/SaveAndContinueButtons';

export default {
  components: {
    SaveAndContinueButtons,
    BooleanInput,
  },
  data() {
    return {
      application: this.$store.getters.application(),
      isSaving: false,
    };
  },
  methods: {
    async saveAndContinue() {
      await this.save();
      this.$emit('continue');
    },
    async save() {
      this.isSaving = true;
      await this.$store.dispatch('saveApplication', this.application);
      this.isSaving = false;
    },
  },
};
</script>
