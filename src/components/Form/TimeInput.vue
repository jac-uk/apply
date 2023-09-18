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
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label
              class="govuk-label govuk-date-input__label"
              :for="`${id}-hour`"
            >
              Hour
            </label>
            <input
              :id="`${id}-hour`"
              ref="hourInput"
              v-model.lazy="hourInput"
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              type="number"
            >
          </div>
        </div>
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label
              class="govuk-label govuk-date-input__label"
              :for="`${id}-minute`"
            >
              Minute
            </label>
            <input
              :id="`${id}-minute`"
              ref="minuteInput"
              v-model.lazy="minuteInput"
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              type="number"
            >
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import parseAndClipNumber from '@/helpers/Form/parseAndClipNumber';
import zeroPad from '@/helpers/Form/zeroPad';
import FormField from '@/components/Form/FormField.vue';
import FormFieldError from '@/components/Form/FormFieldError.vue';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'TimeInput',
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    modelValue: {
      required: true,
      validator: (value) => (value instanceof Date || value === null || value === undefined),
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      minute: null,
      hour: null,
    };
  },
  computed: {
    hourInput: {
      get() {
        return zeroPad(this.hour);
      },
      set(value) {
        this.hour = parseAndClipNumber(value, 0, 23);
      },
    },
    minuteInput: {
      get() {
        return zeroPad(this.minute);
      },
      set(value) {
        this.minute = parseAndClipNumber(value, 0, 59);
      },
    },
    dateConstructor() {
      const hour = this.hour;
      const minute = this.minute;

      if (hour === null || minute === null) {
        return null;
      }

      return [0, 0, 0, hour, minute];
    },
    date: {
      get() {
        if (this.dateConstructor === null) {
          return null;
        } else {
          return new Date(Date.UTC(...this.dateConstructor));
        }
      },
      set(value) {
        if (value instanceof Date) {
          this.hour = value.getHours();
          this.minute = value.getMinutes();
        }
      },
    },
  },
  watch: {
    date(value) {
      this.$emit('update:modelValue', value);
    },
    modelValue(newValue, oldValue) {
      if (!this.datesAreEqual(newValue, oldValue)) {
        this.date = newValue;
      }
    },
  },
  created() {
    this.date = this.modelValue;
  },
  methods: {
    datesAreEqual(date1, date2) {
      return (
        date1 instanceof Date &&
        date2 instanceof Date &&
        date1.getTime() === date2.getTime()
      );
    },
  },
};
</script>
