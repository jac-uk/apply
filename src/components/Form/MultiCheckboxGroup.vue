<template>
  <div>

    <CheckboxGroup
      :id="componentId"
      v-model="localValues"
      :label="label"
      hint="Select all that apply."
      required
    >
      <CheckboxItem
        v-for="(date, index) in arrValues"
        :value="date"
        :label="date"
        :key="index"
      />
    </CheckboxGroup>

  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import ApplyMixIn from '@/views/Apply/ApplyMixIn';
import CheckboxGroup from '@/components/Form/CheckboxGroup.vue';
import CheckboxItem from '@/components/Form/CheckboxItem.vue';
export default {
  name: 'MultiCheckboxGroup',
  components: {
    ErrorSummary,
    CheckboxGroup,
    CheckboxItem
  },
  extends: Form,
  mixins: [ApplyMixIn],
  props: {
    modelValue: {
      validator: (value) => (value instanceof Array || value === null || value === undefined),
      required: true,
    },
    arrValues: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    localValues: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
    componentId() {
      return `part-${this.index}`;
    },
  },
};
</script>
