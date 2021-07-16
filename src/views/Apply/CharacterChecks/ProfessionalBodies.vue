<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        Professional bodies
      </h1>

      <ErrorSummary :errors="errors" />

      <div
        v-for="(qualification, index) in application.qualifications"
        :key="index"
      >
        <div class="govuk-inset-text govuk-!-margin-top-0">
          You stated on your application that you have been a {{ qualification.type | lookup }} since {{ qualification.date | formatDate }}.
        </div>
        <TextField
          id="barMembershipNum"
          v-model="qualification.membershipNumber"
          type="number"
          :label="membershipNumberLabel(qualification.type)"
          required
        />
      </div>

      <RadioGroup
        id="magistrate"
        v-model="application.magistrate"
        label="Have you been a magistrate?"
        required
        hint=""
      >
        <RadioItem
          :value="true"
          label="Yes"
        >
          <div class="govuk-form-group">
            <DateInput
              id="magistrateStartDate"
              v-model="application.magistrateStartDate"
              :required="application.magistrate"
              label="From date"
              hint="For example, 12 11 2007"
            />
            <DateInput
              id="magistrateEndDate"
              v-model="application.magistrateEndDate"
              label="Until date"
              hint="For example, 11 6 2020. Leave blank if this is your present role."
            />
            <TextField
              id="magistrateLocation"
              v-model="application.magistrateLocation"
              :required="application.magistrate"
              label="Location"
            />
          </div>
        </RadioItem>
        <RadioItem
          :value="false"
          label="No"
        />
      </RadioGroup>

      <button
        class="govuk-button info-btn--professional-bodies--save-and-continue"
      >
        Save and continue
      </button>
    </div>
  </form>
</template>

<script>
import BackLink from '@/components/BackLink';
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextField from '@/components/Form/TextField';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import DateInput from '@/components/Form/DateInput';

const membershipNumbers = {
  barrister: 'Bar membership number',
  solicitor: 'Solicitors Regulation Authority number',
  default: 'Membership number',
};
export default {
  components: {
    BackLink,
    ErrorSummary,
    TextField,
    RadioGroup,
    RadioItem,
    DateInput,
  },
  extends: Form,
  data() {
    const defaults = {
      magistrate: null,
      magistrateStartDate: null,
      magistrateEndDate: null,
      magistrateLocation: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      membershipNumbers,
      application,
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
  },
  methods: {
    membershipNumberLabel(type) {
      return membershipNumbers[type] || membershipNumbers.default;
    },
    async save() {
      this.validate();
      if (this.isValid()) {
        if (this.application.magistrate === false) {
          this.application.magistrateStartDate = null;
          this.application.magistrateEndDate = null;
          this.application.magistrateLocation = null;
        }
        await this.$store.dispatch('application/save', this.application);

        if (this.vacancy.characterChecks && this.vacancy.characterChecks.HMRC) {
          this.$router.push({ name: 'character-checks-HMRC' });
        } else {
          this.$router.push({ name: 'character-checks-more-details' });
        }
      }
    },
  },
};

</script>
