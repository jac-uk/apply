<template>
  <div>
    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          13. Have you ever been, or are you currently, subject of an allegation or claim of professional misconduct?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.subjectOfAllegationOrClaimOfProfessionalMisconductDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          14. Have you ever been, or are you currently, subject of an allegation or claim of negligence?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.subjectOfAllegationOrClaimOfNegligenceDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          15. Have you ever been, or are you currently, subject of an allegation or claim of wrongful dismissal?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.subjectOfAllegationOrClaimOfWrongfulDismissalDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          16. Have you ever been, or are you currently, subject of an allegation or claim of discrimination proceedings?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.subjectOfAllegationOrClaimOfDiscriminationProceedingDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          17. Have you ever been, or are you currently, subject of an allegation or claim of harassment proceedings?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.subjectOfAllegationOrClaimOfHarassmentProceedingDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          18. Have you ever been, or are you currently, subject of complaints or disciplinary action?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.complaintOrDisciplinaryActionDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          19. Have you ever been asked to resign from a position?
        </dt>
        <dd class="govuk-summary-list__value">
          <InformationReviewRenderer
            :data="application.characterInformation.requestedToResignDetails"
            :is-draft-application="true"
          />
        </dd>
        <dd class="govuk-summary-list__actions">
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
