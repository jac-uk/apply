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
        {{ $filters.lookup(formType) }}
      </h1>

      <p class="govuk-body">You have been invited to a Selection Day. In order to make the arrangements we need to check the following details with you. Please complete each section and then submit the details.</p>

      <TaskList>
        <ul class="govuk-list govuk-!-margin-bottom-9">
          <Task
            v-for="part in parts"
            :id="`psdq-tasks-${part}`"
            :key="part"
            :title="$filters.lookup(part)"
            :done="isDone(part)"
          />
        </ul>
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
import ApplyMixIn from '@/views/Apply/ApplyMixIn';
import TaskList from '@/components/Page/TaskList/TaskList.vue';
import Task from '@/components/Page/TaskList/Task.vue';

export default {
  name: 'CandidateFormTaskList',
  components: {
    TaskList,
    Task,
  },
  //extends: CharacterInformationStatus,
  mixins: [ApplyMixIn],
  data() {
    return {
    };
  },
  computed: {
    candidate() {
      return this.$store.state.candidate.record;
    },
    formId() {
      return this.$route.params.formId;
    },
    candidateForm() {
      return this.$store.state.candidateForm.record;
    },
    formType() {
      if (!this.candidateForm) return '';
      if (!this.candidateForm.task) return '';
      return this.candidateForm.task.type;
    },
    parts() {
      if (!this.candidateForm) return [];
      return this.candidateForm.parts;
    },
    candidateFormResponse() {
      return this.$store.state.candidateFormResponse.record;
    },
    applications() {
      return this.$store.state.applications.records;
    },
  },
  async created() {
    const formId = this.$route.params.formId;
    this.$store.dispatch('candidateForm/bind', formId);
    this.$store.dispatch('candidateFormResponse/bind', formId);
  },
  methods: {
    isDone(partRef) {
      if (!this.candidateFormResponse) return false;
      if (!this.candidateFormResponse.progress) return false;
      return this.candidateFormResponse.progress[partRef];
    },
    reviewApplication() {
      this.$router.push({ name: 'review' });
    },
  },
};

</script>
<style scoped>

.container-border-top {
  border-top: 1px solid #b1b4b6
}

</style>
