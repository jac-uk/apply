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
      {{ wordLimit ? `In ${wordLimit} words, tell us how.` : null }}
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
      :rows="rows"
      @keydown="handleLimit($event)"
      @keyup="handleLimit($event)"
      @change="validate"
    />
    <span v-if="wordLimit">
      {{ words.length }}/{{ wordLimit }}
    </span>
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
  },

  computed: {
    words() {
      const value = this.value;
      const result = value ? value : '';
      return result
        .replace(/-/g, '')
        .split(/\s+/)
        .filter(item => item !== '');
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

        if (this.words.length > this.wordLimit) {
          e.preventDefault();
        }
        this.handleValidate();
      }
    },
  },
};
</script>
