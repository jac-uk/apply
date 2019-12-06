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
              v-for="(task, taskIndex) in taskGroup.tasks"
              :key="task.id"
              class="govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom "
              :class="{'container-border-top' : taskIndex === 0 }"
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
    isLegal() {
      return this.vacancy.typeOfExercise ==='legal';
    },
    applicationProgress() {
      if (this.application && this.application.progress) {
        return this.application.progress;
      } else {
        return {};
      }
    },
    taskGroups() {
      let data = [];
      if (this.applicationProgress) {
        data.push(
          {
            title: 'Account profile',
            tasks: [
              { title: 'Personal details', id: 'personal-details', done: this.applicationProgress.personalDetails },
              { title: 'Character information', id: 'character-information', done: this.applicationProgress.characterInformation },
              { title: 'Equality and diversity', id: 'equality-and-diversity-survey', done: this.applicationProgress.equalityAndDiversitySurvey },
            ],
          },
        );
        data.push(
          {
            title: 'Working preferences',
            tasks: [
              { title: 'Set part-time working preferences', id: 'part-time-working-preferences', done: this.applicationProgress.partTimeWorkingPreferences },
            ],
          },
        );
        if (this.isLegal) {
          data.push(
            {
              title: 'Qualifications and experience',
              tasks: [
                { title: 'Add relevant qualifications', id: 'relevant-qualifications', done: this.applicationProgress.relevantQualifications },
                { title: 'Add post-qualification work experience', id: 'post-qualification-work-experience', done: this.applicationProgress.postQualificationWorkExperience },
                { title: 'Add judicial experience', id: 'judicial-experience', done: this.applicationProgress.judicialExperience },
              ],
            },
          );
        } else {
          data.push(
            {
              title: 'Memberships and Experience',
              tasks: [
                { title: 'add memberships', id: 'memberships', done: false },
                { title: 'add experience', id: 'experience', done: false },
                { title: 'add gaps in employment', id: 'employment-gaps', done: false },
              ],
            },
          );
        }
        data.push(
          {
            title: 'Assessments',
            tasks: [
              { title: 'Give independent assessors\' details', id: 'assessors-details', done: this.applicationProgress.assessorsDetails },
              { title: 'Upload self-assessment competencies (SelfAssessmentCompetencies)', id: 'self-assessment-competencies', done: this.applicationProgress.selfAssessmentCompetencies },
              { title: 'Statement of suitability (LeadershipSuitability)', id: 'leadership-statement-of-suitability', done: this.applicationProgress.leadershipSuitability },
              { title: 'Statement of suitability (StatementOfSuitability)', id: 'statement-of-suitability', done: this.applicationProgress.statementOfSuitability },
            ],
          },
        );
        data.push(
          {
            title: 'Apply',
            tasks: [
              { title: 'Review application', id: 'review', done: false },
            ],
          },
        );
      }
      return data;
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
