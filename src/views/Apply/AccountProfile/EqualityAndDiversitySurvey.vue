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
            our commitment to equality and diversity.
          </a>
          We share this with the Ministry of Justice, Judicial Office and Her Majesty's Courts and Tribunal Service.
        </p>

        <RadioGroup
          id="has-taken-paje"
          v-model="application.hasTakenPAJE"
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
          v-model="application.ethnicGroup"
          label="What's your ethnic group?"
        >
          <RadioItem
            value="Prefer not to say"
            label="Prefer not to say"
          />

          <p class="govuk-heading-s govuk-!-margin-top-6">
            Asian/Asian British
          </p>

          <RadioItem
            value="Bangladeshi"
            label="Bangladeshi"
          />
          <RadioItem
            value="Chinese"
            label="Chinese"
          />
          <RadioItem
            value="Indian"
            label="Indian"
          />
          <RadioItem
            value="Pakistani"
            label="Pakistani"
          />
          <RadioItem
            value="Any other Asian background"
            label="Any other Asian background"
          />

          <p class="govuk-heading-s govuk-!-margin-top-6">
            Black/African/Caribbean/Black British
          </p>

          <RadioItem
            value="African"
            label="African"
          />
          <RadioItem
            value="Caribbean"
            label="Caribbean"
          />
          <RadioItem
            value="Any other Black/African/Caribbean background"
            label="Any other Black/African/Caribbean background"
          />

          <p class="govuk-heading-s govuk-!-margin-top-6">
            White
          </p>

          <RadioItem
            value="English, Welsh, Scottish, Northern Ireland, British"
            label="English, Welsh, Scottish, Northern Ireland, British"
          />
          <RadioItem
            value="Irish"
            label="Irish"
          />
          <RadioItem
            value="Gypsy or Irish Traveller"
            label="Gypsy or Irish Traveller"
          />
          <RadioItem
            value="Any other White background"
            label="Any other White background"
          />

          <p class="govuk-heading-s govuk-!-margin-top-6">
            Mixed or multiple ethnic backgrounds
          </p>

          <RadioItem
            value="White and Black Caribbean"
            label="White and Black Caribbean"
          />
          <RadioItem
            value="White and Black African"
            label="White and Black African"
          />
          <RadioItem
            value="White and Asian"
            label="White and Asian"
          />
          <RadioItem
            value="Any other mixed or multiple ethnic backgrounds"
            label="Any other mixed or multiple ethnic backgrounds"
          />

          <p class="govuk-heading-s govuk-!-margin-top-6">
            Other ethnic group
          </p>

          <RadioItem
            value="Other"
            label="Other"
          />
        </RadioGroup>

        <RadioGroup
          id="religion-faith"
          v-model="application.religionFaith"
          label="What religion or faith are you?"
        >
          <RadioItem
            value="Prefer not to say"
            label="Prefer not to say"
          />
          <RadioItem
            value="No religion"
            label="No religion"
          />
          <RadioItem
            value="Atheist"
            label="Atheist"
          />
          <RadioItem
            value="Buddhist"
            label="Buddhist"
          />
          <RadioItem
            value="Christian"
            label="Christian"
          />
          <RadioItem
            value="Hindu"
            label="Hindu"
          />
          <RadioItem
            value="Jewish"
            label="Jewish"
          />
          <RadioItem
            value="Muslim"
            label="Muslim"
          />
          <RadioItem
            value="Sikh"
            label="Sikh"
          />
          <RadioItem
            value="Other"
            label="Other"
          >
            <TextField
              id="other-religion-details"
              v-model="application.otherReligionDetails"
              label="Religion or belief"
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
        </RadioGroup>

        <RadioGroup
          id="gender"
          v-model="application.gender"
          label="What gender are you?"
        >
          <RadioItem
            value="Prefer not to say"
            label="Prefer not to say"
          />
          <RadioItem
            value="Female"
            label="Female"
          />
          <RadioItem
            value="Male"
            label="Male"
          />
          <RadioItem
            value="Gender neutral"
            label="Gender neutral"
          />
        </RadioGroup>

        <RadioGroup
          id="changed-gender"
          v-model="application.changedGender"
          label="Have you ever changed gender?"
        >
          <RadioItem
            value="Prefer not to say"
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
          v-model="application.sexualOrientation"
          label="How would you describe your sexual orientation?"
        >
          <RadioItem
            value="Prefer not to say"
            label="Prefer not to say"
          />
          <RadioItem
            value="Bisexual"
            label="Bisexual"
          />
          <RadioItem
            value="Gay man"
            label="Gay man"
          />
          <RadioItem
            value="Gay woman or lesbian"
            label="Gay woman or lesbian"
          />
          <RadioItem
            value="Heterosexual or straight"
            label="Heterosexual or straight"
          />
          <RadioItem
            value="Other"
            label="Other"
          />
        </RadioGroup>

        <RadioGroup
          id="disability"
          v-model="application.disability"
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
            value="Prefer not to say"
            label="Prefer not to say"
          />
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="disability-details"
              v-model="application.disabilityDetails"
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
          v-model="application.stateOrFeeSchool"
          label="Between the ages 11 to 18, did you mainly go to a state or fee-paying school?"
        >
          <RadioItem
            value="Prefer not to say"
            label="Prefer not to say"
          />
          <RadioItem
            value="UK state school - selective"
            label="UK state school - selective"
          />
          <RadioItem
            value="UK state school - non-selective"
            label="UK state school - non-selective"
          />
          <RadioItem
            value="UK independent or fee-paying school"
            label="UK independent or fee-paying school"
          />
          <RadioItem
            value="UK independent or fee-paying school with financial assistance (bursary or means-tested scholarship)"
            label="UK independent or fee-paying school with financial assistance (bursary or means-tested scholarship)"
          />
          <RadioItem
            value="I did not go to school in the UK"
            label="I did not go to school in the UK"
          />
        </RadioGroup>

        <RadioGroup
          id="oxbridge-universities"
          v-model="application.oxbridgeUni"
          label="Did you go to either of the Oxbridge universities?"
        >
          <RadioItem
            value="Prefer not to say"
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
          v-model="application.firstGenerationStudent"
          label="Were you the first generation in your family to go to university?"
        >
          <RadioItem
            value="Prefer not to say"
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
            value="I did not go to university"
            label="I did not go to university"
          />
        </RadioGroup>

        <CheckboxGroup
          id="professional-background"
          v-model="application.professionalBackground"
          label="What is your professional background?"
          hint="Select all that apply."
        >
          <CheckboxItem
            value="Prefer not to say"
            label="Prefer not to say"
          />
          <CheckboxItem
            value="Barrister"
            label="Barrister"
          />
          <CheckboxItem
            value="Fellow of the Chartered Institute of Legal Executives (CILEx)"
            label="Fellow of the Chartered Institute of Legal Executives (CILEx)"
          />
          <CheckboxItem
            value="Solicitor"
            label="Solicitor"
          />
          <CheckboxItem
            value="Other"
            label="Other"
          />
        </CheckboxGroup>

        <CheckboxGroup
          id="current-legal-role"
          v-model="application.currentLegalRole"
          label="What is your current legal role?"
          hint="Select all that apply."
        >
          <CheckboxItem
            value="Prefer not to say"
            label="Prefer not to say"
          />
          <CheckboxItem
            value="Academic"
            label="Academic"
          />
          <CheckboxItem
            value="Barrister"
            label="Barrister"
          />
          <CheckboxItem
            value="Fellow of the Chartered Institute of Legal Executives (CILEx)"
            label="Fellow of the Chartered Institute of Legal Executives (CILEx)"
          />
          <CheckboxItem
            value="Solicitor"
            label="Solicitor"
          />
          <CheckboxItem
            value="fee-paid-court-judge"
            label="Fee-paid court judge"
          />
          <CheckboxItem
            value="Fee-paid tribunal judge"
            label="Fee-paid tribunal judge"
          />
          <CheckboxItem
            value="Other fee-paid judicial office holder"
            label="Other fee-paid judicial office holder"
          />
          <CheckboxItem
            value="Salaried court judge"
            label="Salaried court judge"
          />
          <CheckboxItem
            value="Salaried tribunal judge"
            label="Salaried tribunal judge"
          />
          <CheckboxItem
            value="Other salaried judicial office holder"
            label="Other salaried judicial office holder"
          />
          <CheckboxItem
            value="Other"
            label="Other"
          >
            <TextField
              id="other-current-legal-role-details"
              v-model="application.otherCurrentLegalRoleDetails"
              label="Current legal role"
              class="govuk-!-width-two-thirds"
            />
          </CheckboxItem>
        </CheckboxGroup>

        <RadioGroup
          id="fee-paid-judicial-role"
          v-model="application.feePaidJudicialRole"
          label="Do you hold, or have you held in the past, a fee-paid judicial role?"
        >
          <RadioItem
            value="Prefer not to say"
            label="Prefer not to say"
          />
          <RadioItem
            value="I have not previously held a fee-paid role"
            label="I have not previously held a fee-paid role"
          />
          <RadioItem
            value="Fee-paid court post"
            label="Fee-paid court post"
          />
          <RadioItem
            value="Fee-paid tribunal post"
            label="Fee-paid tribunal post"
          />
          <RadioItem
            value="Other fee-paid judicial office"
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
    const defaults = {
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
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
    };
  },
  methods: {
    async save() {
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
