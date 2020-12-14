<template>
  <div>
    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          8. Have you ever been declared bankrupt?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.bankruptcyDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          9. Have you ever entered into an Individual Voluntary Agreement (IVA)?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.ivaDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          10. Have you ever filed late tax returns?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.lateTaxReturnDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          11. Have you ever filed late VAT returns?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.lateVatReturnDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          12. Have you ever been filed by HMRC?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.hmrcFineDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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
import InformationReviewRenderer from '@/components/Page/InformationReviewRenderer';

export default {
  name: 'FinancialMattersSummary',
  components: {
    InformationReviewRenderer,
  },
  props: {
    application: {
      type: Object,
      required: true,
      default: new Object(),
    },
    canEdit: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
};
</script>
