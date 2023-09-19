<template>
  <div
    :class="{'govuk-form-group--error': hasError}"
  >
    <div>
      <TextField
        :id="`${id}_location`"
        v-model="localTaskDetails.location"
        label="Base location and/or region where you predominately operate/d"
        hint="Please provide the town/city, court/tribunal building, and/or circuit or region as appropriate."
        required
      />

      <TextField
        :id="`${id}_jurisdiction/area_of_law`"
        v-model="localTaskDetails.jurisdiction"
        label="Jurisdiction/area of law"
        hint="e.g. family (public and/or private), crime, commercial, technology and construction etc."
        required
      />

      <Select
        :id="`${id}_working_basis`"
        v-model="localTaskDetails.workingBasis"
        :value="localTaskDetails.workingBasis"
        label="Working Basis"
        required
      >
        <option
          v-for="option in ['full-time', 'salaried-part-time', 'fee-paid', 'voluntary']"
          :key="option"
          :value="$filters.lookup(option)"
        >
          {{ $filters.lookup(option) }}
        </option>
      </Select>

      <TextField
        v-if="['voluntary', 'fee-paid'].some(item => item === localTaskDetails.workingBasis)"
        :id="`${id}_working_basis_days`"
        v-model="localTaskDetails.totalDaysInRole"
        input-class="govuk-input govuk-input--width-2"
        label="Total number of days engaged in this role"
        hint="An approximation will suffice if engagement is substantial and across a long period of time"
        type="number"
        required
      />
    </div>
  </div>
</template>

<script>
import TextField from '@/components/Form/TextField.vue';
import FormField from '@/components/Form/FormField.vue';
import Select from '@jac-uk/jac-kit/draftComponents/Form/Select.vue';

export default {
  name: 'TaskDetails',
  components: {
    TextField,
    Select,
  },
  extends: FormField,
  props: {
    taskDetails: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  emits: ['update:tasks', 'update:otherTasks', 'update:taskDetails'],
  data() {
    return {
      localTaskDetails: { ...this.taskDetails },
    };
  },
  computed: {
    localTasks: {
      get() {
        return this.tasks;
      },
      set(val) {
        this.$emit('update:tasks', val);
      },
    },
    localOtherTasks: {
      get() {
        return this.otherTasks;
      },
      set(val) {
        this.$emit('update:otherTasks', val);
      },
    },
  },
  watch: {
    localTaskDetails: {
      handler: function(after) {
        this.$emit('update:taskDetails', after);
      },
      deep: true,
    },
  },
  methods: {
    validate() {
      this.setError('');
      if (this.localTasks) {
        if (this.required && this.localTasks.length === 0) {
          this.setError('Select at least one task you do in this role');
        }
      }
    },
  },
};
</script>
