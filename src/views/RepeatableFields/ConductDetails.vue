<template>
  <div>
    <div class="form-group">
      <label>Date</label>
      <DateInput
        v-model="row.date"
        type="month"
      />
    </div>
    <div class="form-group">
      <label :for="inputIds.details">Give details</label>
      <textarea
        :id="inputIds.details"
        v-model="row.details"
        class="form-control"
        rows="3"
      />
    </div>
    <div class="form-group">
      <label :for="inputIds.circumstances">Circumstances</label>
      <div class="fieldset-text">
        Give any circumstances you want to be taken into account when we consider your application
      </div>
      <textarea
        :id="inputIds.circumstances"
        v-model="row.circumstances"
        class="form-control"
        rows="3"
      />
    </div>
    <slot name="removeButton" />
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
  data() {
    return {
      inputIds: {
        details: `conduct_${uid}_details`,
        circumstances: `conduct_${uid}_circumstances`,
      },
    };
  },
  created() {
    uid++;
  },
};
</script>
