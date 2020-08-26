<template>
  <fieldset class="govuk-fieldset">
    <RadioGroup
      id="criticalAnalysisRadio"
      v-model="localValue"
      :label="question"
      hint="Choose one option."
    >
      <RadioItem
        v-for="(item, index) in answers"
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
      type: String,
      validator: (value) => (value instanceof Array || value === null || value === undefined),
      required: true,
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
      },
    },
  },
};
</script>
