<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <span class="govuk-caption-xl govuk-!-padding-bottom-2 display-block">
        {{ vacancy.referenceNumber }} {{ vacancy.name }}
      </span>
      <h1 class="govuk-heading-xl">
        Apply for the role
      </h1>
      <ol class="govuk-list">
        <li
          v-for="(taskGroup, index) in taskGroups"
          :key="index"
        >
          <h2 class="govuk-heading-m">
            {{ index + 1 }}. {{ taskGroup.title }}
          </h2>
          <ul class="govuk-list govuk-!-margin-bottom-9">
            <li
              v-for="task in taskGroup.tasks"
              :key="task.id"
              class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom container-border-top"
            >
              <div class="govuk-grid-row">
                <div
                  :aria-describedby="`${task.id}-completed`"
                  class="govuk-grid-column-three-quarters"
                >
                  <router-link
                    class="govuk-link govuk-!-font-weight-bold"
                    :to="{name: task.id}"
                  >
                    {{ task.title }}
                  </router-link>
                </div>
                <div class="govuk-grid-column-one-quarter">
                  <strong
                    v-if="task.done"
                    :id="`${task.id}-completed`"
                    class="govuk-tag"
                  >Done</strong>
                  <span
                    v-else
                    :id="`${task.id}-completed`"
                  />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ol>
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
    vacancy() {
      return this.$store.state.exercise.record;
    },
    candidate() {
      return this.$store.state.candidate.record;
    },
    application() {
      return this.$store.state.application.record;
    },
    applicationProgress() {
      if (this.application && this.application.progress) {
        return this.application.progress;
      } else {
        return {};
      }
    },
    taskGroups() {
      if (this.applicationProgress) {
        return [
          { 
            title: 'Account profile',
            tasks: [
              { title: 'Personal details', id: 'personal-details', done: this.applicationProgress.personalDetails },
              { title: 'Declare character information', id: 'character-information', done: this.applicationProgress.characterInformation },
              { title: 'Take the equality and diversity survey', id: 'equality-and-diversity-survey', done: this.applicationProgress.equalityAndDiversitySurvey },
            ],
          },
          {
            title: 'Working preferences',
            tasks: [
              { title: 'Set part-time working preferences', id: 'part-time-working-preferences', done: false },
            ],
          },
          {
            title: 'Qualifications and experience',
            tasks: [
              { title: 'Add relevant qualifications', id: 'relevant-qualifications', done: false },
              { title: 'Add post-qualification work experience', id: 'post-qualification-work-experience', done: false },
              { title: 'Add judicial experience', id: 'judicial-experience', done: false },
            ],
          },
          {
            title: 'Memberships and Experience',
            tasks: [
              { title: 'add memberships', id: 'memberships', done: false },
              { title: 'add experience', id: 'experience', done: false },
              { title: 'add gaps in employment', id: 'employment-gaps', done: false },
            ],
          },
          {
            title: 'Assessments',
            tasks: [
              { title: 'Give independent assessors\' details', id: 'assessors-details', done: false },
              { title: 'Upload self-assessment competencies (SelfAssessmentCompetencies)', id: 'self-assessment-competencies', done: false },
              { title: 'Statement of suitability (LeadershipSuitability)', id: 'leadership-statement-of-suitability', done: false },
              { title: 'Statement of suitability (StatementOfSuitability)', id: 'statement-of-suitability', done: false },
            ],
          },
          {
            title: 'Apply',
            tasks: [
              { title: 'Review application', id: 'review', done: false },
            ],
          },
        ];
      } else {
        return [];
      }
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
