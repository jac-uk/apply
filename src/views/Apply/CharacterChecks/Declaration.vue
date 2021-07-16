<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        Declaration
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
        HMRC
      </h2>
      <p class="govuk-body">
        I consent to HM Revenue and Customs (HMRC) disclosing to the Judicial Appointments Commission (JAC) in strict confidence, any information regarding the following, whether or not held on a computer system, and including where I act as a director, trustee or personal representative:
      </p>
      <ul class="govuk-list govuk-list--bullet">
        <li>disclosing details of any outstanding, or late submitted, personal returns of tax or duties and penalties or surcharges raised thereon</li>
        <li>disclosing details of any  outstanding debts of personal tax or duties and time to pay arrangements</li>
        <li>disclosing details of any on-going enquiry into my personal returns of tax or duties</li>
        <li>where I am a partner, disclosing whether there is any on going enquiry into a partnership return of tax or duties</li>
        <li>disclosing details of any record relating to HMRC Border controls in regard to departure and arrivals in the UK, for example, excise, prohibitions and restrictions</li>
      </ul>

      <h2 class="govuk-heading-l">
        Criminal checks
      </h2>
      <p class="govuk-body">
        I further consent that the Association of Chief Police Officers Criminal Records Office (ACRO) may, in strict confidence, disclose to the JAC any offence of which I have been convicted in relation to a criminal matter or infringement of the law and any caution administered to me at any time, whether spent or unspent, including any impending prosecutions.
      </p>

      <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-9">

      <Checkbox
        id="declaration"
        v-model="application.characterChecks.declaration"
      >
        Yes, I understand and agree
      </Checkbox>

      <button
        class="govuk-button"
        :disabled="!application.characterChecks.declaration"
      >
        Submit
      </button>
    </div>
  </form>
</template>
<script>
import BackLink from '@/components/BackLink';
import Form from '@/components/Form/Form';
import Checkbox from '@/components/Form/Checkbox';
import ErrorSummary from '@/components/Form/ErrorSummary';
import { functions } from '@/firebase';

export default {
  components: {
    BackLink,
    ErrorSummary,
    Checkbox,
  },
  extends: Form,
  data() {
    const defaults = {
      declaration: null,
      status: null,
    };
    const application = this.$store.getters['application/data']();
    application.characterChecks = { ...defaults, ...application.characterChecks };
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
        if (this.application.characterChecks.declaration === true) {
          this.application.characterChecks.status = 'completed';
        }
        await functions.httpsCallable('updateCharacterChecksStatus')({ applicationRecordId: this.applicationRecord.id, exerciseId: this.applicationRecord.exerciseId });
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'character-checks-form-submitted' });
      }
    },
  },
};
</script>
