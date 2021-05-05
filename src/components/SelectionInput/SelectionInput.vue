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
        {{ typeHint }}
      </span>

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
import SingleChoice from '@/components/SelectionInput/SingleChoice';
import MultipleChoice from '@/components/SelectionInput/MultipleChoice';
import RankedChoice from '@/components/SelectionInput/RankedChoice';
import FormField from '@/components/Form/FormField';

export default {
  name: 'SelectionInput',
  components: {
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
    value: {
      type: [String, Array],
      required: false,
      default: null,
    },
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    typeHint(){
      return this.type === 'single-choice' ? 'Select one answer' : 
        this.type === 'multiple-choice' ? 'Select all that apply' :
        this.type === 'ranked-choice' ? 'Select and rank all that apply. With 1 being your top choice' :
        '';
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
