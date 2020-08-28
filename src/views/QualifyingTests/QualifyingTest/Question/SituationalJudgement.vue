<template>
  <fieldset class="govuk-fieldset">
    <RadioGroup
      id="criticalAnalysisRadio"
      v-model="localValue"
      :label="question"
      hint="Please select which of the options below are 'most appropriate' and 'least appropriate'. You can only choose one answer as most appropriate and one answer as least appropriate."
    >
      <div
        v-for="(item, index) in options"
        :key="index"
      >
        <h3 class="govuk-heading-s govuk-!-margin-top-4 govuk-!-margin-bottom-2">
          {{ item.answer }}
        </h3>
        <RadioItem
          :value="index"
          field="mostAppropriate"
          label="Most appropriate"
        />
        <RadioItem
          :value="index"
          field="leastAppropriate"
          label="Least appropriate"
        />
      </div>
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
      validator: (value) => (value instanceof Object || value === null || value === undefined),
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
