<template>
  <div />
</template>

<script>
import { isValidNumberForRegion } from 'libphonenumber-js';
import { formatDate } from '@/helpers/date';

export default {
  name: 'FormField',
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
    optionalHidden: { // if true, the optional text will be hidden
      type: Boolean,
      default: false,
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
      warningMessage: '',
      checkErrors: false,
      regex: {
        // eslint-disable-next-line
        email: /^(([^<>()\[\]\\.,;:’\s@"]+(\.[^<>()\[\]\\.,;:’\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // ref: https://emailregex.com/
        // match UK numbers and E.164 format (ref: https://regexpattern.com/phone-number/#uk)
        tel: /(^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?#(\d{4}|\d{3}))?$)|(^\+?[1-9]\d{1,14}$)/,
        nino: /^(?!BG|GB|NK|KN|TN|NT|ZZ)[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z](?:\s?\d){6}\s?[A-D]$/i,
        postcode: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
      },
    };
  },
  computed: {
    hasError() {
      return this.errorMessage ? true :  false;
    },
    words() {
      const value = this.modelValue;
      const result = value ? value : '';
      return [].concat(...result
        .split(/[^a-z'-]/i) //split into array at every occurance of a character which is NOT: a-z or ' or -
        .filter(item => item != '') // remove any empty items from array
        .filter(item => item != '\'') // remove any items which are just a apostrophe
        .filter(item => item != '-') // remove any items which are just a hyphen
        .map((item, i) => {                                           // with the above array
          if (i, item.replace(/[^-]/g, '').length >= 4) {             // find any items containing more than or equal to 4 hyphens (4 allows for a trailing hyphen which is not counted in next set)
            item = item.match(/((?:[^-]*?-){3}[^-]*?)-|([\S\s]+)/g);  // if an 'offending' item occurs, group every 4 words, ignoring the hyphen between groups [ie. 'one-one-one-one-two-two-two-two' (eight words, seven hyphens) 'one-one-one-one-' 'two-two-two-two']
          }
          return item; // add array in position of word
        })); // flatten array
    },
  },
  mounted: function () {
    this.emitter.on('validate', this.handleValidate);
  },
  beforeUnmount: function() {
    this.setError('');
    this.setWarning('');
    this.emitter.off('validate', this.handleValidate);
  },
  methods: {
    setError(message) {
      this.errorMessage = message;
      this.emitter.emit('handle-error', { id: this.id, message: this.errorMessage });
    },
    setWarning(message) {
      this.warningMessage = message;
      this.emitter.emit('handle-warning', { id: this.id, message: this.warningMessage });
    },
    handleValidate() {
      this.checkErrors = true;
      this.validate();
    },
    validate(event) {
      this.setError('');
      if (this.checkErrors) {
        let value = this.modelValue;
        if (value && /^[=+\-@]/.test(value)) {
          value = `'${value}`;
        }

        if (event && event.target) {
          value = event.target.value;
        }
        const isNullOrUndefined = (value === null) || (value === undefined);
        const isEmptyArray = (!isNullOrUndefined && Array.isArray(value) && value.length === 0);
        const isEmptyString = (!isNullOrUndefined && typeof value === 'string' && value.replace(/\s/g, '').length === 0);
        let isEmptyObject = false;
        if (!isNullOrUndefined) {
          if (value instanceof Date) {
            if (isNaN(value)) {
              isEmptyObject = true;
            }
          }
          else if (typeof value === 'object' && Object.keys(value).length === 0) {
            isEmptyObject = true;
          }
        }
        const isEmpty = isNullOrUndefined || isEmptyString || isEmptyArray || isEmptyObject;
        if (!this.required && isEmpty) return;
        if (
          this.required &&
          !this.isOngoing &&
          isEmpty
        ) {
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

        if (this.type && ['month', 'date'].includes(this.type) && value) {
          if (this.maxDate && (value > (this.maxDate))) {
            this.setError(`Enter a date before ${formatDate(this.maxDate)} for ${this.label}`);
          }
          if (this.minDate && (value < (this.minDate))) {
            this.setError(`Enter a date after ${formatDate(this.minDate)} for ${this.label}`);
          }
        }

        if (this.type && this.type === 'tel' && value) {
          // remove plus, hyphen, and space before regex validation
          if (!this.regex.tel.test(value.replace(/ /g,''))) {
            this.setError(`Enter a valid phone number for ${this.label}`);
          }
        }

        if (this.type && ['number', 'non-negative-number'].includes(this.type) && value && this.numMax) {
          if (value > this.numMax) {
            this.setError(`Please enter a number lower than ${this.numMax}`);
          }
        }

        if (this.type && this.type === 'postcode' && value) {
          value = value.trim().replace(/ /g, '').toUpperCase();
          this.text = value;
          if (!this.regex.postcode.test(value)) {
            this.setError(`Enter a valid value for ${this.label}`);
          }
        }

        if (this.type && this.type === 'nino' && value) {
          value = value.trim().replace(/ /g, '').toUpperCase();
          this.text = value;
          if (!this.regex.nino.test(value)) {
            this.setError(`Enter a valid value for ${this.label}`);
          }
        }

        if (this.type && this.type === 'mobile' && value) {
          value = value.trim().toLowerCase();
          this.text = value;
          if (!isValidNumberForRegion(value, 'GB')) { // restricted to GB numbers
            this.setError(`Enter a valid value for ${this.label}`);
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

        if (this.wordLimit && this.modelValue) {
          if (this.words.length > this.wordLimit) {
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
