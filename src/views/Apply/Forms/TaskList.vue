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
            :id="`candidate-form-tasks-${part}`"
            :key="part"
            :title="$filters.lookup(part)"
            :done="isDone(part)"
          />
        </ul>
      </TaskList>

      <button
        class="govuk-button info-btn--task-list--review-application"
        @click="reviewApplication"
      >
        Review answers
      </button>
    </div>
  </div>
</template>
<script>
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import TaskList from '@/components/Page/TaskList/TaskList.vue';
import Task from '@/components/Page/TaskList/Task.vue';

export default {
  name: 'CandidateFormTaskList',
  components: {
    TaskList,
    Task,
  },
  mixins: [CandidateFormsMixIn],
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
    formType() {
      if (!this.candidateForm) return '';
      if (!this.candidateForm.task) return '';
      return this.candidateForm.task.type;
    },
    parts() {
      if (!this.candidateForm) return [];
      return this.candidateForm.parts;
    },
    applications() {
      return this.$store.state.applications.records;
    },
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
