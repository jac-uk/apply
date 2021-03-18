<template>
  <div>
    <dl class="govuk-summary-list smallerMargin">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">11.</span> Have you ever been, or are you currently, subject of an allegation or claim of professional misconduct?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconductDetails"
            :is-draft-application="true"
            :display-month-year-only="true"
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
            :to="{name: 'character-information-professional-conduct'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list smallerMargin">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">12.</span> Have you ever been, or are you currently, subject of an allegation or claim of negligence?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.subjectOfAllegationOrClaimOfNegligenceDetails"
            :is-draft-application="true"
            :display-month-year-only="true"
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
            :to="{name: 'character-information-professional-conduct'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list smallerMargin">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">13.</span> Have you ever been, or are you currently, subject of an allegation or claim of wrongful dismissal?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissalDetails"
            :is-draft-application="true"
            :display-month-year-only="true"
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
            :to="{name: 'character-information-professional-conduct'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list smallerMargin">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">14.</span> Have you ever been, or are you currently, subject of an allegation or claim of discrimination proceedings?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceedingDetails"
            :is-draft-application="true"
            :display-month-year-only="true"
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
            :to="{name: 'character-information-professional-conduct'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list smallerMargin">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">15.</span> Have you ever been, or are you currently, subject of an allegation or claim of harassment proceedings?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.subjectOfAllegationOrClaimOfHarassmentProceedingDetails"
            :is-draft-application="true"
            :display-month-year-only="true"
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
            :to="{name: 'character-information-professional-conduct'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list smallerMargin">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">16.</span> Have you ever been, or are you currently, subject of complaints or disciplinary action?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.complaintOrDisciplinaryActionDetails"
            :is-draft-application="true"
            :display-month-year-only="true"
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
            :to="{name: 'character-information-professional-conduct'}"
          >
            Change
          </RouterLink>
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list smallerMargin">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">17.</span> Have you ever been asked to resign from a position?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="characterInformation.requestedToResignDetails"
            :is-draft-application="true"
            :display-month-year-only="true"
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
            :to="{name: 'character-information-professional-conduct'}"
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
  name: 'ProfessionalConductSummary',
  components: {
    InformationReviewRenderer,
  },
  props: {
    characterInformation: {
      type: Object,
      required: true,
      default: new Object({}),
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
  .smallerMargin {
    margin-bottom: 0;
  }
</style>
