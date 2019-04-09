<template>
  <section>
    <form @submit.prevent="save">
      <h2>Qualifications</h2>

      <fieldset>
        <legend>What are your qualifications?</legend>
        <RepeatableFields v-model="applicant.qualifications" :component="repeatableFields.Qualification" />
      </fieldset>

      <fieldset>
        <legend>Are you qualified as a:</legend>
        <SelectList :options="selectListOptions.qualifiedProfessions" :multiple="false" v-model="applicant.qualified_profession" id="qualified_profession" />
      </fieldset>

      <fieldset>
        <legend>Where did you qualify?</legend>
        <SelectList :options="selectListOptions.qualifiedLocations" v-model="applicant.location_qualified" id="location_qualified" />
      </fieldset>

      <div v-if="applicant.qualified_profession === 'Solicitor'">
        <fieldset>
          <legend>When were you entered on the Roll?</legend>
          <div class="fieldset-text">For example, 02 2017</div>
          <DateInput v-model="applicant.solicitor_date_on_roll" type="month" />
        </fieldset>
      </div>

      <div v-if="applicant.qualified_profession === 'Advocate'">
        <fieldset>
          <legend>When were you called to the Faculty?</legend>
          <div class="fieldset-text">For example, 02 2017</div>
          <DateInput v-model="applicant.advocate_date_called_to_faculty" type="month" />
        </fieldset>
      </div>

      <div v-if="applicant.qualified_profession === 'Barrister'">
        <fieldset>
          <legend>When were you called to the Bar?</legend>
          <div class="fieldset-text">For example, 02 2017</div>
          <DateInput v-model="applicant.barrister_date_called_to_bar" type="month" />
        </fieldset>

        <div v-if="applicant.location_qualified !== 'Northern Ireland'">
          <fieldset>
            <legend>Pupillage</legend>
            <p>Have you completed pupillage?</p>
            <BooleanInput v-model="applicant.barrister_completed_pupillage" />

            <div v-if="applicant.barrister_completed_pupillage" class="mt-3">
              <p>When did you complete pupillage?</p>
              <div class="fieldset-text">For example, 02 2017</div>
              <DateInput v-model="applicant.barrister_date_completed_pupillage" type="month" />
            </div>

            <div v-if="!applicant.barrister_completed_pupillage" class="mt-3">
              <p>Why didn’t you complete pupillage?</p>
              <textarea class="form-control" v-model="applicant.barrister_reason_pupillage_not_completed" rows="3"></textarea>
              <p class="mt-3">Do you have an exemption certificate?</p>
              <BooleanInput v-model="applicant.barrister_has_pupillage_exemption_certificate" />
              <p v-if="applicant.barrister_has_pupillage_exemption_certificate" class="mt-3">
                Email your certificate to
                <a href="mailto:dcj128@judicialappointments.gov.uk">dcj128@judicialappointments.gov.uk</a>
              </p>
            </div>
          </fieldset>
        </div>
      </div>

      <SaveAndContinueButtons :isSaving="isSaving" @saveAndContinue="saveAndContinue" />
    </form>
  </section>
</template>

<script>
  import DateInput from '@/components/DateInput';
  import SelectList from '@/components/SelectList';
  import BooleanInput from '@/components/BooleanInput';
  import RepeatableFields from '@/components/RepeatableFields';
  import Qualification from '@/views/RepeatableFields/Qualification';
  import SaveAndContinueButtons from '@/components/SaveAndContinueButtons';

  export default {
    components: {
      SaveAndContinueButtons,
      DateInput,
      SelectList,
      BooleanInput,
      RepeatableFields,
    },
    data() {
      return {
        applicant: this.$store.getters.applicant(),
        isSaving: false,
        selectListOptions: {
          qualifiedProfessions: [
            {value: 'Barrister', label: 'Barrister'},
            {value: 'Solicitor', label: 'Solicitor'},
            {value: 'Advocate', label: 'Advocate'},
          ],
          qualifiedLocations: [
            'England and Wales',
            'Scotland',
            'Northern Ireland',
          ],
        },
        repeatableFields: {
          Qualification,
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
