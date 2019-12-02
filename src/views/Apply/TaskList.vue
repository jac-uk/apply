<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <span class="govuk-caption-xl govuk-!-padding-bottom-2 display-block">
        {{ vacancy.referenceNumber }} {{ vacancy.name }}
      </span>

      <h1 class="govuk-heading-xl">
        Apply for the role
      </h1>

      <h2 class="govuk-heading-m">
        1. Account Profile
      </h2>
      <ul class="govuk-list govuk-!-margin-bottom-9">
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom container-border-top">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'personal-details'}"
            >
              Add personal details
            </router-link>
          </span>
        </li>
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'character-information'}"
            >
              Declare character information
            </router-link>
          </span>
        </li>
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'equality-and-diversity-survey'}"
            >
              Take the equality and diversity survey
            </router-link>
          </span>
        </li>
      </ul>

      <h2 class="govuk-heading-m">
        2. Working preferences
      </h2>
      <ul class="govuk-list govuk-!-margin-bottom-9">
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom container-border-top">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'part-time-working-preferences'}"
            >
              Set part-time working preferences
            </router-link>
          </span>
        </li>
      </ul>

      <h2
        id="qualifications-and-experience"
        class="govuk-heading-m"
      >
        3. Qualifications and experience
      </h2>

      <ul class="govuk-list govuk-!-margin-bottom-9">
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom container-border-top">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'relevant-qualifications'}"
            >
              Add relevant qualifications
            </router-link>
          </span>
        </li>
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'post-qualification-work-experience'}"
            >
              Add post-qualification work experience
            </router-link>
          </span>
        </li>
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'judicial-experience'}"
            >
              Add judicial experience
            </router-link>
          </span>
        </li>
      </ul>

      <h2
        v-if="unknownVariable === 'non-legal'"
        id="memberships-and-experience"
        class="govuk-heading-m"
      >
        3. Memberships and Experience
      </h2>
      <ul class="govuk-list govuk-!-margin-bottom-9">
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom container-border-top">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: ''}"
            >
              add memberships
            </router-link>
          </span>
        </li>
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: ''}"
            >
              add experience
            </router-link>
          </span>
        </li>
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: ''}"
            >
              add gaps in employment
            </router-link>
          </span>
        </li>
      </ul>

      <h2 class="govuk-heading-m">
        4. Assessments
      </h2>
      <ul class="govuk-list govuk-!-margin-bottom-9">
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom container-border-top">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'assessors-details'}"
            >
              Give independent assessors' details
            </router-link>
          </span>
        </li>
        <li
          class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom"
        >
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'self-assessment-competencies'}"
            >
              Upload self-assessment competencies (SelfAssessmentCompetencies)
            </router-link>
          </span>
        </li>
        <li
          class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom"
        >
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'leadership-statement-of-suitability'}"
            >
              Statement of suitability (LeadershipSuitability)
            </router-link>
          </span>
        </li>
        <li
          class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom"
        >
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'statement-of-suitability'}"
            >
              Statement of suitability (StatementOfSuitability)
            </router-link>
          </span>
        </li>
      </ul>

      <h2 class="govuk-heading-m">
        5. Apply
      </h2>
      <ul class="govuk-list govuk-!-margin-bottom-9">
        <li class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom container-border-top">
          <span class="govuk-body">
            <router-link
              class="govuk-link govuk-!-font-weight-bold"
              :to="{name: 'review'}"
            >
              Review application
            </router-link>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      unknownVariable: null,
    };
  },
  computed: {
    vacancy () {
      return this.$store.state.exercise.record;
    },
  },
  methods: {
    save() {

    },
  },
};
</script>
<style scoped>

.status {
  float: right;
}

.container-border-top {
  border-top: 1px solid #b1b4b6
}

</style>
