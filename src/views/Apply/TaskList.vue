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
        v-if="isVacancyOpen"
        :close-time="vacancyCloseTime"
        :countdown-length="60"
      />
      <Warning v-if="isVacancyClosed">
        This vacancy is now closed.
      </Warning>

      <span class="govuk-caption-xl govuk-!-padding-bottom-2 display-block">
        {{ vacancy.referenceNumber }} {{ vacancy.name }}
      </span>
      <h1 class="govuk-heading-xl">
        Apply for the role
      </h1>

      <Banner
        v-if="isMoreInformationNeeded && !isApplicationComplete"
        status="information"
      >
        We need more information from you. Please update your application.
      </Banner>

      <TaskList>
        <TaskGroup
          title="Account profile"
        >
          <Task
            v-if="applicationParts.personalDetails"
            id="apply-personal-details"
            title="Personal details"
            :done="applicationProgress.personalDetails"
            :locked="!currentApplicationParts.personalDetails"
          />
          <Task
            v-if="applicationParts.characterInformation"
            :id="getCharacterInformationPageId()"
            title="Character information"
            :done="applicationProgress.characterInformation"
            :locked="!currentApplicationParts.characterInformation"
          />
          <Task
            v-if="applicationParts.equalityAndDiversitySurvey"
            id="equality-and-diversity-survey"
            title="Equality and diversity"
            :done="applicationProgress.equalityAndDiversitySurvey"
            :locked="!currentApplicationParts.equalityAndDiversitySurvey"
          />
        </TaskGroup>

        <TaskGroup
          title="Working preferences"
        >
          <Task
            v-if="applicationParts.partTimeWorkingPreferences"
            id="part-time-working-preferences"
            title="Set part-time working preferences"
            :done="applicationProgress.partTimeWorkingPreferences"
            :locked="!currentApplicationParts.partTimeWorkingPreferences"
          />
          <Task
            v-if="applicationParts.locationPreferences"
            id="location-preferences"
            title="Location preferences"
            :done="applicationProgress.locationPreferences"
            :locked="!currentApplicationParts.locationPreferences"
          />
          <Task
            v-if="applicationParts.jurisdictionPreferences"
            id="jurisdiction-preferences"
            title="Jurisdiction preferences"
            :done="applicationProgress.jurisdictionPreferences"
            :locked="!currentApplicationParts.jurisdictionPreferences"
          />
          <Task
            v-if="applicationParts.additionalWorkingPreferences"
            id="additional-working-preferences"
            title="Additional preferences"
            :done="applicationProgress.additionalWorkingPreferences"
            :locked="!currentApplicationParts.additionalWorkingPreferences"
          />
          <Task
            v-if="applicationParts.welshPosts"
            id="welsh-posts"
            title="Welsh posts"
            :done="applicationProgress.welshPosts"
            :locked="!currentApplicationParts.welshPosts"
          />
        </TaskGroup>

        <TaskGroup :title="experienceTitle">
          <Task
            v-if="applicationParts.relevantQualifications && isLegal"
            id="relevant-qualifications"
            title="Relevant qualifications"
            :done="applicationProgress.relevantQualifications"
            :locked="!currentApplicationParts.relevantQualifications"
          />
          <Task
            v-if="applicationParts.postQualificationWorkExperience || applicationParts.employmentGaps"
            id="post-qualification-work-experience"
            title="Previous judicial experience"
            :done="applicationProgress.postQualificationWorkExperience"
            :locked="!currentApplicationParts.postQualificationWorkExperience"
          />
          <Task
            v-if="applicationParts.judicialExperience"
            id="judicial-experience"
            :title="isJAC00164 ? 'Experience' : 'Judicial experience'"
            :done="applicationProgress.judicialExperience"
            :locked="!currentApplicationParts.judicialExperience"
          />
          <Task
            v-if="applicationParts.relevantMemberships"
            id="relevant-memberships"
            title="Relevant memberships"
            :done="applicationProgress.relevantMemberships"
            :locked="!currentApplicationParts.relevantMemberships"
          />
          <Task
            v-if="applicationParts.relevantExperience"
            id="relevant-experience"
            title="Relevant experience"
            :done="applicationProgress.relevantExperience"
            :locked="!currentApplicationParts.relevantExperience"
          />
          <Task
            v-if="applicationParts.reasonableLengthOfService"
            id="reasonable-length-of-service"
            title="Reasonable length of service"
            :done="applicationProgress.reasonableLengthOfService"
            :locked="!currentApplicationParts.reasonableLengthOfService"
          />
        </TaskGroup>

        <TaskGroup
          title="Assessments"
        >
          <Task
            v-if="applicationParts.assessorsDetails"
            id="assessors-details"
            title="Independent assessors' details"
            :done="applicationProgress.assessorsDetails"
            :locked="!currentApplicationParts.assessorsDetails"
          />
          <Task
            v-if="applicationParts.leadershipJudgeDetails"
            id="leadership-judge-details"
            title="Leadership Judge details"
            :done="applicationProgress.leadershipJudgeDetails"
            :locked="!currentApplicationParts.leadershipJudgeDetails"
          />
          <Task
            v-if="applicationParts.statementOfSuitability"
            id="statement-of-suitability"
            title="Statement of suitability"
            :done="applicationProgress.statementOfSuitability"
            :locked="!currentApplicationParts.statementOfSuitability"
          />
          <Task
            v-if="applicationParts.coveringLetter"
            id="covering-letter"
            title="Covering letter"
            :done="applicationProgress.coveringLetter"
            :locked="!currentApplicationParts.coveringLetter"
          />
          <Task
            v-if="applicationParts.cv"
            id="cv"
            title="Curriculum vitae (CV)"
            :done="applicationProgress.cv"
            :locked="!currentApplicationParts.cv"
          />
          <Task
            v-if="applicationParts.statementOfEligibility"
            id="statement-of-eligibility"
            title="Statement of eligibility"
            :done="applicationProgress.statementOfEligibility"
            :locked="!currentApplicationParts.statementOfEligibility"
          />
          <Task
            v-if="applicationParts.selfAssessmentCompetencies"
            id="self-assessment-competencies"
            title="Self assessment with competencies"
            :done="applicationProgress.selfAssessmentCompetencies"
            :locked="!currentApplicationParts.selfAssessmentCompetencies"
          />
        </TaskGroup>

        <TaskGroup
          title="Additional Information"
        >
          <Task
            v-if="applicationParts.additionalInfo"
            id="additional-information"
            title="How did you hear about the vacancy?"
            :done="applicationProgress.additionalInfo"
            :locked="!currentApplicationParts.additionalInfo"
          />
          <Task
            v-if="applicationParts.commissionerConflicts"
            id="commissioner-conflicts"
            title="Commissioner conflicts"
            :done="applicationProgress.commissionerConflicts"
            :locked="!currentApplicationParts.commissionerConflicts"
          />
        </TaskGroup>
      </TaskList>

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
import { hyphenize } from '@/filters';
import { WELSH_POSTS_CONTACT_MAILBOX, WELSH_POSTS_EMAIL_SUBJECT } from '../../helpers/constants';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus.vue';
import ApplyMixIn from './ApplyMixIn';
import Warning from '@/components/Page/Warning.vue';
import Banner from '@/components/Page/Banner.vue';
import TaskList from '@/components/Page/TaskList/TaskList.vue';
import TaskGroup from '@/components/Page/TaskList/TaskGroup.vue';
import Task from '@/components/Page/TaskList/Task.vue';

export default {
  name: 'TaskListComponent',
  components: {
    Warning,
    Banner,
    TaskList,
    TaskGroup,
    Task,
  },
  extends: CharacterInformationStatus,
  mixins: [ApplyMixIn],
  data() {
    return {
      welshPostsContactMailbox: WELSH_POSTS_CONTACT_MAILBOX,
      welshPostsEmailSubject: WELSH_POSTS_EMAIL_SUBJECT,
    };
  },
  computed: {
    candidate() {
      return this.$store.state.candidate.record;
    },
    applications() {
      return this.$store.state.applications.records;
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
    experienceTitle() {
      const titleParts = [];
      if (this.hasApplicationPart('relevantQualifications')) {
        titleParts.push('Qualifications');
      }
      if (this.hasApplicationPart('relevantMemberships')) {
        titleParts.push('Memberships');
      }
      titleParts.push('Experience');
      if (titleParts.length === 3) {
        return `${titleParts[0]}, ${titleParts[1]} and ${titleParts[2]}`;
      } else {
        return titleParts.join(' and ');
      }
    },
  },
  async created() {
    // TODO check why we were doing the following?
    // const characterInformation = this.$store.getters['candidate/characterInformation']();
    // if (characterInformation && !this.application.characterInformationV2) {
    //   this.application.characterInformationV2 = characterInformation;
    //   await this.$store.dispatch('application/save', this.application);
    // }
  },
  methods: {
    reviewApplication() {
      this.$router.push({ name: 'review' });
    },
    hyphenization(value) {
      return hyphenize(value);
    },
    getCharacterInformationPageId() {
      if (!this.vacancy._applicationVersion || this.vacancy._applicationVersion < 2) {
        return 'character-information-form-v1';
      }
      if (!this.application.characterInformationV2) {
        return 'character-information-declaration';
      }
      if (!this.isCriminalOffencesSectionComplete()) {
        return 'character-information-criminal-offences';
      }
      if (!this.isFixedPenaltiesSectionComplete()) {
        return 'character-information-fixed-penalty-notices';
      }
      if (!this.isMotoringOffencesSectionComplete()) {
        return 'character-information-motoring-offences';
      }
      if (!this.isFinancialOffencesSectionComplete()) {
        return 'character-information-financial-matters';
      }
      if (!this.isProfessionalConductSectionComplete()) {
        return 'character-information-professional-conduct';
      }
      if (!this.isFurtherInformationSectionComplete()) {
        return 'character-information-further-information';
      }
      if (!this.isDeclarationCompleted() || this.application.characterInformationV2) {
        return 'character-information-review';
      }
    },
    hasApplicationPart(part) {
      if (this.applicationParts) {
        return this.applicationParts[part];
      }
      return true;  // default is to show all parts
    },
  },
};

</script>
<style scoped>

.container-border-top {
  border-top: 1px solid #b1b4b6
}

</style>
