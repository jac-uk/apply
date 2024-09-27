<template>
  <div>
    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">{{ version === 3 ? '12' : '11' }}.</span>
          <span v-if="version === 3"> Have you ever been, or are you currently, the subject of a complaint or an allegation of professional misconduct? You do not need to declare any complaint that was dismissed in full.</span>
          <span v-else> Have you ever been, or are you currently, subject of an allegation or claim of professional misconduct?</span>
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

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">{{ version === 3 ? '13' : '12' }}.</span>
          <span v-if="version === 3"> Have you ever been, or are you currently, the subject of an allegation or claim of professional negligence? You do not need to declare any claim that was dismissed or withdrawn without a settlement.</span>
          <span v-else> Have you ever been, or are you currently, subject of an allegation or claim of negligence?</span>
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

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">{{ version === 3 ? '14' : '13' }}.</span> Have you ever been, or are you currently, subject of an allegation or claim of wrongful dismissal?
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

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">{{ version === 3 ? '15' : '14' }}.</span> Have you ever been, or are you currently, subject of an allegation or claim of discrimination proceedings?
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

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">{{ version === 3 ? '16' : '15' }}.</span> Have you ever been, or are you currently, subject of an allegation or claim of harassment proceedings?
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

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">{{ version === 3 ? '17' : '16' }}.</span> Have you ever been, or are you currently, subject of complaints or disciplinary action?
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

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          <span v-if="displayChangeLink">{{ version === 3 ? '18' : '17' }}.</span> Have you ever been asked to resign from a position?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            id="request-to-resign"
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
import InformationReviewRenderer from '@/components/Page/InformationReviewRenderer.vue';

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
