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
        Pre Selection Day Questionnaire
      </h1>

      <Banner
        v-if="isMoreInformationNeeded && !isApplicationComplete"
        status="information"
      >
        We need more information from you. Please update your application.
      </Banner>

      <p class="govuk-body">You have been invited to a Selection Day. In order to make the arrangements we need to check the following details with you. Please complete each section and then submit the details.</p>

      <TaskList>
        <ul class="govuk-list govuk-!-margin-bottom-9">
          <Task
            v-if="get(candidateForm, 'parts.candidateAvailability', false)"
            id="psdq-tasks-candidate-availability"
            title="Candidate availability"
            :done="get(candidateForm, 'progress.candidateAvailability', false)"
          />
          <Task
            v-if="get(candidateForm, 'parts.panellistConflicts', false)"
            id="psdq-tasks-panellist-conflicts"
            title="Panellist conflicts"
            :done="get(candidateForm, 'progress.panellistConflicts', false)"
          />
          <Task
            v-if="get(candidateForm, 'parts.commissionerConflicts', false)"
            id="psdq-tasks-commissioner-conflicts"
            title="Commissioner conflicts"
            :done="get(candidateForm, 'progress.commissionerConflicts', false)"
          />
          <Task
            v-if="get(candidateForm, 'parts.characterChecks', false)"
            id="psdq-tasks-character-checks"
            title="Character checks"
            :done="get(candidateForm, 'progress.characterChecks', false)"
          />
          <Task
            v-if="get(candidateForm, 'parts.reasonableAdjustments', false)"
            id="psdq-tasks-reasonable-adjustments"
            title="Reasonable adjustments"
            :done="get(candidateForm, 'progress.reasonableAdjustments', false)"
          />
          <Task
            v-if="get(candidateForm, 'parts.jurisdiction', false)"
            id="psdq-tasks-jurisdiction"
            title="Location and jurisdiction"
            :done="get(candidateForm, 'progress.jurisdiction', false)"
          />
          <Task
            v-if="get(candidateForm, 'parts.welshPosts', false)"
            id="equality-and-diversity-survey"
            title="Welsh posts"
            :done="get(candidateForm, 'progress.welshPosts', false)"
          />
        </ul>
        <!-- </TaskGroup> -->
      </TaskList>

      <button
        :disabled="!canApply"
        class="govuk-button info-btn--task-list--review-application"
        @click="reviewApplication"
      >
        Review answers
      </button>
    </div>
  </div>
</template>
<script>
import { hyphenize } from '@/filters';
import { WELSH_POSTS_CONTACT_MAILBOX, WELSH_POSTS_EMAIL_SUBJECT } from '@/helpers/constants';
//import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus.vue';
import ApplyMixIn from '@/views/Apply/ApplyMixIn';
import Warning from '@/components/Page/Warning.vue';
import Banner from '@/components/Page/Banner.vue';
import TaskList from '@/components/Page/TaskList/TaskList.vue';
import TaskGroup from '@/components/Page/TaskList/TaskGroup.vue';
import Task from '@/components/Page/TaskList/Task.vue';
import _get from 'lodash/get';

export default {
  name: 'PSDQTaskList',
  components: {
    Warning,
    Banner,
    TaskList,
    TaskGroup,
    Task,
  },
  //extends: CharacterInformationStatus,
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
    candidateFormResponse() {
      // @TODO: Search the candidate form responses for the candidate's one
      return {
        formId: 123,
        status: 'created',
        statusLog: {},
        progress: {
          candidateAvailability: true,
        },
        candidateAvailability: {},
        panellistConflicts: {},
      };
    },
    candidateForm() {
      return {
        exercise: { id: 'B9NM1PGDaYBJxdZhhKcF' },
        task: 'candidateAvailability',
        createdAt: null,
        lastUpdated: null,
        openDate: '2023-11-16',
        closeDate: '2024-12-31',
        candidateIds: ['123'],
        parts: {
          candidateAvailability: true,
          panellistConflicts: true,
          commissionerConflicts: true,
          characterChecks: true,
        },
        panellists: [
          { id: 'tlg9eeceWesWGGeU4t04', fullName: 'Jane Jones' },
        ]
      };
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
    get(obj, path, defaultVal) {

      console.log(`GET: ${path}, ${defaultVal}`);
      console.log(`RES: ${_get(obj, path, defaultVal)}`);

      return _get(obj, path, defaultVal);
    },
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
