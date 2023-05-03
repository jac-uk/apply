<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Equality and diversity
        </h1>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <p class="govuk-body-l">
          The JAC is committed to equality and diversity and monitors selection processes to ensure that they are fair.
          If you do not want to disclose your diversity data in any given area, please select ‘Prefer not to say’ for the relevant question.
        </p>
        <p class="govuk-body-l">
          The JAC will use the information you provide in two ways: where the <a
            class="govuk-link info-link--equality-and-diversity--equal-merit-approach"
            href="https://www.judicialappointments.gov.uk/equal-merit"
            target="_blank"
          >Equal Merit approach</a> applies, and to monitor the selection process. Other than for the purposes of Equal Merit,
          your diversity monitoring information will not play any part in the selection process.
        </p>
        <p class="govuk-body-l">
          The JAC may also use the information you provided for the purpose of “<a
            class="govuk-link info-link--equality-and-diversity--outreach"
            href="https://www.judicialappointments.gov.uk/diversity-strategy"
            target="_blank"
          >Outreach</a>”, to support our statutory duty to encourage diversity in the pool of applicants for judicial appointment.
        </p>
        <p class="govuk-body-l">
          If you are recommended for an appointment we will also share your information with the Ministry of Justice,
          Judicial Office and His Majesty's Courts and Tribunal Service.
        </p>

        <RadioGroup
          id="share-data"
          v-model="equalityAndDiversitySurvey.shareData"
          required
          label="You can opt out if you do not wish to share your data with MoJ, HMCTS, and Judicial Office."
        >
          <RadioItem
            :value="true"
            label="Share"
          />
          <RadioItem
            :value="false"
            label="Do not share"
          />
        </RadioGroup>

        <CheckboxGroup
          id="professional-background"
          v-model="equalityAndDiversitySurvey.professionalBackground"
          required
          label="What is your professional background?"
          hint="Select all that apply."
        >
          <CheckboxItem
            value="barrister"
            label="Barrister"
          />
          <CheckboxItem
            value="cilex"
            label="Fellow of the Chartered Institute of Legal Executives (CILEx)"
          />
          <CheckboxItem
            value="solicitor"
            label="Solicitor"
          />
          <CheckboxItem
            value="other-professional-background"
            label="Other"
          >
            <TextField
              id="other-professional-background-details"
              v-model="equalityAndDiversitySurvey.otherProfessionalBackgroundDetails"
              label="Other role"
              class="govuk-!-width-two-thirds"
            />
          </CheckboxItem>
          <CheckboxItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </CheckboxGroup>

        <CheckboxGroup
          v-if="isLegal"
          id="current-legal-role"
          v-model="equalityAndDiversitySurvey.currentLegalRole"
          required
          label="What is your current legal role?"
          hint="Select all that apply."
        >
          <CheckboxItem
            value="academic"
            label="Academic"
          />
          <CheckboxItem
            value="barrister"
            label="Barrister"
          />
          <CheckboxItem
            value="cilex"
            label="Fellow of the Chartered Institute of Legal Executives (CILEx)"
          />
          <CheckboxItem
            value="solicitor"
            label="Solicitor"
          />
          <CheckboxItem
            value="fee-paid-court-judge"
            label="Fee-paid court judge"
          />
          <CheckboxItem
            value="fee-paid-tribunal-judge"
            label="Fee-paid tribunal judge"
          />
          <CheckboxItem
            value="other-fee-paid-judicial-office-holder"
            label="Other fee-paid judicial office holder"
          >
            <TextField
              id="other-fee-paid-judicial-office-holder-details"
              v-model="equalityAndDiversitySurvey.otherCurrentFeePaidJudicialOfficeHolderDetails"
              label="Other fee-paid Judicial Office holder role"
              class="govuk-!-width-two-thirds"
            />
          </CheckboxItem>
          <CheckboxItem
            value="salaried-court-judge"
            label="Salaried court judge"
          />
          <CheckboxItem
            value="salaried-tribunal-judge"
            label="Salaried tribunal judge"
          />
          <CheckboxItem
            value="other-salaried-judicial-office-holder"
            label="Other salaried Judicial Office holder"
          >
            <TextField
              id="other-salaried-judicial-office-holder-details"
              v-model="equalityAndDiversitySurvey.otherCurrentSalariedJudicialOfficeHolderDetails"
              label="Other salaried Judicial Office holder role"
              class="govuk-!-width-two-thirds"
            />
          </CheckboxItem>
          <CheckboxItem
            value="other-current-legal-role"
            label="Other"
          >
            <TextField
              id="other-current-legal-role-details"
              v-model="equalityAndDiversitySurvey.otherCurrentLegalRoleDetails"
              label="Current legal role"
              class="govuk-!-width-two-thirds"
            />
          </CheckboxItem>
          <CheckboxItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </CheckboxGroup>

        <RadioGroup
          id="fee-paid-judicial-role"
          v-model="equalityAndDiversitySurvey.feePaidJudicialRole"
          required
          label="Do you hold, or have you ever held in the past, a fee-paid judicial role?"
        >
          <RadioItem
            :value="false"
            label="I have not previously held a fee-paid role"
          />
          <RadioItem
            value="fee-paid-court-post"
            label="Fee-paid court post"
          />
          <RadioItem
            value="fee-paid-tribunal-post"
            label="Fee-paid tribunal post"
          />
          <RadioItem
            value="other-fee-paid-judicial-office"
            label="Other fee-paid Judicial Office"
          >
            <TextField
              id="other-fee-paid-judicial-office-details"
              v-model="equalityAndDiversitySurvey.otherFeePaidJudicialRoleDetails"
              label="Other fee-paid Judicial Office role"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <!-- START: NEW SOCIAL MOBILITY QUESTIONS -->
        <div v-if="vacancy.applicationOpenDate > new Date('2023-04-01')">
          <RadioGroup
            id="occupation-of-childhood-earner"
            v-model="equalityAndDiversitySurvey.occupationOfChildhoodEarner"
            required
            label="What was the occupation of your main household earner when you were about aged 14?"
          >
            <RadioItem
              value="professional"
              label="Modern professional & traditional professional occupations such as: teacher, nurse, physiotherapist, social worker, musician, police officer (sergeant or above), software designer, accountant, solicitor, medical practitioner, scientist, civil / mechanical engineer."
            />

            <RadioItem
              value="manager"
              label="Senior, middle or junior managers or administrators such as: finance manager, chief executive, large business owner, office manager, retail manager, bank manager, restaurant manager, warehouse manager."
            />

            <RadioItem
              value="clerical"
              label="Clerical and intermediate occupations such as: secretary, personal assistant, call centre agent, clerical worker, nursery nurse."
            />

            <RadioItem
              value="technical"
              label="Technical and craft occupations such as: motor mechanic, plumber, printer, electrician, gardener, train driver."
            />

            <RadioItem
              value="manual"
              label="Routine, semi-routine manual and service occupations such as: postal worker, machine operative, security guard, caretaker, farm worker, catering assistant, sales assistant, HGV driver, cleaner, porter, packer, labourer, waiter/waitress, bar staff."
            />

            <RadioItem
              value="unemployed"
              label="Long-term unemployed (claimed Jobseeker’s Allowance or earlier unemployment benefit for more than a year)."
            />

            <RadioItem
              value="small-business-owner"
              label="Small business owners who employed less than 25 people such as: corner shop owners, small plumbing companies, retail shop owner, single restaurant or cafe owner, taxi owner, garage owner."
            />

            <RadioItem
              value="other"
              label="Other such as: retired, this question does not apply to me, I don’t know."
            />

            <RadioItem
              value="prefer-not-to-say"
              label="I prefer not to say."
            />
          </RadioGroup>

          <RadioGroup
            id="state-or-fee-school"
            v-model="equalityAndDiversitySurvey.stateOrFeeSchool16"
            required
            label="Which type of school did you attend for the most time between the ages of 11 and 16?"
          >
            <RadioItem
              value="uk-state-non-selective"
              label="A state-run or state-funded school – non-selective"
            />
            <RadioItem
              value="uk-state-selective"
              label="A state-run or state-funded school – selective"
            />
            <RadioItem
              value="uk-independent-fee"
              label="Independent or fee-paying school"
            />
            <RadioItem
              value="uk-independent-fee-with-bursary"
              label="Independent or fee-paying school, where I received a bursary covering 90% or more of my tuition"
            />
            <RadioItem
              value="non-uk-educated"
              label="Attended school outside the UK"
            />
            <RadioItem
              value="do-not-know"
              label="I don't know"
            />
            <RadioItem
              value="prefer-not-to-say"
              label="Prefer not to say"
            />
          </RadioGroup>

          <RadioGroup
            id="parents-attended-university"
            v-model="equalityAndDiversitySurvey.parentsAttendedUniversity"
            required
            label="Did either of your parents attend university and gain a degree (e.g. BA/BSc or equivalent) by the time you were 18?"
          >
            <RadioItem
              :value="false"
              label="No, neither of my parents attended university"
            />
            <RadioItem
              :value="true"
              label="Yes, one or both of my parents attended university"
            />
            <RadioItem
              value="do-not-know"
              label="Do not know / not sure"
            />
            <RadioItem
              value="prefer-not-to-say"
              label="I prefer not to say"
            />
          </RadioGroup>
        </div>
        <!-- END: NEW SOCIAL MOBILITY QUESTIONS -->

        <!-- START: OLD SOCIAL MOBILITY QUESTIONS -->
        <div v-else>
          <RadioGroup
            id="state-or-fee-school"
            v-model="equalityAndDiversitySurvey.stateOrFeeSchool"
            required
            label="Between the ages 11 to 18, did you mainly go to a state or fee-paying school?"
          >
            <RadioItem
              value="uk-state-selective"
              label="UK state school - selective"
            />
            <RadioItem
              value="uk-state-non-selective"
              label="UK state school - non-selective"
            />
            <RadioItem
              value="uk-independent-fee"
              label="UK independent or fee-paying school"
            />
            <RadioItem
              value="uk-independent-fee-with-bursary"
              label="UK independent or fee-paying school with financial assistance (bursary or means-tested scholarship)"
            />
            <RadioItem
              value="non-uk-educated"
              label="I did not go to school in the UK"
            />
            <RadioItem
              value="prefer-not-to-say"
              label="Prefer not to say"
            />
          </RadioGroup>

          <RadioGroup
            id="oxbridge-universities"
            v-model="equalityAndDiversitySurvey.oxbridgeUni"
            required
            label="Did you go to either Oxford or Cambridge universities?"
          >
            <RadioItem
              :value="true"
              label="Yes"
            />
            <RadioItem
              :value="false"
              label="No"
            />
            <RadioItem
              value="prefer-not-to-say"
              label="Prefer not to say"
            />
          </RadioGroup>

          <RadioGroup
            id="first-generation-student"
            v-model="equalityAndDiversitySurvey.firstGenerationStudent"
            required
            label="Were you the first generation in your family to go to university?"
          >
            <RadioItem
              :value="true"
              label="Yes"
            />
            <RadioItem
              :value="false"
              label="No"
            />
            <RadioItem
              value="non-university-educated"
              label="I did not go to university"
            />
            <RadioItem
              value="prefer-not-to-say"
              label="Prefer not to say"
            />
          </RadioGroup>
        </div>
        <!-- END: OLD SOCIAL MOBILITY QUESTIONS -->

        <RadioGroup
          id="ethnic-group"
          v-model="equalityAndDiversitySurvey.ethnicGroup"
          required
          label="What is your ethnic group?"
        >
          <p class="govuk-heading-s govuk-!-margin-top-6">
            Asian/Asian British
          </p>

          <RadioItem
            value="bangladeshi"
            label="Bangladeshi"
          />
          <RadioItem
            value="chinese"
            label="Chinese"
          />
          <RadioItem
            value="indian"
            label="Indian"
          />
          <RadioItem
            value="pakistani"
            label="Pakistani"
          />
          <RadioItem
            value="other-asian"
            label="Any other Asian background"
          >
            <TextField
              id="other-asian-details"
              v-model="equalityAndDiversitySurvey.otherEthnicGroupAsianDetails"
              label="Other Asian background"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>

          <p class="govuk-heading-s govuk-!-margin-top-6">
            Black/African/Caribbean/Black British
          </p>

          <RadioItem
            value="african"
            label="African"
          />
          <RadioItem
            value="caribbean"
            label="Caribbean"
          />
          <RadioItem
            value="other-black"
            label="Any other Black/African/Caribbean background"
          >
            <TextField
              id="other-black-details"
              v-model="equalityAndDiversitySurvey.otherEthnicGroupBlackDetails"
              label="Other Black/African/Caribbean background"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>

          <p class="govuk-heading-s govuk-!-margin-top-6">
            White
          </p>

          <RadioItem
            value="uk-ethnic"
            label="English, Welsh, Scottish, Northern Ireland, British"
          />
          <RadioItem
            value="irish"
            label="Irish"
          />
          <RadioItem
            value="gypsy-irish-traveller"
            label="Gypsy or Irish Traveller"
          />
          <RadioItem
            value="other-white"
            label="Any other White background"
          >
            <TextField
              id="other-white-details"
              v-model="equalityAndDiversitySurvey.otherEthnicGroupWhiteDetails"
              label="Other White background"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>

          <p class="govuk-heading-s govuk-!-margin-top-6">
            Mixed or multiple ethnic backgrounds
          </p>

          <RadioItem
            value="white-black-caribbean"
            label="White and Black Caribbean"
          />
          <RadioItem
            value="white-black-african"
            label="White and Black African"
          />
          <RadioItem
            value="white-asian"
            label="White and Asian"
          />
          <RadioItem
            value="other-mixed"
            label="Any other mixed or multiple ethnic backgrounds"
          >
            <TextField
              id="other-mixed-details"
              v-model="equalityAndDiversitySurvey.otherEthnicGroupMixedDetails"
              label="Other mixed or multiple ethnic backgrounds"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>

          <p class="govuk-heading-s govuk-!-margin-top-6">
            Other ethnic group
          </p>

          <RadioItem
            value="other-ethnic-group"
            label="Other"
          >
            <TextField
              id="other-ethnic-details"
              v-model="equalityAndDiversitySurvey.otherEthnicGroupDetails"
              label="Other ethnic background"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <RadioGroup
          id="gender"
          v-model="equalityAndDiversitySurvey.gender"
          required
          label="What is your sex?"
        >
          <RadioItem
            value="female"
            label="Female"
          />
          <RadioItem
            value="male"
            label="Male"
          />
          <RadioItem
            value="gender-neutral"
            label="Gender neutral"
          />
          <RadioItem
            value="other-gender"
            label="Other sex"
          >
            <TextField
              id="other-gender-details"
              v-model="equalityAndDiversitySurvey.otherGenderDetails"
              label="Other sex"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <RadioGroup
          id="changed-gender"
          v-model="equalityAndDiversitySurvey.changedGender"
          required
          label="Is the gender you identify with the same as your sex registered at birth?"
          hint="This is about gender re-assignment."
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          >
            <TextField
              id="gender-indentity-details"
              v-model="equalityAndDiversitySurvey.genderIdentityDetails"
              label="Please enter your gender identity"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <RadioGroup
          id="sexual-orientation"
          v-model="equalityAndDiversitySurvey.sexualOrientation"
          required
          label="How would you describe your sexual orientation?"
        >
          <RadioItem
            value="bisexual"
            label="Bisexual"
          />
          <RadioItem
            value="gay-man"
            label="Gay man"
          />
          <RadioItem
            value="gay-woman-lesbian"
            label="Gay woman or lesbian"
          />
          <RadioItem
            value="heterosexual-straight"
            label="Heterosexual or straight"
          />
          <RadioItem
            value="other-sexual-orientation"
            label="Other"
          >
            <TextField
              id="other-sexual-orientation-details"
              v-model="equalityAndDiversitySurvey.otherSexualOrientationDetails"
              label="Other sexual orientation"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <RadioGroup
          id="disability"
          v-model="equalityAndDiversitySurvey.disability"
          required
          label="Do you have a disability?"
        >
          <p class="govuk-hint govuk-!-margin-top-0">
            Disability is defined in the
            <a
              class="govuk-link"
              href="https://www.gov.uk/definition-of-disability-under-equality-act-2010"
              target="_blank"
            >
              Equality Act 2010.
            </a>
          </p>

          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="disability-details"
              v-model="equalityAndDiversitySurvey.disabilityDetails"
              label="Add disability details"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <RadioGroup
          id="religion-faith"
          v-model="equalityAndDiversitySurvey.religionFaith"
          required
          label="What is your religion?"
        >
          <RadioItem
            value="no-religion"
            label="No religion"
          />
          <RadioItem
            value="athiest"
            label="Atheist"
          />
          <RadioItem
            value="buddhist"
            label="Buddhist"
          />
          <RadioItem
            value="christian"
            label="Christian"
          />
          <RadioItem
            value="hindu"
            label="Hindu"
          />
          <RadioItem
            value="jewish"
            label="Jewish"
          />
          <RadioItem
            value="muslim"
            label="Muslim"
          />
          <RadioItem
            value="sikh"
            label="Sikh"
          />
          <RadioItem
            value="other-religion"
            label="Other"
          >
            <TextField
              id="other-religion-details"
              v-model="equalityAndDiversitySurvey.otherReligionDetails"
              label="Religion or belief"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <RadioGroup
          id="atttended-outreach-events"
          v-model="equalityAndDiversitySurvey.attendedOutreachEvents"
          required
          label="Have you attended an outreach event on JAC selection exercises?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <RadioGroup
          v-if="isLegal"
          id="participated-in-judicial-workshadowing-scheme"
          v-model="equalityAndDiversitySurvey.participatedInJudicialWorkshadowingScheme"
          required
          label="Did you participate in a Judicial Workshadowing Scheme?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <RadioGroup
          v-if="isLegal"
          id="has-taken-paje"
          v-model="equalityAndDiversitySurvey.hasTakenPAJE"
          required
          label="Have you taken part in the Pre-Application Judicial Education Programme (PAJE)?"
        >
          <p class="govuk-hint govuk-!-margin-top-0">
            The
            <a
              class="govuk-link"
              href="https://www.judiciary.uk/about-the-judiciary/who-are-the-judiciary/diversity/pre-application-judicial-education-programme-paje/"
              target="_blank"
            >
              PAJE scheme
            </a>
            helps under-represented groups develop their understanding of the role and skills of judges.
          </p>
          <RadioItem
            value="online-and-judge-led"
            :label="'online-and-judge-led' | lookup"
          />
          <RadioItem
            value="online-only"
            :label="'online-only' | lookup"
          />
          <RadioItem
            :value="false"
            label="No"
          />
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
        </RadioGroup>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--equality-and-diversity-survey--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import ApplyMixIn from '../ApplyMixIn';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextField from '@/components/Form/TextField';
import TextareaInput from '@/components/Form/TextareaInput';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import CheckboxItem from '@/components/Form/CheckboxItem';
import BackLink from '@/components/BackLink';

export default {
  name: 'EqualityAndDiversitySurvey',
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextField,
    TextareaInput,
    CheckboxGroup,
    CheckboxItem,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      shareData: null,
      professionalBackground: null,
      otherProfessionalBackgroundDetails: null,
      currentLegalRole: null,
      otherCurrentFeePaidJudicialOfficeHolderDetails: null,
      otherCurrentSalariedJudicialOfficeHolderDetails: null,
      otherCurrentLegalRoleDetails: null,
      feePaidJudicialRole: null,
      otherFeePaidJudicialRoleDetails: null,
      occupationOfChildhoodEarner: null,
      parentsAttendedUniversity: null,
      stateOrFeeSchool16: null,
      stateOrFeeSchool: null,
      oxbridgeUni: null,  // TODO remove this field when old social mobility questions are removed
      firstGenerationStudent: null,  // TODO remove this field when old social mobility questions are removed
      ethnicGroup: null,
      otherEthnicGroupAsianDetails: null,
      otherEthnicGroupBlackDetails: null,
      otherEthnicGroupWhiteDetails: null,
      otherEthnicGroupMixedDetails: null,
      otherEthnicGroupDetails: null,
      gender: null,
      otherGenderDetails: null,
      changedGender: null,
      sexualOrientation: null,
      otherSexualOrientationDetails: null,
      disability: null,
      disabilityDetails: null,
      religionFaith: null,
      otherReligionDetails: null,
      attendedOutreachEvents: null,
      participatedInJudicialWorkshadowingScheme: null,
      hasTakenPAJE: null,
    };
    const data = this.$store.getters['candidate/equalityAndDiversitySurvey']();
    const equalityAndDiversitySurvey = { ...defaults, ...data };
    return {
      equalityAndDiversitySurvey: equalityAndDiversitySurvey,
      formId: 'equalityAndDiversitySurvey',
      formData: {
        progress: {},
      },
    };
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.formData.progress[this.formId] = true;
        this.formData.equalityAndDiversitySurvey = this.equalityAndDiversitySurvey;
        await this.$store.dispatch('application/save', this.formData);
        await this.$store.dispatch('candidate/saveEqualityAndDiversitySurvey', this.equalityAndDiversitySurvey);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
