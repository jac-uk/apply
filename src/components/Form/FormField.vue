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
        email: /^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/,
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
            .split(/[^a-z'-]/i) //split into array at every occurance of a character which is NOT: a-z or ' or -
            .filter(item => item != '') // remove any empty items from array
            .filter(item => item != '-') // remove any items which are just a hyphen
            .map((item, i) => { // with the above array 
              if (i, item.replace(/[^-]/g, '').length >= 4) { // find any items containing more than or equal to 4 hyphens (4 allows for a trailing hyphen which is not counted in next set)
                item = item.match(/((?:[^-]*?-){3}[^-]*?)-|([\S\s]+)/g); // if an 'offending' item occurs, group every 4 words, ignoring the hyphen between groups [ie. 'one-one-one-one-two-two-two-two' (eight words, seven hyphens) 'one-one-one-one-' 'two-two-two-two']
              }
              return item; // add array in position of word
            }).flat(); // flatten array 
          if (words.length > this.wordLimit) {
            this.setError(`Answer must be ${this.wordLimit} words or fewer`);
          } else {
            this.setError('');
          }
        }
        
      }
    },
  },
};
</script>
