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
        hint="Enter your first name as it's written on an official document like your driving licence."
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
        hint="Enter your last name as it's written on an official document like your driving licence."
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
        label="ProfessionalName"
      />

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
        type="nino"
      />

      <button class="govuk-button info-btn--personal-information--save-and-continue">
        Save and continue
      </button>
    </div>
  </form>
</template>

<script>
import BackLink from '@/components/BackLink.vue';
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import TextField from '@/components/Form/TextField.vue';
import DateInput from '@/components/Form/DateInput.vue';
import RepeatableFields from '@/components/RepeatableFields.vue';
import Addresses from '@/components/RepeatableFields/Addresses.vue';
import Address from '@/components/Form/Address.vue';
import { splitFullName } from '@jac-uk/jac-kit/helpers/splitFullName';

export default {
  name: 'PersonalInformation',
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
      suffix: null,
      gender: null,
      otherGenderDetails: null,
      changedGender: null,
      placeOfBirth: null,
      nationalInsuranceNumber: null,
      address: {
        current: {},
        previous: [],
        currentMoreThan5Years: null,
      },
    };
    const data1 = this.$store.getters['candidate/personalDetails']();
    const data2 = this.$store.getters['candidate/equalityAndDiversitySurvey']();
    const personalDetails = { ...defaults, ...data1 };
    const equalityAndDiversitySurvey = { ...defaults, ...data2 };
    const application = this.$store.getters['application/data']();
    return {
      personalDetails,
      equalityAndDiversitySurvey,
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
        this.application.equalityAndDiversitySurvey = this.equalityAndDiversitySurvey;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/savePersonalDetails', this.personalDetails);
        await this.$store.dispatch('candidate/saveEqualityAndDiversitySurvey', this.equalityAndDiversitySurvey);
        this.$router.push({ name: 'character-checks-professional-details' });
      }
    },
    makeFullName() {
      this.personalDetails.fullName = `${this.personalDetails.firstName} ${this.personalDetails.lastName}`;
    },
  },
};

</script>
