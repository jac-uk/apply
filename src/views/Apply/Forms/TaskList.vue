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

      <span class="govuk-caption-xl govuk-!-padding-bottom-2 display-block">
        {{ vacancy.referenceNumber }} {{ vacancy.name }}
      </span>
      <h1 class="govuk-heading-xl">
        Pre Selection Day Questionnaire
      </h1>

      <p class="govuk-body">You have been invited to a Selection Day. In order to make the arrangements we need to check the following details with you. Please complete each section and then submit the details.</p>

      <TaskList>
        <ul class="govuk-list govuk-!-margin-bottom-9">
          <template v-for="part in candidateForm.parts">
            <Task
              :id="`psdq-tasks-${kebabize(part)}`"
              :title="undoCamelCase(part)"
              :done="candidateFormResponse.progress.includes(part)"
            />
          </template>
        </ul>
      </TaskList>

      <button
        :disabled="!canApply"
        class="govuk-button info-btn--task-list--review-application"
        @click="reviewAnswers"
      >
        Review answers
      </button>
    </div>
  </div>
</template>
<script>
import ApplyMixIn from '@/views/Apply/ApplyMixIn';
import TaskList from '@/components/Page/TaskList/TaskList.vue';
import Task from '@/components/Page/TaskList/Task.vue';

export default {
  name: 'PSDQTaskList',
  components: {
    TaskList,
    Task,
  },
  mixins: [ApplyMixIn],
  computed: {
    candidateFormResponse() {
      // @TODO: Search the candidate form responses for the candidate's one
      return {
        formId: 123,
        status: 'created',
        statusLog: {},
        progress: [
          'candidateAvailability'
        ],
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
        parts: [
          'candidateAvailability',
          'panellistConflicts',
          'commissionerConflicts',
          'characterChecks',
        ],
        panellists: [
          { id: 'tlg9eeceWesWGGeU4t04', fullName: 'Jane Jones' },
        ]
      };
    },
    applications() {
      return this.$store.state.applications.records;
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
    kebabize(str) {
      return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
    },
    undoCamelCase(str) {
      return str
        // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function(str){ return str.toUpperCase(); });
    },
    reviewAnswers() {
      this.$router.push({ name: 'review' });
    },
  },
};

</script>
