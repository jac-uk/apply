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
        v-model="localVModel"
        :answers="answers"
        :config="config"
      />

      <MultipleChoice
        v-if="isMultipleChoice"
        :id="id"
        v-model="localVModel"
        :answers="answers"
        :config="config"
      />

      <RankedChoice
        v-if="isRankedChoice"
        :id="id"
        v-model="localVModel"
        :answers="answers"
        :config="config"
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
    config: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    modelValue: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    localVModel: {
      get() {
        if (this.modelValue) return this.modelValue;
        switch (this.type) {
        case 'multiple-choice':
          return [];
        case 'ranked-choice':
          return {};
        default:
          return '';
        }
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
