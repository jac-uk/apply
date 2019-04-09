<template>
  <div>
    <div class="form-group">
      <label>Date</label>
      <DateInput v-model="row.date" type="month" />
    </div>
    <div class="form-group">
      <label :for="inputIds.details">Give details</label>
      <textarea class="form-control" :id="inputIds.details" v-model="row.details" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label :for="inputIds.circumstances">Circumstances</label>
      <div class="fieldset-text">Give any circumstances you want to be taken into account when we consider your application</div>
      <textarea class="form-control" :id="inputIds.circumstances" v-model="row.circumstances" rows="3"></textarea>
    </div>
    <slot name="removeButton"></slot>
  </div>
</template>

<script>
  import DateInput from '@/components/DateInput';
  let uid = 0;

  export default {
    name: 'ConductDetails',
    components: {
      DateInput,
    },
    props: [
      'row',
      'index',
    ],
    data() {
      return {
        inputIds: {
          details: `conduct_${uid}_details`,
          circumstances: `conduct_${uid}_circumstances`,
        }
      };
    },
    created() {
      uid++;
    },
  }
</script>
