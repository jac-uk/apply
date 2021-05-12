<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        Personal information
      </h1>

      <ErrorSummary :errors="errors" />

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
        id="otherNames"
        v-model="personalDetails.otherNames"
        label="Other names (optional)"
      />

      <TextField
        id="suffix"
        v-model="personalDetails.suffix"
        label="Suffix (optional)"
      />

      <DateInput
        id="dateOfBirth"
        v-model="personalDetails.dateOfBirth"
        required
        label="Date of birth"
        hint="For example, 27 3 1964"
      />

      <TextField
        id="placeOfBirth"
        v-model="personalDetails.placeOfBirth"
        required
        label="Place of Birth"
        hint="Town or city and country."
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

      <Address
        id="currentAddress"
        v-model="personalDetails.address.current"
        required
        label="Address"
      />

      <RadioGroup
        id="currentAddressMoreThan5Years"
        v-model="personalDetails.address.currentMoreThan5Years"
        required
        label="Have you lived at this address for more than 5 years?"
        hint="If you've lived anywhere else in the UK within the past 5 years you need to answer no and enter details."
      >
        <RadioItem
          label="Yes"
          :value="true"
        />
        <RadioItem
          label="No"
          :value="false"
        >
          <RepeatableFields
            v-model="personalDetails.address.previous"
            required
            :component="repeatableFields.Addresses"
          />
        </RadioItem>
      </RadioGroup>

      <TextField
        id="national-insurance-number"
        v-model="personalDetails.nationalInsuranceNumber"
        label="National Insurance number"
        hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
        class="govuk-!-width-one-half"
        required
      />

      <button class="govuk-button info-btn--personal-information--save-and-continue">
        Save and continue
      </button>
    </div>
  </form>
</template>

<script>
import BackLink from '@/components/BackLink';
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import RadioItem from '@/components/Form/RadioItem';
import RadioGroup from '@/components/Form/RadioGroup';
import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';
import RepeatableFields from '@/components/RepeatableFields';
import Addresses from '@/components/RepeatableFields/Addresses';
import Address from '@/components/Form/Address';
import splitFullName from '@jac-uk/jac-kit/helpers/splitFullName';

export default {
  components: {
    BackLink,
    ErrorSummary,
    RadioItem,
    RadioGroup,
    TextField,
    DateInput,
    Address,
    RepeatableFields,
  },
  extends: Form,
  data() {
    const defaults = {
      title: null,
      firstName: null,
      lastName: null,
      otherNames: null,
      suffix: null,
      placeOfBirth: null,
      address: {
        current: {},
        previous: [],
        currentMoreThan5Years: null,
      },
    };
    const data = this.$store.getters['candidate/personalDetails']();
    const personalDetails = { ...defaults, ...data };
    const application = this.$store.getters['application/data']();
    return {
      personalDetails,
      application,
      repeatableFields: {
        Addresses,
      },
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
        if (this.personalDetails.address.currentMoreThan5Years === true) {
          this.personalDetails.address.previous = null;
        }
        this.application.personalDetails = this.personalDetails;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/savePersonalDetails', this.personalDetails);
        this.$router.push({ name: 'character-checks-professional-bodies' });
      }
    },
    makeFullName() {
      this.personalDetails.fullName = `${this.personalDetails.firstName} ${this.personalDetails.lastName}`;
    },
  },
};

</script>
