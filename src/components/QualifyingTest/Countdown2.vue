<template>
  <div
    v-if="showCountdown"
    class="countdown govuk-!-margin-bottom-4"
    :class="bckClass"
  >
    Time remaining: <span>{{ minutes | zeroPad }}:{{ seconds | zeroPad }}</span>
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
    startTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
      default: 15,
    },
    warning: {
      type: Number,
      default: 5,
    },
    alert: {
      type: Number,
      default: 1,
    },
  },
  data: function() {
    return {
      showCountdown: true,
      start: '',
      end: '',
      interval: '',
      //days: '',
      //hours: '',
      minutes: '',
      seconds: '',
      bckClass: '',
    };
  },
  mounted() {
    const start = new Date(this.startTime);
    const end = new Date(this.startTime);
    end.setMinutes(end.getMinutes() + this.duration);

    this.start = start.getTime();
    this.end = end.getTime();

    this.tick(this.start, this.end);

    this.interval = setInterval(() => {
      this.tick(this.start, this.end);
    }, second);
  },
  methods: {
    tick(start, end) {
      const now = new Date().getTime();

      const timeRemaining = end - now;

      if (timeRemaining > 0) {
        this.calculateTimeLeft(timeRemaining);
        if (this.minutes < this.warning) {
          this.bckClass = 'warning';
        }
        if (this.minutes < this.alert) {
          this.bckClass = 'alert';
        }
      } else {
        clearInterval(this.interval);
        this.showCountdown = false;
        this.$emit('change', { action: 'ended' });
      }
    },
    calculateTimeLeft(timeRemaining) {
      this.minutes = Math.floor((timeRemaining % (60 * minute)) / (minute));
      this.seconds = Math.floor((timeRemaining % (minute)) / 1000);
    },
  },
};
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
.countdown {
  background-color: green;
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 10px;

  span {
    font-weight: bold;
    display: inline-block;
  }

  &.warning {
    background-color: yellow;
    color: black;
  }
  &.alert {
    background-color: red;
  }
}
</style>
