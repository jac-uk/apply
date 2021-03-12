<template>
  <div />
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    label: {
      default: '',
      type: String,
    },
    hint: {
      default: '',
      type: String,
    },
    messages: {
      type: Object,
      default: () => {
        return {};
      },
    },
    required: {
      type: Boolean,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    maxLength: {
      type: Number,
      default: 0,
    },
    pattern: {
      type: Object,
      default: () => {
        return {
          match: /^/,
          message: '',
        };
      },
    },
  },
  data() {
    return {
      errorMessage: '',
      checkErrors: false,
      regex: {
        // eslint-disable-next-line
        email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, // https://stackoverflow.com/questions/201323/ RFC 5322 email address compliant regex 
        tel: /^\+?[\d() -]+/,
      },
    };
  },
  computed: {
    hasError() {
      return this.errorMessage ? true :  false;
    },
  },
  mounted: function () {
    this.$root.$on('validate', this.handleValidate);
  },
  beforeDestroy: function() {
    this.setError('');
    this.$root.$off('validate', this.handleValidate);
  },
  methods: {
    setError(message) {
      this.errorMessage = message;
      this.$root.$emit('handle-error', { id: this.id, message: this.errorMessage });
    },
    handleValidate() {
      this.checkErrors = true;
      this.validate();
    },
    validate(event) {
      this.setError('');
      if (this.checkErrors) {
        let value = this.value;
        if (event && event.target) {
          value = event.target.value;
        }

        if (this.required && (value === null || value === undefined || value.length === 0)) {
          if (this.messages && this.messages.required) {
            this.setError(this.messages.required);
          } else {
            this.setError(`Please enter a value for ${this.label}`);
          }
        }

        if (this.type && this.type === 'email' && value) {
          value = value.trim().toLowerCase();
          this.text = value;
          if (!this.regex.email.test(value)) {
            this.setError(`Enter a valid email address for ${this.label}`);
          }
        }

        if (this.type && this.type === 'tel' && value) {
          if (!this.regex.tel.test(value)) {
            this.setError(`Enter a valid phone number for ${this.label}`);
          }
        }

        if (this.minLength && value) {
          if (value.length + 1 <= this.minLength) {
            this.setError(`${this.label} should have ${this.minLength} or more characters`);
          }
        }

        if (this.maxLength && value) {
          if (value.length > this.maxLength) {
            this.setError(`${this.label} should have ${this.maxLength} or fewer characters`);
          }
        }

        if (this.pattern && value) {
          if (!this.pattern.match.test(value)) {
            this.setError(this.pattern.message);
          }
        }

        if (this.wordLimit && this.value) {
          const words = this.value
            .split(/[^a-z]/i)
            .filter(item => item !== '');
          if (words.length > this.wordLimit) {
            this.setError(`You have reached the limit of ${this.wordLimit} words`);
          } else {
            this.setError('');
          }
        }
        
      }
    },
  },
};
</script>
