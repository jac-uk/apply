<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <fieldset
      class="govuk-fieldset"
      :aria-describedby="hint ? `${id}-hint` : null"
      role="group"
    >
      <legend
        v-if="label"
        class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-2"
      >
        {{ label }}
      </legend>
      <span
        v-if="hint"
        :id="`${id}-hint`"
        class="govuk-hint"
      >
        {{ hint }}
      </span>
      <FormFieldError
        :id="id"
        :error-message="errorMessage"
      />
      <div
        :id="id"
        class="govuk-date-input"
      >
        <div
          v-if="type === 'date'"
          class="govuk-date-input__item"
        />
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label
              class="govuk-label govuk-date-input__label"
              :for="`${id}-month`"
            >
              Month
            </label>
            <input
              :id="`${id}-month`"
              ref="monthInput"
              v-model.lazy="monthInput"
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              type="number"
            >
          </div>
        </div>
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label
              class="govuk-label govuk-date-input__label"
              :for="`${id}-year`"
            >
              Year
            </label>
            <input
              :id="`${id}-year`"
              ref="yearInput"
              v-model.lazy="yearInput"
              class="govuk-input govuk-date-input__input govuk-input--width-4"
              type="number"
            >
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import DateInput from './DateInput';

export default {
  name: 'DateMonthYearInput',
  extends: DateInput,
  data() {
    return {
      day: 1,
      month: null,
      year: null,
    };
  },
};
</script>
