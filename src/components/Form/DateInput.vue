<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <fieldset
      class="govuk-fieldset govuk-fieldset__legend"
      :aria-describedby="hint ? `${id}-hint` : null"
      role="group"
    >
      <legend
        v-if="label"
        class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-2"
      >
        <span
          v-if="labelHidden"
          class="govuk-visually-hidden"
        >
          {{ label }}
        </span>
        <div
          v-else
          :style="!required ? { display: 'flex', 'align-items': 'center', gap: '12px' } : null"
        >
          {{ label }}
          <span
            v-if="!required"
            class="govuk-label"
            style="margin-bottom: 0;"
          >
            (optional)
          </span>
        </div>
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
        >
          <div class="govuk-form-group">
            <label
              class="govuk-label govuk-date-input__label"
              :for="`${id}-day`"
            >
              Day
            </label>
            <input
              :id="`${id}-day`"
              ref="dayInput"
              v-model.lazy="dayInput"
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              type="number"
              @input="changeDay"
            >
          </div>
        </div>
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
              @input="changeMonth"
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

        <template v-if="ongoingVisible">
          <div class="govuk-date-input__item">
            <p class="govuk-body">
              or
            </p>
          </div>

          <div class="govuk-date-input__item">
            <Checkbox
              :id="`${id}-ongoing`"
              v-model.lazy="isOngoingInput"
              label="End date"
              :label-hidden="true"
            >
              Tick if still ongoing
            </Checkbox>
          </div>
        </template>
      </div>
    </fieldset>
  </div>
</template>

<script>
import parseAndClipNumber from '@/helpers/Form/parseAndClipNumber';
import { validateYear } from '@/helpers/date';
import zeroPad from '@/helpers/Form/zeroPad';
import FormField from '@/components/Form/FormField.vue';
import Checkbox from '@/components/Form/Checkbox.vue';
import FormFieldError from '@/components/Form/FormFieldError.vue';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'DateInput',
  components: {
    Checkbox,
    FormFieldError,
  },
  extends: FormField,
  props: {
    minDate: {
      default: null,
      type: Date,
    },
    maxDate: {
      default: null,
      type: Date,
    },
    type: {
      default: 'date',
      validator: (value) => (['date', 'month'].indexOf(value) !== -1),
    },
    modelValue: {
      required: true,
      validator: (value) => (value instanceof Date || value === null || value === undefined),
    },
    labelHidden: {
      default: false,
      type: Boolean,
    },
    ongoingVisible: {
      default: false,
      type: Boolean,
    },
    isOngoing: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['update:modelValue', 'update:isOngoing'],
  data() {
    return {
      day: null,
      month: null,
      year: null,
    };
  },
  computed: {
    dayInput: {
      get() {
        return zeroPad(this.day);
      },
      set(value) {
        this.day = parseAndClipNumber(value, 1, 31);
      },
    },
    monthInput: {
      get() {
        return zeroPad(this.month);
      },
      set(value) {
        this.month = parseAndClipNumber(value, 1, 12);
      },
    },
    yearInput: {
      get() {
        return this.year;
      },
      set(value) {
        this.year = validateYear(value);
      },
    },
    isOngoingInput: {
      get() {
        return this.isOngoing;
      },
      set(value) {
        if (value) {
          this.day = null;
          this.month = null;
          this.year = null;
        }
        this.$emit('update:isOngoing', value);
      },
    },
    dateConstructor() {
      const day = this.type === 'month' ? 1 : this.day;
      const month = this.month;
      const year = this.year;

      if (!day || !month || !year) {
        return null;
      }

      return [year, month - 1, day];
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
          this.day = value.getUTCDate();
          this.month = value.getUTCMonth() + 1;
          this.year = value.getUTCFullYear();
        }
      },
    },
  },
  watch: {
    date(value) {
      if (value) {
        this.$emit('update:isOngoing', false);
      }
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
    changeDay(e) {
      const value = e.target.value;
      if (value.length === 2) {
        this.$refs.monthInput.select();
      }
    },
    changeMonth(e) {
      const value = e.target.value;
      if (value.length === 2) {
        this.$refs.yearInput.select();
      }
    },
  },
};
</script>
