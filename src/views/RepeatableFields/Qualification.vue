<template>
  <div>
    <div class="form-group">
      <label :for="qualificationInputId">Qualification</label>
      <input type="text" class="form-control" :id="qualificationInputId" v-model="row.qualification">
    </div>
    <div class="form-group">
      <label :for="collegeInputId">College or university</label>
      <input type="text" class="form-control" :id="collegeInputId" v-model="row.college">
    </div>
    <div class="form-group">
      <label>Qualification date</label>
      <div class="fieldset-text">
        For example, 02 2017
      </div>
      <DateInput v-model="row.date" type="month" />
    </div>
    <slot name="removeButton"></slot>
  </div>
</template>

<script>
  import DateInput from '@/components/DateInput';

  export default {
    name: 'Qualification',
    components: {
      DateInput,
    },
    props: [
      'row',
      'index',
    ],
    computed: {
      qualificationInputId() {
        return `qualification_${this.index}_qualification`;
      },
      collegeInputId() {
        return `qualification_${this.index}_college`;
      },
    },
  }
</script>
