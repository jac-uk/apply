<template>
  <div
    class="govuk-form-group"
  >
    <label
      :for="id"
      class="govuk-heading-m govuk-!-margin-bottom-2"
    >
      {{ label }}
    </label>

    <span
      v-if="hint"
      class="govuk-hint"
    >
      {{ hint }}
    </span>

    <TextField
      :id="`${id}--street`"
      v-model="modelValue.street"
      required
      label="Building and street"
    />
    <TextField
      :id="`${id}--street2`"
      v-model="modelValue.street2"
      label="Building and street line 2"
      label-hidden
    />
    <TextField
      :id="`${id}--town`"
      v-model="modelValue.town"
      required
      label="Town or city"
    />
    <TextField
      :id="`${id}--county`"
      v-model="modelValue.county"
      label="County"
    />
    <TextField
      :id="`${id}--postcode`"
      v-model="modelValue.postcode"
      required
      label="Postcode"
      type="postcode"
    />
  </div>
</template>
<script>
import FormField from '@/components/Form/FormField';
import TextField from '@/components/Form/TextField';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'Address',
  components: {
    TextField,
  },
  extends: FormField,
  props: {
    modelValue: {
      required: true,
      type: Object,
    },
  },
  emits: ['update:modelValue'],
  watch: {
    modelValue() {
      this.$emit('update:modelValue', this.modelValue);
    },
  },
};
</script>
