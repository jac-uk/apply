<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <RouterLink
        v-if="applications && applications.length > 1"
        class="govuk-back-link"
        :to="{ name: 'applications' }"
      >
        Applications
      </RouterLink>
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
      return this.$store.state.vacancy.record;
    },
    candidate() {
      return this.$store.state.candidate.record;
    },
    application() {
      return this.$store.state.application.record;
    },
    applications() {
      return this.$store.state.applications.records;
    },
    isLegal() {
      return this.vacancy.typeOfExercise ==='legal' || this.vacancy.typeOfExercise ==='leadership';
    },
    isNonLegal() {
      return this.vacancy.typeOfExercise ==='non-legal' || this.vacancy.typeOfExercise ==='leadership-non-legal';
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
        data.push({
          title: 'Account profile',
          tasks: [
            { title: 'Personal details', id: 'apply-personal-details', done: this.applicationProgress.personalDetails },
            { title: 'Character information', id: 'apply-character-information', done: this.applicationProgress.characterInformation },
            { title: 'Equality and diversity', id: 'equality-and-diversity-survey', done: this.applicationProgress.equalityAndDiversitySurvey },
          ],
        });
        const workingPreferencesTasklist = [];
        if (this.vacancy.isSPTWOffered) {
          workingPreferencesTasklist.push({ title: 'Set part-time working preferences', id: 'part-time-working-preferences', done: this.applicationProgress.partTimeWorkingPreferences });
        }
        if (this.vacancy.welshRequirement) {
          workingPreferencesTasklist.push({ title: 'Welsh posts', id: 'welsh-posts', done: this.applicationProgress.welshPosts });
        }
        if (workingPreferencesTasklist.length > 0) {
          data.push({
            title: 'Working preferences',
            tasks: workingPreferencesTasklist,
          });
        }

        if (this.isLegal) {
          data.push({
            title: 'Qualifications and experience',
            tasks: [
              { title: 'Relevant qualifications', id: 'relevant-qualifications', done: this.applicationProgress.relevantQualifications },
              { title: 'Post-qualification work experience', id: 'post-qualification-work-experience', done: this.applicationProgress.postQualificationWorkExperience },
              { title: 'Judicial experience', id: 'judicial-experience', done: this.applicationProgress.judicialExperience },
              { title: 'Gaps in employment', id: 'employment-gaps', done: this.applicationProgress.employmentGaps },
            ],
          });
        }
        if (this.isNonLegal) {
          data.push({
            title: 'Memberships and Experience',
            tasks: [
              { title: 'Relevant memberships', id: 'relevant-memberships', done: this.applicationProgress.relevantMemberships },
              { title: 'Relevant experience', id: 'relevant-experience', done: this.applicationProgress.relevantExperience },
              { title: 'Gaps in employment', id: 'employment-gaps', done: this.applicationProgress.employmentGaps },
            ],
          });
        }
        const assessmentOptions = [{ title: 'Independent assessors\' details', id: 'assessors-details', done: this.applicationProgress.assessorsDetails }];
        switch (this.vacancy.assessmentOptions) {
        case 'self-assessment-with-competencies':
          assessmentOptions.push({ title: 'Self assessment with competencies', id: 'self-assessment-competencies', done: this.applicationProgress.selfAssessmentCompetencies });
          break;
        case 'statement-of-suitability-with-competencies':
          // @todo what happens to leadership version?
          assessmentOptions.push({ title: 'Statement of suitability', id: 'statement-of-suitability', done: this.applicationProgress.statementOfSuitability });
          // assessmentOptions.push({ title: 'Statement of suitability', id: 'leadership-statement-of-suitability', done: this.applicationProgress.leadershipSuitability });
          break;
        case 'statement-of-suitability-with-skills-and-abilities':
          assessmentOptions.push({ title: 'Statement of suitability', id: 'statement-of-suitability', done: this.applicationProgress.statementOfSuitability });
          break;
        case 'statement-of-suitability-with-skills-and-abilities-and-cv':
          // @todo build suitability and cv form?
          assessmentOptions.push({ title: 'Statement of suitability and CV', id: 'statement-of-suitability', done: this.applicationProgress.statementOfSuitability });
          break;
        case 'statement-of-eligibility':
          // @todo build statement of eligibility form?
          assessmentOptions.push({ title: 'Statement of eligibility', id: 'statement-of-suitability', done: this.applicationProgress.statementOfSuitability });
          break;
        case 'none':
          break;
        default:
        }
        data.push({
          title: 'Assessments',
          tasks: assessmentOptions,
        });

        data.push({
          title: 'Apply',
          tasks: [
            { title: 'Review application', id: 'review', done: false },
          ],
        });
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
