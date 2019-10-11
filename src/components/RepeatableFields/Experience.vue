<template>
  <div>
    <TextField
      :id="experienceJobTitle"
      v-model="row.jobTitle"
      label="Job title"
    />

    <TextField
      :id="experienceOrgBusinessName"
      v-model="row.orgBusinessName"
      label="Organisation or business name"
    />

    <DateInput
      :id="experienceStartDate"
      v-model="row.startDate"
      label="Start date"
      type="month"
    />

    <DateInput
      :id="experienceEndDate"
      v-model="row.endDate"
      label="End date"
      hint="Leave this blank if you're currently in this role."
      type="month"
    />

    <CheckboxGroup
      :id="experienceTasks"
      v-model="row.tasks"
      label="Law-related tasks in this role"
    >
      <p class="govuk-hint govuk-!-margin-top-0">
        Select all tasks you do in this role. These are defined in the
        <a
          class="govuk-link"
          href="http://www.legislation.gov.uk/ukpga/2007/15/section/52"
          target="_blank"
        >
          Tribunals, Courts and Enforcement Act 2007.
        </a>
      </p>

      <CheckboxItem
        value="The carrying-out of judicial functions of any court or tribunal"
        label="The carrying-out of judicial functions of any court or tribunal"
      />
      <CheckboxItem
        value="Acting as an arbitrator"
        label="Acting as an arbitrator"
      />
      <CheckboxItem
        value="Practice or employment as a lawyer"
        label="Practice or employment as a lawyer"
      />
      <CheckboxItem
        value="Advising on the application of the law"
        label="Advising on the application of the law"
      />
      <CheckboxItem
        value="Assisting persons involved in proceedings for the resolution of issues arising under the law"
        label="Assisting persons involved in proceedings for the resolution of issues arising under the law"
      />
      <CheckboxItem
        value="Acting as mediator in connection with attempts to resolve issues that are, or if not resolved could be, the subject of proceedings"
        label="Acting as mediator in connection with attempts to resolve issues that are, or if not resolved could be, the subject of proceedings"
      />
      <CheckboxItem
        value="Drafting documents intended to affect persons' rights or obligations"
        label="Drafting documents intended to affect persons' rights or obligations"
      />
      <CheckboxItem
        value="Teaching or researching law"
        label="Teaching or researching law"
      />
      <CheckboxItem
        value="None of the above - Any activity that, in the relevant decision-maker's opinion, is of a broadly similar nature to those listed above"
        label="None of the above - Any activity that, in the relevant decision-maker's opinion, is of a broadly similar nature to those listed above"
      >
        <TextareaInput
          :id="experienceOtherTasks"
          v-model="row.otherTasks"
          label="List your different law-related tasks"
          rows="2"
        />
      </CheckboxItem>
    </CheckboxGroup>

    <slot name="removeButton" />
  </div>
</template>

<script>
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import CheckboxItem from '@/components/Form/CheckboxItem';
import DateInput from '@/components/Form/DateInput';
import TextField from '@/components/Form/TextField';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  name: 'Experience',
  components: {
    CheckboxGroup,
    CheckboxItem,
    DateInput,
    TextField,
    TextareaInput,
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
