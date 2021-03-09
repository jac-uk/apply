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
      @change="validate"
    />
    <div
      v-if="wordLimit"
      class="govuk-hint govuk-character-count__message"
    >
      <span
        v-if="words.length > wordLimit" 
        class="govuk-character-count__message govuk-error-message"
      >
        {{ `You have ${wordsTooMany} word${wordsTooMany > 1 ? 's' : ''} too many` }}
      </span>
      <span
        v-else-if="Math.floor(wordLimit * 0.20) > Math.abs(wordsTooMany)"
        class="govuk-hint govuk-character-count__message"
      >
        You have {{ Math.abs(wordsTooMany) }} words remaining
      </span>
      <span
        v-else
        class="govuk-hint govuk-character-count__message"
      >
        {{ `${words.length}/${wordLimit}` }}
      </span>
      <!-- {{ words }} -->
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
  },

  computed: {
    words() {
      const value = this.value;
      const result = value ? value : '';
      return result
        .split(/[^a-z'-]/i)
        .filter(item => item != '')
        .filter(item => item != '-')
        .map((item, i) => {
          if (i, item.replace(/[^-]/g, '').length >= 4) {
            item = item.match(/((?:[^-]*?-){3}[^-]*?)-|([\S\s]+)/g);
          }
          return item;
        }).flat();
    },
    wordsTooMany() {
      return this.words.length - this.wordLimit;
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
        // if (this.words.length > this.wordLimit) {
        // e.preventDefault();
        // }
        this.handleValidate();
      }
    },
  },
};
</script>
