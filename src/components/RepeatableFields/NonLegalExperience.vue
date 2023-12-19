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
      required
      type="month"
    />

    <DateInput
      :id="experienceEndDate"
      v-model="row.endDate"
      label="End date"
      hint="Leave this blank if you're currently in this role."
      type="month"
    />

    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/Form/DateInput.vue';
import TextField from '@/components/Form/TextField.vue';

export default {
  name: 'Experience',
  components: {
    DateInput,
    TextField,
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
    hasEnteredData() {
      return !!this.row.jobTitle || !!this.row.orgBusinessName;
    },
  },
};
</script>
