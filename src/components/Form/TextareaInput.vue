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
        v-if="words.length > wordLimit" 
        class="govuk-character-count__message govuk-error-message"
      >
        {{ `You have ${wordsTooMany} word${wordsTooMany > 1 ? 's' : ''} too many` }}
      </span>
      <span
        v-else-if="Math.floor(wordLimit * 0.20) > Math.abs(wordsTooMany)"
        class="govuk-hint govuk-character-count__message"
      >
        {{ `You have ${Math.abs(wordsTooMany)} word${Math.abs(wordsTooMany) > 1 ? 's' : ''} remaining` }}
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
        .split(/[^a-z'-]/i) //split into array at every occurance of a character which is NOT: a-z or ' or -
        .filter(item => item != '') // remove any empty items from array
        .filter(item => item != '-') // remove any items which are just a hyphen
        .map((item, i) => {                                           // with the above array 
          if (i, item.replace(/[^-]/g, '').length >= 4) {             // find any items containing more than or equal to 4 hyphens (4 allows for a trailing hyphen which is not counted in next set)
            item = item.match(/((?:[^-]*?-){3}[^-]*?)-|([\S\s]+)/g);  // if an 'offending' item occurs, group every 4 words, ignoring the hyphen between groups [ie. 'one-one-one-one-two-two-two-two' (eight words, seven hyphens) 'one-one-one-one-' 'two-two-two-two']
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
        this.handleValidate();
      }
    },
  },
};
</script>
