<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Personal details
        </h1>

        <p class="govuk-body-l">
          We'll use this information to confirm your identity if you contact us.
        </p>

        <TextField
          id="fullName"
          v-model="candidate.fullName"
          label="Full name"
          hint="You do not need to include any titles."
        />

        <TextField
          id="email"
          v-model="candidate.email"
          label="Email address"
          type="email"
        />

        <DateInput
          id="date-of-birth"
          v-model="candidate.dateOfBirth"
          label="Date of birth"
          hint="For example, 27 3 1964"
        />

        <TextField
          id="national-insurance-number"
          v-model="candidate.nationalInsuranceNumber"
          label="National Insurance number"
          hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
          class="govuk-!-width-one-half"
        />

        <CheckboxGroup
          id="citizenship"
          v-model="candidate.citizenship"
          label="Citizenship"
          hint="Select which countries you're a citizen of."
        >
          <CheckboxItem
            value="uk"
            label="UK"
          />
          <CheckboxItem
            value="republic-of-ireland"
            label="Republic of Ireland"
          />
          <CheckboxItem
            value="another-commonwealth-country"
            label="Another Commonwealth country"
          />
          <CheckboxItem
            value="other"
            label="Other"
          />
        </CheckboxGroup>

        <RadioGroup
          id="reasonable-adjustments"
          v-model="candidate.reasonableAdjustments"
          label="Reasonable Adjustments"
        >
          <p class="govuk-body-m govuk-!-margin-top-0">
            With reference to our
            <a
              class="govuk-link"
              href="#"
              target="_blank"
            >
              reasonable adjustments policy
            </a>
            do you have a disability or long term condition? If you need an adjustment
            during the process let us know.
          </p>
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="reasonable-adjustments-details"
              v-model="candidate.reasonableAdjustmentsDetails"
              label="Give details here"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
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
import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import CheckboxItem from '@/components/Form/CheckboxItem';
import TextareaInput from '@/components/Form/TextareaInput';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import BackLink from '@/components/BackLink';

export default {
  components: {
    TextField,
    DateInput,
    CheckboxGroup,
    CheckboxItem,
    TextareaInput,
    RadioGroup,
    RadioItem,
    BackLink,
  },
  data(){
    const candidate = this.$store.getters['candidate/data']();
    const application = this.$store.getters['application/data']();
    return {
      candidate: {
        fullName: candidate && candidate.fullName || null,
        email: candidate && candidate.email || null,
        dateOfBirth: candidate && candidate.dateOfBirth || null,
        nationalInsuranceNumber: candidate && candidate.nationalInsuranceNumber || null,
        citizenship: candidate && candidate.citizenship || null,
        reasonableAdjustments: candidate && candidate.reasonableAdjustments || null,
        reasonableAdjustmentsDetails: candidate && candidate.reasonableAdjustmentsDetails || null,
      },
      application: application,
    };
  },
  methods: {
    async save() {
      this.application.progress.personalDetails = true;
      await this.$store.dispatch('application/save', this.application);
      await this.$store.dispatch('candidate/save', this.candidate);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
