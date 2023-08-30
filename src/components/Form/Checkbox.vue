<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
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
    <FormFieldError
      :id="id"
      :error-message="errorMessage"
    />
    <div class="govuk-checkboxes">
      <div class="govuk-checkboxes__item">
        <input
          :id="id"
          v-model="localValue"
          class="govuk-checkboxes__input"
          :class="[inputClass, {'govuk-input--error': hasError}]"
          type="checkbox"
        >
        <label
          :class="labelStyle"
          :for="id"
        >
          <slot />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import FormField from '@/components/Form/FormField.vue';
import FormFieldError from '@/components/Form/FormFieldError.vue';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'Checkbox',
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    inputClass: {
      default: '',
      type: String,
    },
    modelValue: {
      default: '',
      type: [String, Number, Boolean],
    },
    multilineLabel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
    labelStyle() {
      if (!this.multilineLabel) {
        return 'govuk-label govuk-checkboxes__label';
      }
      return 'govuk-label govuk-checkboxes__label multilineLabel';
    },
  },
};
</script>
<style scoped>
  .multilineLabel {
    padding-top: 0;
    padding-left: 25px;
  }
</style>
