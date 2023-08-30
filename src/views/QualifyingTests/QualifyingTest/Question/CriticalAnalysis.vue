<template>
  <fieldset class="govuk-fieldset">
    <RadioGroup
      id="criticalAnalysisRadio"
      v-model="localValue"
      :label="question"
      hint="Choose one option."
    >
      <RadioItem
        v-for="(item, index) in options"
        :key="index"
        :value="index"
        :label="item.answer"
      />
    </RadioGroup>
  </fieldset>
</template>
<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'CriticalAnalysis',
  components: {
    RadioGroup,
    RadioItem,
  },
  props: {
    modelValue: {
      required: true,
      validator: (value) => (value >= 0 || value === null || value === undefined),
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue', 'answered'],
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
        // this.$emit('answered');
        if (val !== this.modelValue && this.modelValue !== null && this.modelValue !== undefined) {
          this.$emit('answered', { value: val, type: '' });
        }
      },
    },
  },
};
</script>
