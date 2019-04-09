<template>
  <section>
    <form @submit.prevent="save">
      <h2>Diversity</h2>

      <p>The JAC will use the information that you provide in 2 ways:</p>
      <ol>
        <li>where the <a href="https://www.judicialappointments.gov.uk/equal-merit-provision" target="_blank">Equal Merit Provision policy</a> applies</li>
        <li>to monitor the selection process</li>
      </ol>
      <p>Find out <a href="https://www.judicialappointments.gov.uk/providing-diversity-information-jac" target="_blank">more information on the JAC website</a></p>

      <fieldset>
        <legend>Sharing my diversity data</legend>
          <SelectList id="sharing_consent" :options="selectListOptions.sharingConsent" v-model="applicant.diversity_sharing_consent" />
      </fieldset>

      <fieldset>
        <legend>What is your professional background?</legend>
        <div class="fieldset-text">Select all that apply</div>
        <SelectList id="professional_background" :multiple="true" :options="selectListOptions.professionalBackground" v-model="applicant.professional_background" />
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" type="checkbox" id="professional_background_other" :value="true" v-model="applicant.professional_background_has_other">
          <label class="custom-control-label" for="professional_background_other">
            Other (please specify)
          </label>
          <input v-if="applicant.professional_background_has_other" type="text" class="form-control" v-model="applicant.professional_background_other">
        </div>
      </fieldset>

      <fieldset>
        <legend>What is your current legal role?</legend>
        <div class="fieldset-text">If you currently hold multiple roles, select all that apply</div>
        <SelectList id="current_legal_role" :multiple="true" :options="selectListOptions.currentLegalRole" v-model="applicant.current_legal_role" />
        <div class="custom-control custom-checkbox">
          <input class="custom-control-input" type="checkbox" id="current_legal_role_other" :value="true" v-model="applicant.current_legal_role_has_other">
          <label class="custom-control-label" for="current_legal_role_other">
            Other (please specify)
          </label>
          <input v-if="applicant.current_legal_role_has_other" type="text" class="form-control" v-model="applicant.current_legal_role_other">
        </div>
      </fieldset>

      <fieldset>
        <legend>Do you hold, or have you held in the past, a fee-paid judicial role?</legend>
        <SelectList id="fee_paid_judicial_role" :options="selectListOptions.feePaidJudicialRole" v-model="applicant.fee_paid_judicial" />
      </fieldset>

      <fieldset>
        <legend>Between the ages 11 to 18, did you mainly attend a state or fee-paying school?</legend>
        <SelectList id="school_type" :options="selectListOptions.schoolTypes" v-model="applicant.school_type" />
      </fieldset>

      <fieldset>
        <legend>Did you go to university and if so, were you the first generation from your family to go?</legend>
        <SelectList id="university_attendance" :options="selectListOptions.universityAttendance" v-model="applicant.university_attendance" />
      </fieldset>

      <fieldset>
        <legend>What is your ethnic group?</legend>
        <SelectList id="ethnicity_no_answer" :options="['Prefer not to answer']" v-model="applicant.ethnicity" />
        <h6 class="mt-3">Asian/Asian British</h6>
        <SelectList id="ethnicity_asian" :options="selectListOptions.ethnicities.asian" v-model="applicant.ethnicity" />
        <h6 class="mt-3">Black/African/Caribbean/Black British</h6>
        <SelectList id="ethnicity_black" :options="selectListOptions.ethnicities.black" v-model="applicant.ethnicity" />
        <h6 class="mt-3">White</h6>
        <SelectList id="ethnicity_white" :options="selectListOptions.ethnicities.white" v-model="applicant.ethnicity" />
        <h6 class="mt-3">Mixed or multiple ethnic backgrounds</h6>
        <SelectList id="ethnicity_mixed" :options="selectListOptions.ethnicities.mixed" v-model="applicant.ethnicity" />
        <h6 class="mt-3">Other ethnic group</h6>
        <div class="custom-control custom-radio">
          <input class="custom-control-input" type="radio" id="ethnicicty_other" value="Other" v-model="applicant.ethnicity">
          <label class="custom-control-label" for="ethnicicty_other">
            Other (please specify)
          </label>
          <input v-if="applicant.ethnicity === 'Other'" type="text" class="form-control" v-model="applicant.ethnicity_other">
        </div>
      </fieldset>

      <fieldset>
        <legend>What is your gender?</legend>
        <SelectList id="gender" :options="selectListOptions.gender" v-model="applicant.gender" />
      </fieldset>

      <fieldset>
        <legend>Is your gender identity the same as the gender you were assigned at birth?</legend>
        <SelectList id="gender_same_as_birth" :options="selectListOptions.yesNo" v-model="applicant.gender_same_as_birth" />
      </fieldset>

      <fieldset>
        <legend>How would you describe your sexual orientation?</legend>
        <SelectList id="sexual_orientation" :options="selectListOptions.sexualOrientation" v-model="applicant.sexual_orientation" />
      </fieldset>

      <fieldset>
        <legend>Do you have a disability, as defined by the Equality Act 2010?</legend>
        <SelectList id="disability" :options="selectListOptions.yesNo" v-model="applicant.disability" />
      </fieldset>

      <fieldset>
        <legend>What is your religion or belief?</legend>
        <SelectList id="religion" :options="selectListOptions.religion" v-model="applicant.religion" />
        <div class="custom-control custom-radio">
          <input class="custom-control-input" type="radio" id="religion_other" value="Other" v-model="applicant.religion">
          <label class="custom-control-label" for="religion_other">
            Other (please specify)
          </label>
          <input v-if="applicant.religion === 'Other'" type="text" class="form-control" v-model="applicant.religion_other">
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
          sharingConsent: [
            {value: true, label: 'You may share my diversity data with the Ministry of Justice, Judicial Office and HM Courts and Tribunals Service (for monitoring purposes only)'},
            {value: false, label: 'Do NOT share my diversity data'},
          ],
          professionalBackground: [
            'Barrister',
            'CILEx',
            'Solicitor',
            'Prefer not to answer',
          ],
          currentLegalRole: [
            'Academic',
            'Barrister',
            'Fee-paid court judge',
            'Fee-paid tribunal judge',
            'Fellow of CILEx',
            'Other fee-paid judicial office holder',
            'Other salaried judicial office holder',
            'Salaried court judge',
            'Salaried tribunal judge',
            'Solicitor',
            'Prefer not to answer',
          ],
          feePaidJudicialRole: [
            'Fee-paid court post',
            'Fee-paid tribunal post',
            'I have not previously held a fee-paid role',
            'Other fee-paid judicial office',
            'Prefer not to answer',
          ],
          schoolTypes: [
            'UK state school – selective',
            'UK state school – non-selective',
            'UK independent or fee-paying school',
            'UK independent or fee-paying school with financial assistance (bursary or means-tested scholarship)',
            'I attended a school outside of the UK',
            'Prefer not to answer',
          ],
          universityAttendance: [
            'I did not go to university',
            'I went to university and was the first generation in my family to do so',
            'I went to university but was not first generation in my family to do so',
            'Prefer not to answer',
          ],
          ethnicities: {
            asian: [
              'Bangladeshi',
              'Chinese',
              'Indian',
              'Pakistani',
              'Any other Asian background',
            ],
            black: [
              'African',
              'Caribbean',
              'Any other Black/African/Caribbean background',
            ],
            white: [
              'English, Welsh, Scottish, Northern Ireland, British',
              'Irish',
              'Gypsy or Irish Traveller',
              'Any other White background',
            ],
            mixed: [
              'White and Black Caribbean',
              'White and Black African',
              'White and Asian',
              'Any other mixed or multiple ethnic background',
            ],
          },
          gender: [
            'Female',
            'Male',
            'Other',
            'Prefer not to answer',
          ],
          yesNo: [
            'Yes',
            'No',
            'Prefer not to answer',
          ],
          sexualOrientation: [
            'Bisexual',
            'Gay man',
            'Gay woman/ lesbian',
            'Heterosexual/ straight',
            'Other',
            'Prefer not to answer',
          ],
          religion: [
            'Atheist',
            'Buddhist',
            'Christian',
            'Hindu',
            'Jewish',
            'Muslim',
            'No religion',
            'Sikh',
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
