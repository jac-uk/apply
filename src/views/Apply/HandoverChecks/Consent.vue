<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        Consent
      </h1>

      <ErrorSummary :errors="errors" />

      <h2 class="govuk-heading-l">
        Professional bodies
      </h2>
      <p class="govuk-body">
        I consent to such persons and/or professional bodies as may be required for the purposes of my application disclosing to the JAC, in strict confidence, information relating to my conduct and professional reputation, including:
      </p>
      <ul class="govuk-list govuk-list--bullet">
        <li>the disclosure of the details of any complaints upheld (relating to professional misconduct or inadequate professional service)</li>
        <li>the disclosure of the details of any outstanding complaints that have not yet been determined or resolved relating to professional misconduct or inadequate professional service</li>
      </ul>

      <h2 class="govuk-heading-l">
        Criminal checks
      </h2>
      <p class="govuk-body">
        I consent that the Association of Chief Police Officers Criminal Records Office (ACRO) may, in strict confidence, disclose to the JAC any offence of which I have been convicted in relation to a criminal matter or infringement of the law and any caution administered to me at any time, whether spent or unspent, including any impending prosecutions.
      </p>

      <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-9">

      <Checkbox
        id="consent"
        v-model="application.handoverChecks.consent"
      >
        Yes, I understand and consent to handover checks being undertaken
      </Checkbox>

      <button
        class="govuk-button"
        :disabled="!application.handoverChecks.consent"
      >
        Submit
      </button>
    </div>
  </form>
</template>
<script>
import firebase from '@firebase/app';
import BackLink from '@/components/BackLink';
import Form from '@/components/Form/Form';
import Checkbox from '@/components/Form/Checkbox';
import ErrorSummary from '@/components/Form/ErrorSummary';

export default {
  name: 'Consent',
  components: {
    BackLink,
    ErrorSummary,
    Checkbox,
  },
  extends: Form,
  data() {
    const defaults = {
      consent: null,
      status: null,
    };
    const application = this.$store.getters['application/data']();
    application.handoverChecks = { ...defaults, ...application.handoverChecks };
    return {
      application,
    };
  },
  computed: {
    applicationRecord() {
      return this.$store.state.application.record;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        if (this.application.handoverChecks.consent === true) {
          this.application.handoverChecks.status = 'completed';
          this.application.handoverChecks.completedAt = firebase.firestore.FieldValue.serverTimestamp();
        }
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'handover-checks-form-submitted' });
      }
    },
  },
};
</script>
