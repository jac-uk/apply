<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        Professional details
      </h1>

      <ErrorSummary :errors="errors" />

      <div
        v-for="(qualification, index) in application.qualifications"
        :key="index"
      >
        <div class="govuk-inset-text govuk-!-margin-top-0">
          You stated on your application that you have been a {{ $filters.lookup(qualification.type) }}{{ getDate(qualification) }}
        </div>
        <TextField
          id="barMembershipNum"
          v-model="qualification.membershipNumber"
          type="number"
          :label="membershipNumberLabel(qualification.type)"
          required
        />
      </div>

      <button
        class="govuk-button info-btn--professional-bodies--save-and-continue"
      >
        Save and continue
      </button>
    </div>
  </form>
</template>

<script>
import BackLink from '@/components/BackLink.vue';
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import TextField from '@/components/Form/TextField.vue';
import { formatDate } from '@jac-uk/jac-kit/filters/filters';

const membershipNumbers = {
  barrister: 'Bar membership number',
  solicitor: 'Solicitors Regulation Authority number',
  default: 'Membership number',
};
export default {
  name: 'ProfessionalDetails',
  components: {
    BackLink,
    ErrorSummary,
    TextField,
  },
  extends: Form,
  data() {
    const data = this.$store.getters['application/data']();
    const application = { ...data };
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
    getDate(value) {
      if (value.date) {
        return ` since ${formatDate(value.date)}.`;
      }
      if (value.calledToBarDate) {
        return ` since ${formatDate(value.calledToBarDate)}.`;
      }
      return '.';
    },
    membershipNumberLabel(type) {
      return membershipNumbers[type] || membershipNumbers.default;
    },
    async save() {
      this.validate();
      if (this.isValid()) {
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'candidate-form-tasks-characterChecks-professional-details-magistrate' });
      }
    },
  },
};

</script>
