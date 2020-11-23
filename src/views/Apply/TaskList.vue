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
      <Countdown
        :close-time="vacancyCloseTime"
        :countdown-length="60"
      />
      <span class="govuk-caption-xl govuk-!-padding-bottom-2 display-block">
        {{ vacancy.referenceNumber }} {{ vacancy.name }}
      </span>
      <h1 class="govuk-heading-xl">
        Apply for the role
      </h1>
      <p
        v-if="vacancy.welshPosts"
        class="govuk-!-margin-bottom-8"
      >
        <span class="govuk-body">Os ydych am ffurflen gais yn y Gymraeg cysylltwch a </span>
        <a
          :href="`mailto:${welshPostsContactMailbox}?subject=Re:${welshPostsEmailSubject}`"
          class="govuk-body govuk-link"
        >{{ welshPostsContactMailbox }}</a>
      </p>
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
                  <RouterLink
                    :class="`govuk-link govuk-!-font-weight-bold info-link--task-list--${hyphenization(task.title)}`"
                    :to="{name: task.id}"
                  >
                    {{ task.title }}
                  </RouterLink>
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
      <button
        :disabled="!canApply"
        class="govuk-button info-btn--task-list--review-application"
        @click="reviewApplication"
      >
        Review application
      </button>
    </div>
    <div
      v-if="isClosed"
      class="govuk-grid-column-one-third govuk-!-padding-bottom-8 container-border-bottom"
    >
      <aside
        class="jac-related-items"
        role="complementary"
      >
        <h2 class="govuk-heading-m">
          Related content
        </h2>
        <nav
          role="navigation"
          aria-labelledby="subsection-title"
        >
          <ul
            class="govuk-list govuk-!-font-size-16"
          >
            <li>
              <RouterLink
                class="govuk-link govuk-body-m info-link--task-list--related-content--view-advert"
                :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
              >
                View advert
              </RouterLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script>
import Countdown from '@/components/Page/Countdown';
import { hyphenize } from '@/filters';
import { WELSH_POSTS_CONTACT_MAILBOX, WELSH_POSTS_EMAIL_SUBJECT } from '../../helpers/constants';

export default {
  components: {
    Countdown,
  },
  data() {
    return {
      unknownVariable: null,
      welshPostsContactMailbox: WELSH_POSTS_CONTACT_MAILBOX,
      welshPostsEmailSubject: WELSH_POSTS_EMAIL_SUBJECT,
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    vacancyCloseTime() {
      return this.$store.getters['vacancy/getCloseDate'];
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
      return this.vacancy.typeOfExercise === 'legal' || this.vacancy.typeOfExercise === 'leadership';
    },
    isNonLegal() {
      return this.vacancy.typeOfExercise === 'non-legal' || this.vacancy.typeOfExercise === 'leadership-non-legal';
    },
    isClosed(){
      return this.$store.getters['vacancy/getCloseDate'] < Date.now();
    },
    applicationProgress() {
      if (this.application && this.application.progress) {
        // @TODO: should be calculated, we can't 100% rely on static field values
        return this.application.progress;
      } else {
        return {};
      }
    },
    taskGroups() {
      const data = [];
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
        if (this.vacancy.locationQuestion) {
          workingPreferencesTasklist.push({ title: 'Location preferences', id: 'location-preferences', done: this.applicationProgress.locationPreferences });
        }
        if (this.vacancy.jurisdictionQuestion) {
          workingPreferencesTasklist.push({ title: 'Jurisdiction preferences', id: 'jurisdiction-preferences', done: this.applicationProgress.jurisdictionPreferences });
        }
        if (this.vacancy.additionalWorkingPreferences) {
          if (this.vacancy.additionalWorkingPreferences.length) {
            workingPreferencesTasklist.push({ title: 'Additional preferences', id: 'additional-working-preferences', done: this.applicationProgress.additionalWorkingPreferences });
          }
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
          const tasks = [];
          tasks.push({ title: 'Relevant qualifications', id: 'relevant-qualifications', done: this.applicationProgress.relevantQualifications });
          tasks.push({ title: 'Post-qualification work experience', id: 'post-qualification-work-experience', done: this.applicationProgress.postQualificationWorkExperience });
          if (this.vacancy.previousJudicialExperienceApply) {
            tasks.push({ title: 'Judicial experience', id: 'judicial-experience', done: this.applicationProgress.judicialExperience });
          }
          tasks.push({ title: 'Gaps in employment', id: 'employment-gaps', done: this.applicationProgress.employmentGaps });
          tasks.push({ title: 'Reasonable length of service', id: 'reasonable-length-of-service', done: this.applicationProgress.reasonableLengthOfService });
          data.push({
            title: 'Qualifications and experience',
            tasks: tasks,
          });
        }

        if (this.isNonLegal) {
          const tasks = [];
          if (this.vacancy.memberships && this.vacancy.memberships.length) {
            if (this.vacancy.memberships.indexOf('none') === -1) {
              tasks.push({ title: 'Relevant memberships', id: 'relevant-memberships', done: this.applicationProgress.relevantMemberships });
            }
          }
          tasks.push({ title: 'Relevant experience', id: 'relevant-experience', done: this.applicationProgress.relevantExperience });
          tasks.push({ title: 'Gaps in employment', id: 'employment-gaps', done: this.applicationProgress.employmentGaps });
          tasks.push({ title: 'Reasonable length of service', id: 'reasonable-length-of-service', done: this.applicationProgress.reasonableLengthOfService });
          if (tasks.length) {
            data.push({
              title: 'Memberships and Experience',
              tasks: tasks,
            });
          }
        }

        const assessmentOptions = [{ title: 'Independent assessors\' details', id: 'assessors-details', done: this.applicationProgress.assessorsDetails }];
        switch (this.vacancy.assessmentOptions) {
        case 'self-assessment-with-competencies':
          assessmentOptions.push({ title: 'Self assessment with competencies', id: 'self-assessment-competencies', done: this.applicationProgress.selfAssessmentCompetencies });
          break;
        case 'self-assessment-with-competencies-and-cv':
          assessmentOptions.push({ title: 'Self assessment with competencies', id: 'self-assessment-competencies', done: this.applicationProgress.selfAssessmentCompetencies });
          assessmentOptions.push({ title: 'Curriculum vitae (CV)', id: 'cv', done: this.applicationProgress.cv });
          break;
        case 'self-assessment-with-competencies-and-covering-letter':
          assessmentOptions.push({ title: 'Self assessment with competencies', id: 'self-assessment-competencies', done: this.applicationProgress.selfAssessmentCompetencies });
          assessmentOptions.push({ title: 'Covering letter', id: 'covering-letter', done: this.applicationProgress.coveringLetter });
          break;
        case 'self-assessment-with-competencies-and-cv-and-covering-letter':
          assessmentOptions.push({ title: 'Self assessment with competencies', id: 'self-assessment-competencies', done: this.applicationProgress.selfAssessmentCompetencies });
          assessmentOptions.push({ title: 'Covering letter', id: 'covering-letter', done: this.applicationProgress.coveringLetter });
          assessmentOptions.push({ title: 'Curriculum vitae (CV)', id: 'cv', done: this.applicationProgress.cv });
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
          assessmentOptions.push({ title: 'Statement of suitability', id: 'statement-of-suitability', done: this.applicationProgress.statementOfSuitability });
          assessmentOptions.push({ title: 'Curriculum vitae (CV)', id: 'cv', done: this.applicationProgress.cv });
          break;
        case 'statement-of-suitability-with-skills-and-abilities-and-covering-letter':
          assessmentOptions.push({ title: 'Statement of suitability', id: 'statement-of-suitability', done: this.applicationProgress.statementOfSuitability });
          assessmentOptions.push({ title: 'Covering letter', id: 'covering-letter', done: this.applicationProgress.coveringLetter });
          break;
        case 'statement-of-suitability-with-skills-and-abilities-and-cv-and-covering-letter':
          assessmentOptions.push({ title: 'Statement of suitability', id: 'statement-of-suitability', done: this.applicationProgress.statementOfSuitability });
          assessmentOptions.push({ title: 'Curriculum vitae (CV)', id: 'cv', done: this.applicationProgress.cv });
          assessmentOptions.push({ title: 'Covering letter', id: 'covering-letter', done: this.applicationProgress.coveringLetter });
          break;
        case 'statement-of-eligibility':
          if (this.vacancy.aSCApply && this.vacancy.selectionCriteria && this.vacancy.selectionCriteria.length) {
            assessmentOptions.push({ title: 'Statement of eligibility', id: 'statement-of-eligibility', done: this.applicationProgress.statementOfEligibility });
          }
          break;
        case 'none':
          break;
        default:
        }
        data.push({
          title: 'Assessments',
          tasks: assessmentOptions,
        });
      }
      return data;
    },
    // @todo the following are copied from Review.vue. Look to share them. Maybe use vuex.
    showStatementOfSuitability() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-suitability-with-competencies':
      case 'statement-of-suitability-with-skills-and-abilities':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv':
      case 'statement-of-suitability-with-skills-and-abilities-and-covering-letter':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv-and-covering-letter':
        return true;
      default:
        return false;
      }
    },
    showCoveringLetter() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-suitability-with-skills-and-abilities-and-covering-letter':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv-and-covering-letter':
      case 'self-assessment-with-competencies-and-covering-letter':
      case 'self-assessment-with-competencies-and-cv-and-covering-letter':
        return true;
      default:
        return false;
      }
    },
    showCV() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-suitability-with-skills-and-abilities-and-cv-and-covering-letter':
      case 'self-assessment-with-competencies-and-cv':
      case 'self-assessment-with-competencies-and-cv-and-covering-letter':
      case 'statement-of-suitability-with-skills-and-abilities-and-cv':
        return true;
      default:
        return false;
      }
    },
    showStatementOfEligibility() {
      switch (this.vacancy.assessmentOptions) {
      case 'statement-of-eligibility':
        return true;
      default:
        return false;
      }
    },
    showSelfAssessment() {
      switch (this.vacancy.assessmentOptions) {
      case 'self-assessment-with-competencies':
      case 'self-assessment-with-competencies-and-cv':
      case 'self-assessment-with-competencies-and-covering-letter':
      case 'self-assessment-with-competencies-and-cv-and-covering-letter':
        return true;
      default:
        return false;
      }
    },
    isApplicationComplete() {
      let isComplete = false;
      if (this.application && this.application.progress) {
        isComplete = true;
        if (!this.application.progress.personalDetails) { isComplete = false; }
        if (!this.application.progress.characterInformation) { isComplete = false; }
        if (!this.application.progress.equalityAndDiversitySurvey) { isComplete = false; }
        if (!this.application.progress.assessorsDetails) { isComplete = false; }
        if (this.vacancy.isSPTWOffered) {
          if (!this.application.progress.partTimeWorkingPreferences) { isComplete = false; }
        }
        if (this.vacancy.locationQuestion) {
          if (!this.application.progress.locationPreferences) { isComplete = false; }
        }
        if (this.vacancy.jurisdictionQuestion) {
          if (!this.application.progress.jurisdictionPreferences) { isComplete = false; }
        }
        if (this.vacancy.additionalWorkingPreferences && this.vacancy.additionalWorkingPreferences.length) {
          if (!this.application.progress.additionalWorkingPreferences) { isComplete = false; }
        }
        if (this.vacancy.welshRequirement) {
          if (!this.application.progress.welshPosts) { isComplete = false; }
        }
        if (this.isLegal) {
          if (!this.application.progress.relevantQualifications) { isComplete = false; }
          if (!this.application.progress.postQualificationWorkExperience) { isComplete = false; }
          if (this.vacancy.previousJudicialExperienceApply) {
            if (!this.application.progress.judicialExperience) { isComplete = false; }
          }
          if (!this.application.progress.employmentGaps) { isComplete = false; }
        }
        if (this.isNonLegal) {
          if (this.vacancy.memberships && this.vacancy.memberships.length) {
            if (this.vacancy.memberships.indexOf('none') === -1) {
              if (!this.application.progress.relevantMemberships) { isComplete = false; }
            }
          }
          if (!this.application.progress.relevantExperience) { isComplete = false; }
          if (!this.application.progress.employmentGaps) { isComplete = false; }
        }
        if (!this.application.progress.reasonableLengthOfService) { isComplete = false; }
        if (this.showStatementOfSuitability && !this.application.progress.statementOfSuitability) { isComplete = false; }
        if (this.showCV && !this.application.progress.cv) { isComplete = false; }
        if (this.showCoveringLetter && !this.application.progress.coveringLetter) { isComplete = false; }
        if (this.showStatementOfEligibility && !this.application.progress.statementOfEligibility) { isComplete = false; }
        if (this.showSelfAssessment && !this.application.progress.selfAssessmentCompetencies) { isComplete = false; }
      }
      return isComplete;
    },
    isDraftApplication() {
      return this.application.status === 'draft';
    },
    isVacancyOpen() {
      return this.$store.getters['vacancy/isOpen']();
    },
    canApply () {
      return this.isDraftApplication
        && this.isVacancyOpen
        && this.isApplicationComplete;
    },
  },
  methods: {
    reviewApplication() {
      this.$router.push({ name: 'review' });
    },
    hyphenization(value) {
      return hyphenize(value);
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
