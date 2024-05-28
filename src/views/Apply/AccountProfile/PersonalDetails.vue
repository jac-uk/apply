<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Personal details
        </h1>

        <ErrorSummary :errors="errors" />

        <p class="govuk-body-l">
          We'll use this information to confirm your identity if you contact us or to contact you about your application.
        </p>

        <TextField
          id="title"
          v-model="personalDetails.title"
          label="Title"
          required
        />

        <TextField
          id="firstName"
          v-model="personalDetails.firstName"
          label="First name"
          required
        />

        <TextField
          id="middleNames"
          v-model="personalDetails.middleNames"
          label="Middle name(s)"
        />

        <TextField
          id="lastName"
          v-model="personalDetails.lastName"
          label="Last name"
          required
        />

        <TextField
          id="suffix"
          v-model="personalDetails.suffix"
          label="Suffix"
        />

        <TextField
          id="previousNames"
          v-model="personalDetails.previousNames"
          label="Previous known name(s)"
          hint="Have you ever been known by any other name? For example, life events which may have changed your name such as marriages, divorces, hyphenated names."
        />

        <TextField
          id="professionalName"
          v-model="personalDetails.professionalName"
          label="Professional name"
        />

        <TextField
          id="email"
          v-model="personalDetails.email"
          label="Email address"
          type="email"
          required
        />

        <TextField
          id="phone"
          v-model="personalDetails.phone"
          label="Phone number"
          type="tel"
          hint="For international numbers include the country code. For example, ‘+447123456789’."
        />

        <DateInput
          id="date-of-birth"
          v-model="personalDetails.dateOfBirth"
          required
          :min-date="new Date('1/01/1900')"
          :max-date="new Date()"
          label="Date of birth"
          hint="For example, 27 3 1964"
        />

        <TextField
          id="national-insurance-number"
          v-model="personalDetails.nationalInsuranceNumber"
          label="National Insurance number"
          hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
          class="govuk-!-width-one-half"
          type="nino"
        />

        <RadioGroup
          id="citizenship"
          v-model="personalDetails.citizenship"
          required
          label="Citizenship"
          hint="Select one. If you have dual citizenship, please select the option most appropriate to you."
        >
          <RadioItem
            value="uk"
            label="UK"
          />
          <RadioItem
            value="republic-of-ireland"
            label="Republic of Ireland"
          />
          <RadioItem
            value="another-commonwealth-country"
            label="Another Commonwealth country"
          />
          <RadioItem
            value="other"
            label="Other"
          />
        </RadioGroup>

        <RadioGroup
          id="reasonable-adjustments"
          v-model="personalDetails.reasonableAdjustments"
          required
          label="Reasonable Adjustments"
        >
          <p class="govuk-body-m govuk-!-margin-top-0">
            With reference to our
            <a
              class="govuk-link"
              href="https://judicialappointments.gov.uk/equality-and-diversity/diversity-and-equality-measures/reasonable-adjustments/"
              target="_blank"
            >
              reasonable adjustments policy
            </a>
            do you have a disability or long term health condition that means you need an adjustment during the process?
          </p>
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="reasonable-adjustments-details"
              v-model="personalDetails.reasonableAdjustmentsDetails"
              label="Give details here"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--personal-details--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import ApplyMixIn from '../ApplyMixIn';
import TextField from '@/components/Form/TextField.vue';
import DateInput from '@/components/Form/DateInput.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import BackLink from '@/components/BackLink.vue';
import { splitFullName } from '@jac-uk/jac-kit/helpers/splitFullName';

export default {
  name: 'PersonalDetails',
  components: {
    ErrorSummary,
    TextField,
    DateInput,
    TextareaInput,
    RadioGroup,
    RadioItem,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      title: '',
      firstName: null,
      lastName: null,
      fullName: null,
      email: null,
      phone: null,
      dateOfBirth: null,
      nationalInsuranceNumber: null,
      citizenship: null,
      reasonableAdjustments: null,
      reasonableAdjustmentsDetails: null,
    };

    const data = this.$store.getters['candidate/personalDetails']();
    const personalDetails = { ...defaults, ...data };
    return {
      personalDetails: personalDetails,
      formId: 'personalDetails',
      formData: {},
    };
  },
  created() {
    const { firstName, lastName, fullName } = this.personalDetails;

    if (!firstName && !lastName) {
      if (fullName) {
        const result = splitFullName(fullName);
        this.personalDetails.firstName = result[0];
        this.personalDetails.lastName = result[1];
      } else {
        this.personalDetails.firstName = '';
        this.personalDetails.lastName = '';
      }
    } else {
      this.personalDetails.firstName = firstName;
      this.personalDetails.lastName = lastName;
    }
  },
  methods: {
    async save() {
      this.makeFullName();
      this.validate();
      if (this.isValid()) {
        this.formData[`progress.${this.formId}`] = true;
        this.formData.personalDetails = this.personalDetails;
        this.formData.characterChecks = { status: 'not requested' };
        await this.$store.dispatch('application/save', this.formData);
        await this.$store.dispatch('candidate/savePersonalDetails', this.personalDetails);
        this.$router.push({ name: 'task-list' });
      }
    },
    makeFullName() {
      this.personalDetails.fullName = `${this.personalDetails.firstName} ${this.personalDetails.lastName}`;
    },
  },
};
</script>
