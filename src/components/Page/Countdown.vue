<template>
  <div
    v-if="status != 'upcoming'"
    class="govuk-warning-text"
  >
    <span
      class="govuk-warning-text__icon"
      aria-hidden="true"
    >
      !
    </span>
    <strong class="govuk-warning-text__text">
      <span class="govuk-warning-text__assistive">Warning</span>
      {{ message }}
      <span
        v-if="status === 'open'"
      >
        Time left: {{ minutes | zeroPad }}:{{ seconds | zeroPad }}.
      </span>
    </strong>
  </div>
</template>

<script>
const second = 1000;
const minute = 60 * second;

export default {
  filters: {
    zeroPad(value) {
      if (typeof value === 'number') {
        return value.toString().padStart(2, '0');
      }
      return value;
    },
  },
  props: {
    countdownLength: {
      type: Number,
      required: false,
      default: 15,
    },
    closeTime: {
      type: Date,
      required: true,
    },
  },
  data: function() {
    return {
      timer: '',
      start: '',
      end: '',
      interval: '',
      //days: '',
      //hours: '',
      minutes: '',
      seconds: '',
      status: '',
      message: '',
    };
  },
  mounted() {
    const end = new Date(this.closeTime);
    const start = new Date(this.closeTime);
    start.setMinutes(end.getMinutes() - this.countdownLength);

    this.start = start.getTime();
    this.end = end.getTime();

    this.tick(this.start, this.end);

    this.interval = setInterval(() => {
      this.tick(this.start, this.end);
    }, second);
  },
  methods: {
    tick(start, end) {
      var now = new Date().getTime();

      var timeSinceStart = now - start;
      var timeRemaining = end - now;

      if (timeSinceStart < 0) {
        this.status = 'upcoming';
        return;
      }

      if (timeRemaining > 0) {
        this.status = 'open';
        this.calculateTimeLeft(timeRemaining);
        this.message = 'This vacancy is closing soon.';
        if (this.minutes < 5) {
          this.message = 'This vacancy is closing very soon.';
        }
      } else {
        this.status = 'closed';
        clearInterval(this.interval);
        this.message = 'This vacancy is now closed.';
      }
    },
    calculateTimeLeft(timeRemaining) {

      //this.days = Math.floor(timeRemaining / (24 * 60 * minute));
      //this.hours = Math.floor((timeRemaining % (24 * 60 * minute)) / (60 * minute));
      this.minutes = Math.floor((timeRemaining % (60 * minute)) / (minute));
      this.seconds = Math.floor((timeRemaining % (minute)) / 1000);
    },
  },
};
</script>
