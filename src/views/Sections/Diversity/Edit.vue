<template>
  <section>
    <form @submit.prevent="save">
      <h2>Diversity</h2>

      <p>The JAC will use the information that you provide in 2 ways:</p>
      <ol>
        <li>
          where the <a
            href="https://www.judicialappointments.gov.uk/equal-merit-provision"
            target="_blank"
          >Equal Merit Provision policy</a> applies
        </li>
        <li>to monitor the selection process</li>
      </ol>
      <p>
        Find out <a
          href="https://www.judicialappointments.gov.uk/providing-diversity-information-jac"
          target="_blank"
        >more information on the JAC website</a>
      </p>

      <fieldset>
        <legend>Sharing my diversity data</legend>
        <SelectList
          id="sharing_consent"
          v-model="applicant.diversity_sharing_consent"
          :options="selectListOptions.sharingConsent"
        />
      </fieldset>

      <fieldset>
        <legend>What is your professional background?</legend>
        <div class="fieldset-text">
          Select all that apply
        </div>
        <SelectList
          id="professional_background"
          v-model="applicant.professional_background"
          :multiple="true"
          :options="selectListOptions.professionalBackground"
        />
        <div class="custom-control custom-checkbox">
          <input
            id="professional_background_other"
            v-model="applicant.professional_background_has_other"
            class="custom-control-input"
            type="checkbox"
            :value="true"
          >
          <label
            class="custom-control-label"
            for="professional_background_other"
          >
            Other (please specify)
          </label>
          <input
            v-if="applicant.professional_background_has_other"
            v-model="applicant.professional_background_other"
            type="text"
            class="form-control"
          >
        </div>
      </fieldset>

      <fieldset>
        <legend>What is your current legal role?</legend>
        <div class="fieldset-text">
          If you currently hold multiple roles, select all that apply
        </div>
        <SelectList
          id="current_legal_role"
          v-model="applicant.current_legal_role"
          :multiple="true"
          :options="selectListOptions.currentLegalRole"
        />
        <div class="custom-control custom-checkbox">
          <input
            id="current_legal_role_other"
            v-model="applicant.current_legal_role_has_other"
            class="custom-control-input"
            type="checkbox"
            :value="true"
          >
          <label
            class="custom-control-label"
            for="current_legal_role_other"
          >
            Other (please specify)
          </label>
          <input
            v-if="applicant.current_legal_role_has_other"
            v-model="applicant.current_legal_role_other"
            type="text"
            class="form-control"
          >
        </div>
      </fieldset>

      <fieldset>
        <legend>Do you hold, or have you held in the past, a fee-paid judicial role?</legend>
        <SelectList
          id="fee_paid_judicial_role"
          v-model="applicant.fee_paid_judicial"
          :options="selectListOptions.feePaidJudicialRole"
        />
      </fieldset>

      <fieldset>
        <legend>Between the ages 11 to 18, did you mainly attend a state or fee-paying school?</legend>
        <SelectList
          id="school_type"
          v-model="applicant.school_type"
          :options="selectListOptions.schoolTypes"
        />
      </fieldset>

      <fieldset>
        <legend>Did you go to university and if so, were you the first generation from your family to go?</legend>
        <SelectList
          id="university_attendance"
          v-model="applicant.university_attendance"
          :options="selectListOptions.universityAttendance"
        />
      </fieldset>

      <fieldset>
        <legend>What is your ethnic group?</legend>
        <SelectList
          id="ethnicity_no_answer"
          v-model="applicant.ethnicity"
          :options="['Prefer not to answer']"
        />
        <h6 class="mt-3">
          Asian/Asian British
        </h6>
        <SelectList
          id="ethnicity_asian"
          v-model="applicant.ethnicity"
          :options="selectListOptions.ethnicities.asian"
        />
        <h6 class="mt-3">
          Black/African/Caribbean/Black British
        </h6>
        <SelectList
          id="ethnicity_black"
          v-model="applicant.ethnicity"
          :options="selectListOptions.ethnicities.black"
        />
        <h6 class="mt-3">
          White
        </h6>
        <SelectList
          id="ethnicity_white"
          v-model="applicant.ethnicity"
          :options="selectListOptions.ethnicities.white"
        />
        <h6 class="mt-3">
          Mixed or multiple ethnic backgrounds
        </h6>
        <SelectList
          id="ethnicity_mixed"
          v-model="applicant.ethnicity"
          :options="selectListOptions.ethnicities.mixed"
        />
        <h6 class="mt-3">
          Other ethnic group
        </h6>
        <div class="custom-control custom-radio">
          <input
            id="ethnicicty_other"
            v-model="applicant.ethnicity"
            class="custom-control-input"
            type="radio"
            value="Other"
          >
          <label
            class="custom-control-label"
            for="ethnicicty_other"
          >
            Other (please specify)
          </label>
          <input
            v-if="applicant.ethnicity === 'Other'"
            v-model="applicant.ethnicity_other"
            type="text"
            class="form-control"
          >
        </div>
      </fieldset>

      <fieldset>
        <legend>What is your gender?</legend>
        <SelectList
          id="gender"
          v-model="applicant.gender"
          :options="selectListOptions.gender"
        />
      </fieldset>

      <fieldset>
        <legend>Is your gender identity the same as the gender you were assigned at birth?</legend>
        <SelectList
          id="gender_same_as_birth"
          v-model="applicant.gender_same_as_birth"
          :options="selectListOptions.yesNo"
        />
      </fieldset>

      <fieldset>
        <legend>How would you describe your sexual orientation?</legend>
        <SelectList
          id="sexual_orientation"
          v-model="applicant.sexual_orientation"
          :options="selectListOptions.sexualOrientation"
        />
      </fieldset>

      <fieldset>
        <legend>Do you have a disability, as defined by the Equality Act 2010?</legend>
        <SelectList
          id="disability"
          v-model="applicant.disability"
          :options="selectListOptions.yesNo"
        />
      </fieldset>

      <fieldset>
        <legend>What is your religion or belief?</legend>
        <SelectList
          id="religion"
          v-model="applicant.religion"
          :options="selectListOptions.religion"
        />
        <div class="custom-control custom-radio">
          <input
            id="religion_other"
            v-model="applicant.religion"
            class="custom-control-input"
            type="radio"
            value="Other"
          >
          <label
            class="custom-control-label"
            for="religion_other"
          >
            Other (please specify)
          </label>
          <input
            v-if="applicant.religion === 'Other'"
            v-model="applicant.religion_other"
            type="text"
            class="form-control"
          >
        </div>
      </fieldset>

      <SaveAndContinueButtons
        :is-saving="isSaving"
        @saveAndContinue="saveAndContinue"
      />
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
};
</script>
