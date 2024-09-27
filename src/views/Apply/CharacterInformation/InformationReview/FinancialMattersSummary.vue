<template>
  <div>
    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">6.</span> Have you ever been declared bankrupt?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.bankruptcyDetails"
            :is-draft-application="true"
            :display-month-year-only="false"
          />
        </dd>
        <dd
          v-if="displayChangeLink"
          class="govuk-summary-list__actions"
        >
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-financial-matters'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">7.</span>
          <span v-if="version === 3"> Have you ever entered into an Individual Voluntary Agreement (IVA) or other similar arrangement?</span>
          <span v-else> Have you ever entered into an Individual Voluntary Agreement (IVA)?</span>
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.ivaDetails"
            :is-draft-application="true"
            :display-month-year-only="false"
          />
        </dd>
        <dd
          v-if="displayChangeLink"
          class="govuk-summary-list__actions"
        >
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-financial-matters'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">8.</span>
          <span v-if="version === 3"> Have you ever filed late tax returns and/or made late tax payments?</span>
          <span v-else> Have you ever filed late tax returns?</span>
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.lateTaxReturnDetails"
            :is-draft-application="true"
            :display-month-year-only="false"
          />
        </dd>
        <dd
          v-if="displayChangeLink"
          class="govuk-summary-list__actions"
        >
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-financial-matters'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">9.</span>
          <span v-if="version === 3"> Have you ever filed late VAT returns and/or made late VAT payments?</span>
          <span v-else> Have you ever filed late VAT returns?</span>
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.lateVatReturnDetails"
            :is-draft-application="true"
            :display-month-year-only="false"
          />
        </dd>
        <dd
          v-if="displayChangeLink"
          class="govuk-summary-list__actions"
        >
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-financial-matters'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">10.</span> Have you ever been fined by HMRC?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.hmrcFineDetails"
            :is-draft-application="true"
            :display-month-year-only="false"
          />
        </dd>
        <dd
          v-if="displayChangeLink"
          class="govuk-summary-list__actions"
        >
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-financial-matters'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl
      v-if="version === 3"
      class="govuk-summary-list govuk-!-margin-bottom-0"
    >
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">11.</span> Are you aware of any open HMRC enquiries into your tax affairs?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.hmrcTaxDetails"
            :is-draft-application="true"
            :display-month-year-only="false"
          />
        </dd>
        <dd
          v-if="displayChangeLink"
          class="govuk-summary-list__actions"
        >
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-financial-matters'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import InformationReviewRenderer from '@/components/Page/InformationReviewRenderer.vue';

export default {
  name: 'FinancialMattersSummary',
  components: {
    InformationReviewRenderer,
  },
  props: {
    characterInformation: {
      type: Object,
      required: true,
      default: new Object({}),
    },
    version: {
      type: Number,
      required: true,
      default: 2,
    },
    canEdit: {
      type: Boolean,
      required: true,
      default: true,
    },
    displayChangeLink: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
};
</script>

<style scoped>
  .widerColumn {
    width: 70%;
  }
</style>
