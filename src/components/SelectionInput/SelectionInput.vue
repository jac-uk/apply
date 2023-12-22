<template>
  <div class="govuk-form-group">
    <fieldset 
      class="govuk-fieldset"
      :aria-describedby="`${id}-hint`"
    >
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
        {{ title }}
      </legend>
      <span
        :id="`${id}-hint`"
        class="govuk-hint"
      >
        {{ hintText }}
      </span>

      <FormFieldError
        :id="id"
        :error-message="errorMessage"
      />

      <SingleChoice
        v-if="isSingleChoice"
        :id="id"
        v-model="selected"
        :answers="answers"
      />

      <MultipleChoice
        v-if="isMultipleChoice"
        :id="id"
        v-model="selected"
        :answers="answers"
      />

      <RankedChoice
        v-if="isRankedChoice"
        :id="id"
        v-model="selected"
        :answers="answers"
      />
    </fieldset>
  </div>  
</template>

<script>
import SingleChoice from '@/components/SelectionInput/SingleChoice.vue';
import MultipleChoice from '@/components/SelectionInput/MultipleChoice.vue';
import RankedChoice from '@/components/SelectionInput/RankedChoice.vue';
import FormField from '@/components/Form/FormField.vue';
import FormFieldError from '@/components/Form/FormFieldError.vue';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'SelectionInput',
  components: {
    FormFieldError,
    SingleChoice,
    MultipleChoice,
    RankedChoice,
  },
  extends: FormField,
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Array],
      required: false,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    selected: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
    hintText() {
      switch (this.type) {
      case 'single-choice':
        return 'Select one answer';
      case 'multiple-choice':
        return 'Select all that apply';
      case 'ranked-choice':
        return 'Select and rank all that apply. With 1 being your top choice';
      default:
        return '';
      }
    },
    isSingleChoice() {
      return this.type === 'single-choice';
    },
    isMultipleChoice() {
      return this.type === 'multiple-choice';
    },
    isRankedChoice() {
      return this.type === 'ranked-choice';
    },
  },
};

</script>
