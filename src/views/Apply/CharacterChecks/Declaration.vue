<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <RouterLink
        class="govuk-back-link"
        :to="{ name: 'character-checks-review' }"
      >
        Back
      </RouterLink>

      <div class="govuk-!-margin-top-8">
        <h1 class="govuk-heading-xl">
          Declaration
        </h1>
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
        <h2 class="govuk-heading-l govuk-!-margin-top-8">
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
        <h2 class="govuk-heading-l govuk-!-margin-top-8">
          Criminal checks
        </h2>
        <p class="govuk-body">
          I further consent that the Association of Chief Police Officers Criminal Records Office (ACRO) may, in strict confidence, disclose to the JAC any offence of which I have been convicted in relation to a criminal matter or infringement of the law and any caution administered to me at any time, whether spent or unspent, including any impending prosecutions.
        </p>
        <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-9">

        <CheckboxGroup
          id="declaration"
          v-model="declarationValue"
          label=""
          hint=""
        >
          <CheckboxItem
            id="declarationBox"
            :value="declarationValue"
            label="Yes, I understand and agree"
          />
        </CheckboxGroup>
        <button
          class="govuk-button"
          data-module="govuk-button"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CheckboxItem from '@/components/Form/CheckboxItem';
import CheckboxGroup from '@/components/Form/CheckboxGroup';

export default {
  components: {
    CheckboxItem,
    CheckboxGroup,
  },
  data() {
    return {
      declarationValue: null,
    };
  },
};
    
</script>
