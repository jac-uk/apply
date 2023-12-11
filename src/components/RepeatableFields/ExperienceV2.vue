<template>
  <div
    v-if="!editing"
    style="display: flex; justify-content: space-between;"
  >
    <div v-if="isAppointment">
      <h2 class="govuk-heading-m">
        {{ row.jobTitle }}
      </h2>
      <p class="govuk-body">
        {{ row.orgBusinessName }}
      </p>
      <div class="tag-container">
        <span
          v-if="workingBasis"
          class="tag"
        >
          {{ workingBasis }}
        </span>
        <span
          v-if="judicialType"
          class="tag"
        >
          {{ judicialType }}
        </span>
      </div>
    </div>
    <div v-else-if="isGap">
      <h2 class="govuk-heading-m">
        Gap in Employment
      </h2>
    </div>

    <div>
      <div class="text-right">
        <p
          v-if="judicialDateRange"
          class="govuk-body"
        >
          {{ judicialDateRange }}
        </p>
        <p
          v-if="judicialDuration"
          class="govuk-body"
        >
          {{ judicialDuration }}
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <RadioGroup
      :id="`experience-${index}`"
      v-model="row.type"
      label="Is this an appointment or a gap in employment?"
      required
      :class="{'govuk-!-margin-bottom-0': !row.type}"
    >
      <RadioItem
        value="appointment"
        label="It is an appointment."
      />
      <RadioItem
        value="gap"
        label="It is a gap in employment."
      />
    </RadioGroup>

    <div v-if="row.type">
      <TextField
        v-if="isAppointment"
        :id="experienceJobTitle"
        v-model="row.jobTitle"
        label="Job title"
        required
      />

      <TextField
        v-if="isAppointment"
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
        v-model:is-ongoing="row.isOngoing"
        label="End date"
        type="month"
        ongoing-visible
        required
        :min-date="row.startDate"
      />

      <TextareaInput
        v-if="isGap"
        :id="experienceDetails"
        v-model="row.details"
        label="Details"
        rows="2"
      />

      <LawRelatedTasks
        :id="experienceTasks"
        v-model:tasks="row.tasks"
        v-model:judicial-functions="row.judicialFunctions"
        v-model:other-tasks="row.otherTasks"
        :is-appointment="isAppointment"
        :required="isAppointment"
      />

      <TaskDetails
        v-if="isAppointment"
        :id="experienceTaskDetails"
        v-model:task-details="row.taskDetails"
      />
    </div>
  </div>
</template>

<script>
import RadioItem from '@/components/Form/RadioItem.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import TextField from '@/components/Form/TextField.vue';
import DateInput from '@/components/Form/DateInput.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import LawRelatedTasks from '@/components/Page/LawRelatedTasks.vue';
import TaskDetails from '@/components/Page/TaskDetails.vue';

export default {
  name: 'ExperienceV2',
  components: {
    RadioItem,
    RadioGroup,
    TextField,
    DateInput,
    TextareaInput,
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
    type: {
      required: false,
      type: String,
      default: '',
    },
    editing: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isAppointment() {
      return this.row?.type === 'appointment';
    },
    isGap() {
      return this.row?.type === 'gap';
    },
    experienceJobTitle() {
      return `experience_${this.type}_job_title_${this.index}`;
    },
    experienceOrgBusinessName() {
      return `experience_${this.type}_org_business_name_${this.index}`;
    },
    experienceStartDate() {
      return `experience_${this.type}_start_date_${this.index}`;
    },
    experienceEndDate() {
      return `experience_${this.type}_end_date_${this.index}`;
    },
    experienceIsOngoing() {
      return `experience_${this.type}_is_ongoing_${this.index}`;
    },
    experienceDetails() {
      return `experience_${this.type}_details_${this.index}`;
    },
    experienceTasks() {
      return `experience_${this.type}_tasks_${this.index}`;
    },
    experienceTaskDetails() {
      return `experience_${this.type}_task_details_${this.index}`;
    },
    workingBasis() {
      return this.row.taskDetails ? (this.row.taskDetails.workingBasis || '') : '';
    },
    judicialType() {
      return this.row.judicialFunctions ? (this.row.judicialFunctions.type || '') : '';
    },
    judicialDateRange() {
      const res = [];
      if (this.row.startDate) res.push(this.$filters.formatDate(this.row.startDate, 'MM/YYYY'));
      if (this.row.isOngoing) {
        res.push('Ongoing');
      } else if (this.row.endDate) {
        res.push(this.$filters.formatDate(this.row.endDate, 'MM/YYYY'));
      }
      return res.join(' - ');
    },
    judicialDuration() {
      const duration = this.row.judicialFunctions?.duration;
      if (!duration) return '';
      return `Judicial role sitting days: ${duration} ${duration > 1 ? 'days' : 'day'}`;
    },
  },
  watch: {
    type: {
      immediate: true,
      handler() {
        if (this.type) {
          this.row.type = this.type;
        }
      },
    },
  },
};
</script>

<style scoped>
.tag-container {
  display: flex;
  gap: 10px;
}
.tag {
  padding: 5px 8px 0;
  background: #EEEFEF;
  color: #383F43;
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
