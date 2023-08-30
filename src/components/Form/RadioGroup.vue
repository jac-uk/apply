<template>
  <div
    :id="id"
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <fieldset
      class="govuk-fieldset"
      :aria-describedby="hint ? hintId : null"
    >
      <legend
        v-if="label"
        class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-2"
        :style="!required ? { display: 'flex', 'align-items': 'center', gap: '12px' } : null"
      >
        {{ label }}
        <span
          v-if="!required"
          class="govuk-label"
          style="margin-bottom: 0;"
        >
          (optional)
        </span>
      </legend>
      <span
        v-if="hint"
        :id="hintId"
        class="govuk-hint"
      >
        {{ hint }}
      </span>
      <FormFieldError
        :id="id"
        :error-message="errorMessage"
      />
      <div class="govuk-radios">
        <slot />
      </div>
    </fieldset>
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
  name: 'RadioGroup',
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    modelValue: {
      required: true,
      validator: () => true,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
    hintId() {
      return `${this.id}__hint`;
    },
  },
};
</script>
