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
import FormField from '@/components/Form/FormField';
import FormFieldError from '@/components/Form/FormFieldError';

export default {
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    inputClass: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: [String, Number, Boolean],
    },
    multilineLabel: {
      type: Boolean,
      required: false,
      default: false,
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
