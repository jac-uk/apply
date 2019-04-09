<template>
  <div class="date-input form-row mb-3">
    <div class="col-3" v-if="type === 'date'">
      <label :for="dayInputId">Day</label>
      <input type="tel" class="form-control" :id="dayInputId" v-model.lazy="dayInput" ref="dayInput">
    </div>
    <div class="col-3">
      <label :for="monthInputId">Month</label>
      <input type="tel" class="form-control" :id="monthInputId" v-model.lazy="monthInput" ref="monthInput">
    </div>
    <div class="col-6">
      <label :for="yearInputId">Year</label>
      <input type="tel" class="form-control" :id="yearInputId" v-model.lazy="yearInput" ref="yearInput">
    </div>
  </div>
</template>

<script>
  let uid = 0;

  export default {
    name: 'DateInput',
    props: {
      value: {
        required: true,
        validator: (value) => (value instanceof Date || value === null || value === undefined),
      },
      type: {
        default: 'date',
        validator: (value) => (['date', 'month'].indexOf(value) !== -1),
      },
    },
    data() {
      return {
        day: null,
        month: null,
        year: null,
        dayInputId: `date_${uid}_day`,
        monthInputId: `date_${uid}_month`,
        yearInputId: `date_${uid}_year`,
      };
    },
    computed: {
      dayInput: {
        get() {
          if (this.day === null) return null;
          // Zero-pad number as a string
          return this.zeroPad(this.day);
        },
        set(value) {
          let int = parseInt(value);

          if (isNaN(int)) {
            this.day = null;
            return;
          }

          // Enforce lower & upper bounds
          if (int < 1) int = 1;
          if (int > 31) int = 31;
          this.day = int;
        }
      },
      monthInput: {
        get() {
          if (this.month === null) return null;
          // Zero-pad number as a string
          return this.zeroPad(this.month);
        },
        set(value) {
          let int = parseInt(value);

          if (isNaN(int)) {
            this.month = null;
            return;
          }

          // Enforce lower & upper bounds
          if (int < 1) int = 1;
          if (int > 12) int = 12;
          this.month = int;
        }
      },
      yearInput: {
        get() {
          return this.year;
        },
        set(value) {
          let int = parseInt(value);

          if (isNaN(int)) {
            this.year = null;
            return;
          }

          this.year = int;
        }
      },
      dateConstructor() {
        const day = this.day;
        const month = this.month;
        const year = this.year;

        if (this.type === 'month' && month && year) {
          return [year, month-1];
        } else if (day && month && year) {
          return [year, month-1, day];
        } else {
          return null;
        }
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
        }
      },
    },
    methods: {
      zeroPad(number) {
        return number.toString().padStart(2, '0');
      },
      datesAreEqual(date1, date2) {
        return (
          date1 instanceof Date &&
          date2 instanceof Date &&
          date1.getTime() === date2.getTime()
        );
      }
    },
    watch: {
      value(newValue, oldValue) {
        if (!this.datesAreEqual(newValue, oldValue)) {
          this.date = newValue;
        }
      },
      date(value) {
        this.$emit('input', value);
      },
    },
    created() {
      this.date = this.value;
      uid++;
    },
  }
</script>

<style scoped>
  .date-input {
    max-width: 18rem;
  }
</style>
