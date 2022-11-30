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

    <input
      :id="id"
      v-model="text"
      :class="[inputClass, 'govuk-input', 'govuk-!-width-three-quarters', {'govuk-input--error': hasError}]"
      :type="fieldType"
      :autocomplete="type"
      @input="handleValidatePassword"
    >

    <button
      class="govuk-button govuk-button--secondary govuk-!-margin-left-1 info-btn--sign-up--password--show-hide"
      @click.prevent="toggleVisibility"
    >
      {{ toggleLabel }}
    </button>
  </div>
</template>

<script>
import FormField from '@/components/Form/FormField';
import FormFieldError from '@/components/Form/FormFieldError';

export default {
  name: 'Password',
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
      type: String,
    },
    type: {
      default: 'current-password',
      type: String,
    },
    minLength: {
      default: 8,
      type: Number,
    },
  },
  data() {
    return {
      showPassword: false,
      regex: {
        // eslint-disable-next-line
        containsCapitalLetters: /[A-Z]+/,
        containsDigits: /\d+/,
        containsSpecialCharacters: /[^A-Za-z\d]+/,
        repeatedCharacters: /(.)\1{2,}/,
      },
    };
  },
  computed: {
    text: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    fieldType() {
      if (this.showPassword) {
        return 'text';
      }
      return 'password';
    },
    toggleLabel() {
      if (this.showPassword) {
        return 'Hide';
      }
      return 'Show';
    },
  },
  mounted() {
    this.$root.$on('validate', this.handleValidatePassword);
  },
  beforeDestroy: function() {
    this.setError('');
    this.$root.$off('validate', this.handleValidatePassword);
  },
  methods: {
    toggleVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleValidatePassword(event) {
      // don't bother checking if generic validation failed
      // if (!this.hasError) {
      let value = this.value;
      if (event && event.target) {
        value = event.target.value;
      }

      this.setError('');
      this.validatePassword(value);
      // }
    },
    validatePassword(password) {

      if (password.length < this.minLength) {
        this.setError(`${this.label} should be ${this.minLength} or more characters long`);
      }

      if (!this.regex.containsCapitalLetters.test(password)) {
        this.setError(`${this.label} must include at least one capital letter.`);
      }

      if (!this.regex.containsDigits.test(password)) {
        this.setError(`${this.label} must include at least one digit.`);
      }

      if (!this.regex.containsSpecialCharacters.test(password)) {
        this.setError(`${this.label} must include at least one special character - for example £, #, @, !, %, -, &, *.`);
      }

      if (this.regex.repeatedCharacters.test(password)) {
        this.setError(`${this.label} must include no more than 2 consecutive repeating characters.`);
      }
    },
  },
};
</script>
