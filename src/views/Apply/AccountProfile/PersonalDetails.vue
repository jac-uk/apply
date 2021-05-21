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
          id="lastName"
          v-model="personalDetails.lastName"
          label="Last name"
          required
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
          hint="Optional. For international numbers include the country code."
        />

        <DateInput
          id="date-of-birth"
          v-model="personalDetails.dateOfBirth"
          required
          label="Date of birth"
          hint="For example, 27 3 1964"
        />

        <TextField
          id="national-insurance-number"
          v-model="personalDetails.nationalInsuranceNumber"
          label="National Insurance number"
          hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
          class="govuk-!-width-one-half"
          required
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
              href="https://www.judicialappointments.gov.uk/reasonable-adjustments-policy"
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
          :disabled="application.status != 'draft'"
          class="govuk-button info-btn--personal-details--save-and-continue"
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
import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';
import TextareaInput from '@/components/Form/TextareaInput';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import BackLink from '@/components/BackLink';
import splitFullName from '@jac-uk/jac-kit/helpers/splitFullName';

export default {
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
    const application = this.$store.getters['application/data']();
    return {
      personalDetails: personalDetails,
      application: application,
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
        this.application.progress.personalDetails = true;
        this.application.personalDetails = this.personalDetails;
        this.application.characterChecks = { status: 'not requested' };
        await this.$store.dispatch('application/save', this.application);
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
