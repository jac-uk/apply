<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <label
      :for="id"
      class="govuk-heading-m govuk-!-margin-bottom-2"
    >
      <span
        v-if="labelHidden"
        class="govuk-visually-hidden"
      >
        {{ label }}
      </span>
      <div
        v-else
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
      </div>
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
    <input
      :id="id"
      v-model="text"
      class="govuk-input"
      :class="[inputClass, {'govuk-input--error': hasError}]"
      :type="fieldType"
      :max="numMax"
      :autocomplete="autocomplete"
      @change="validate"
      @keydown="keydown"
    >
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
  name: 'TextField',
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    inputClass: {
      default: '',
      type: String,
    },
    numMax: {
      default: null,
      type: Number,
    },
    labelHidden: {
      default: false,
      type: Boolean,
    },
    modelValue: {
      default: '',
      type: [String, Number],
    },
    type: {
      default: 'text',
      type: String,
    },
    warnCpsEmailMsg: {
      default: '',
      type: String,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    text: {
      get() {
        return this.modelValue;
      },
      set(val) {
        if (typeof val === 'string') {
          val = val.trim();
        }

        switch (this.type) {
        case 'number':
        case 'non-negative-number':
          this.$emit('update:modelValue', val ? parseFloat(val) : '');
          break;
        default:
          this.$emit('update:modelValue', val);
        }
      },
    },
    autocomplete() {
      switch (this.type) {
      case 'tel':
      case 'email':
        return this.type;
      default:
        return null;
      }
    },
    fieldType() {
      switch (this.type) {
      case 'text':
      case 'email':
        return 'text'; // we are using custom email validation, so don't use html5 input types
      case 'non-negative-number':
        return 'number';
      default:
        return this.type;
      }
    },
  },
  watch: {
    text() {
      if (this.warnCpsEmailMsg && this.isCPSEmail()) {
        this.setWarning(this.warnCpsEmailMsg);
      }
      else {
        this.setWarning('');
      }
    },
  },
  methods: {
    isCPSEmail() {
      if (this.text) {
        const domain = 'cps';
        const extension = 'gov.uk';

        // Define a regular expression pattern to match the email address
        const pattern = new RegExp(`^\\w+@${domain}\\.${extension}$`, 'i');

        // Use the RegExp.test() method to check if the email matches the pattern
        return pattern.test(this.text);
      }
      return false;
    },
    keydown(event) {
      if (this.type === 'non-negative-number') {
        if (['e', 'E', '+', '-', '.'].includes(event.key)) {
          event.preventDefault();
        }
      }
    },
  },
};
</script>
