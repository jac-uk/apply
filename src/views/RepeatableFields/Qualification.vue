<template>
  <div>
    <div class="form-group">
      <label :for="qualificationInputId">Qualification</label>
      <input
        :id="qualificationInputId"
        v-model="row.qualification"
        type="text"
        class="form-control"
      >
    </div>
    <div class="form-group">
      <label :for="collegeInputId">College or university</label>
      <input
        :id="collegeInputId"
        v-model="row.college"
        type="text"
        class="form-control"
      >
    </div>
    <div class="form-group">
      <label>Qualification date</label>
      <div class="fieldset-text">
        For example, 02 2017
      </div>
      <DateInput
        v-model="row.date"
        type="month"
      />
    </div>
    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/DateInput';

export default {
  name: 'Qualification',
  components: {
    DateInput,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    qualificationInputId() {
      return `qualification_${this.index}_qualification`;
    },
    collegeInputId() {
      return `qualification_${this.index}_college`;
    },
  },
};
</script>
