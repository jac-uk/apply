<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <label
      :for="id"
      :class="labelHidden ? 'govuk-visually-hidden' : 'govuk-heading-m govuk-!-margin-bottom-2'"
    >
      {{ label }}
    </label>
    <!-- eslint-disable -->
    <span
      v-if="hint"
      class="govuk-hint"
      v-html="hint"
    >
      <!-- eslint-enable -->
    </span>
    <FormFieldError
      :id="id"
      :error-message="errorMessage"
    />
    <textarea
      :id="id"
      v-model="text"
      class="govuk-textarea"
      name="word-count"
      aria-describedby="word-count-info"
      :rows="rows"
      @keydown="handleLimit($event)"
      @keyup="handleLimit($event)"
      @change="validate"
    />
    <div
      v-if="wordLimit"
      class="govuk-hint govuk-character-count__message"
    >
      <span
        :class="wordsTooMany > 0 ? 'govuk-error-message' : ''"
      >
        {{ wordLimitCount }}
      </span>
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
    value: {
      default: '',
      type: String,
    },
    rows: {
      default: '5',
      type: String,
    },
    wordLimit: {
      required: false,
      default: 0,
      type: Number,
    },
    labelHidden: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    wordsTooMany() {
      return this.words.length - this.wordLimit;
    },
    wordLimitCount() {
      let result;
      const plural = Math.abs(this.wordsTooMany) > 1 ? 's' : '';
      if (this.words.length > this.wordLimit) {
        result = `You have ${this.wordsTooMany} word${plural} too many`;
      } else if (Math.floor(this.wordLimit * 0.20) > Math.abs(this.wordsTooMany)) {
        result = `You have ${Math.abs(this.wordsTooMany)} word${plural} remaining`;
      } else {
        result = `${this.words.length}/${this.wordLimit}`;
      }
      if (this.wordsTooMany == 0) {
        result = 'You have no words remaining';
      } 
      return result;
    },
    text: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },

  methods: {
    handleLimit(e){
      if (this.wordLimit && [8, 46].indexOf(e.keyCode) === -1) {
        this.handleValidate();
      }
    },
  },
};
</script>
