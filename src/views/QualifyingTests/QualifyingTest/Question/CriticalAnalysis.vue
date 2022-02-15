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
  components: {
    RadioGroup,
    RadioItem,
  },
  props: {
    value: {
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
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
        // this.$emit('answered');
        if (val !== this.value && this.value !== null && this.value !== undefined) {
          this.$emit('answered', { value: val, type: '' });
        }
      },
    },
  },
};
</script>
