<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Take the equality and diversity survey
        </h1>

        <p class="govuk-body-l">
          Giving this information means we can apply our
          <a
            class="govuk-link"
            href="dicialappointments.gov.uk/equal-merit"
            target="_blank"
          >
            equal merit rules
          </a>
          in appropriate circumstances.
        </p>

        <p class="govuk-body-l">
          This helps us meet
          <a
            class="govuk-link"
            href="https://www.judicialappointments.gov.uk/providing-diversity-information-jac"
            target="_blank"
          >
            our commitment to equality and diversity
          </a>
        </p>

        <RadioGroup
          id="has-taken-paje"
          v-model="hasTakenPAJE"
          label="Have you taken part in the Pre-application judicial education (PAJE)?"
        >
          <p class="govuk-hint govuk-!-margin-top-0">
            The
            <a
              class="govuk-link"
              href="https://www.judicialappointments.gov.uk/providing-diversity-information-jac"
              target="_blank"
            >
              PAJE scheme
            </a>
            helps under-represented groups develop their understanding of the role and skills of judges.
          </p>
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="ethnic-group"
          v-model="ethnicGroup"
          label="What's your ethnic group?"
        >
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />

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
          />

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
          />

          <p class="govuk-heading-s govuk-!-margin-top-6">
            White
          </p>

          <RadioItem
            value="uk"
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
          />

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
          />

          <p class="govuk-heading-s govuk-!-margin-top-6">
            Other ethnic group
          </p>

          <RadioItem
            value="other-ethnic-group"
            label="Other"
          />
        </RadioGroup>

        <RadioGroup
          id="religion-faith"
          v-model="religionFaith"
          label="What religion or faith are you?"
        >
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
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
              v-model="otherReligionDetails"
              label="Religion or belief"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
        </RadioGroup>

        <RadioGroup
          id="gender"
          v-model="gender"
          label="What gender are you?"
        >
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
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
        </RadioGroup>

        <RadioGroup
          id="changed-gender"
          v-model="changedGender"
          label="Have you ever changed gender?"
        >
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="sexual-orientation"
          v-model="sexualOrientation"
          label="How would you describe your sexual orientation?"
        >
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
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
          />
        </RadioGroup>

        <RadioGroup
          id="disability"
          v-model="disability"
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
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="disability-details"
              v-model="disabilityDetails"
              label="Add disability details"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="state-or-fee-school"
          v-model="stateOrFeeSchool"
          label="Between the ages 11 to 18, did you mainly go to a state or fee-paying school?"
        >
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
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
        </RadioGroup>

        <RadioGroup
          id="oxbridge-universities"
          v-model="oxbridgeUni"
          label="Did you go to either of the Oxbridge universities?"
        >
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="first-generation-student"
          v-model="firstGenerationStudent"
          label="Were you the first generation in your family to go to university?"
        >
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
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
        </RadioGroup>

        <CheckboxGroup
          id="professional-background"
          v-model="professionalBackground"
          label="What is your professional background?"
          hint="Select all that apply."
        >
          <CheckboxItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
          <CheckboxItem
            value="barrister"
            label="Barrister"
          />
          <CheckboxItem
            value="CILEx"
            label="Fellow of the Chartered Institute of Legal Executives (CILEx)"
          />
          <CheckboxItem
            value="solicitor"
            label="Solicitor"
          />
          <CheckboxItem
            value="other-professional-background"
            label="Other"
          />
        </CheckboxGroup>

        <CheckboxGroup
          id="current-legal-role"
          v-model="currentLegalRole"
          label="What is your current legal role?"
          hint="Select all that apply."
        >
          <CheckboxItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
          <CheckboxItem
            value="academic"
            label="Academic"
          />
          <CheckboxItem
            value="barrister"
            label="Barrister"
          />
          <CheckboxItem
            value="CILEx"
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
          />
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
            label="Other salaried judicial office holder"
          />
          <CheckboxItem
            value="other-current-legal-role"
            label="Other"
          >
            <TextField
              id="other-current-legal-role-details"
              v-model="otherCurrentLegalRoleDetails"
              label="Current legal role"
              class="govuk-!-width-two-thirds"
            />
          </CheckboxItem>
        </CheckboxGroup>

        <RadioGroup
          id="fee-paid-judicial-role"
          v-model="feePaidJudicialRole"
          label="Do you hold, or have you held in the past, a fee-paid judicial role?"
        >
          <RadioItem
            value="prefer-not-to-say"
            label="Prefer not to say"
          />
          <RadioItem
            value="no"
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
            label="Other fee-paid judicial office"
          />
        </RadioGroup>

        <button class="govuk-button">
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextField from '@/components/Form/TextField';
import TextareaInput from '@/components/Form/TextareaInput';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import CheckboxItem from '@/components/Form/CheckboxItem';
import BooleanOrNull from '@/helpers/booleanOrNull';

export default {
  components: {
    RadioGroup,
    RadioItem,
    TextField,
    TextareaInput,
    CheckboxGroup,
    CheckboxItem,

  },
  data(){
    return {
      hasTakenPAJE: BooleanOrNull(null),
      ethnicGroup: null,
      religionFaith: null,
      otherReligionDetails: null,
      gender: null,
      changedGender: null,
      sexualOrientation: null,
      disability: null,
      disabilityDetails: null,
      stateOrFeeSchool: null,
      oxbridgeUni: null,
      firstGenerationStudent: null,
      professionalBackground: null,
      currentLegalRole: null,
      otherCurrentLegalRoleDetails: null,
      feePaidJudicialRole: null,

    };
  },
  methods: {
    save() {

    },
  },
};
</script>
