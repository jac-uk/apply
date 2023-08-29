<template>
  <div>
    <TextField
      :id="experienceJobTitle"
      v-model="row.jobTitle"
      label="Job title"
      required
    />

    <TextField
      :id="experienceOrgBusinessName"
      v-model="row.orgBusinessName"
      label="Organisation or business name"
      required
    />

    <DateInput
      :id="experienceStartDate"
      v-model="row.startDate"
      label="Start date"
      type="month"
      required
    />

    <DateInput
      :id="experienceEndDate"
      v-model="row.endDate"
      label="End date"
      hint="Leave this blank if you're currently in this role."
      type="month"
    />

    <LawRelatedTasks
      :id="`tasks_${index}`"
      v-model:tasks="row.tasks"
      v-model:other-tasks="row.otherTasks"
      :show-judicial-functions="true"
      required
    />

    <TaskDetails
      :id="`tasks_${index}`"
      v-model:details="row.taskDetails"
    />

    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/Form/DateInput';
import TextField from '@/components/Form/TextField';
import LawRelatedTasks from '@/components/Page/LawRelatedTasks';
import TaskDetails from '@/components/Page/TaskDetails';

export default {
  name: 'Experience',
  components: {
    DateInput,
    TextField,
    LawRelatedTasks,
    TaskDetails,
  },
  props: {
    row: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  computed: {
    experienceJobTitle() {
      return `experience_job_title_${this.index}`;
    },
    experienceOrgBusinessName() {
      return `experience_org_business_name_${this.index}`;
    },
    experienceStartDate() {
      return `experience_start_date_${this.index}`;
    },
    experienceEndDate() {
      return `experience_end_date_${this.index}`;
    },
    experienceTasks() {
      return `experience_tasks_${this.index}`;
    },
    experienceOtherTasks() {
      return `experience_other_tasks_${this.index}`;
    },
  },
};
</script>
