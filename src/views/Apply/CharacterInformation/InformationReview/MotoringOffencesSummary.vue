<template>
  <div>
    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          4. Have you ever been disqualified from driving?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.drivingDisqualificationDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-motoring-offences'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          5. Have you ever been convicted for driving under the influence of drink or drugs?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.drivingUnderInfluenceConvictionDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-motoring-offences'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          6. Do you have any endorsements on your licence?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationRadioButtonRenderer
            :value="application.characterInformation.drivingLicenceEndorsements"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-motoring-offences'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          7. Were you convicted of any motoring offences in the past 4 years?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationRadioButtonRenderer
            :value="application.characterInformation.recentDrivingConvictions"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
          <RouterLink
            v-if="canEdit"
            class="govuk-link"
            style="display:inline-block;"
            :to="{name: 'character-information-motoring-offences'}"
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
import InformationRadioButtonRenderer from '@/components/Page/InformationRadioButtonRenderer';

export default {
  name: 'MotoringOffencesSummary',
  components: {
    InformationReviewRenderer,
    InformationRadioButtonRenderer,
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

