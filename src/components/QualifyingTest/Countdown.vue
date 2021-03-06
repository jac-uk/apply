<template>
  <div
    class="countdown govuk-!-margin-bottom-4"
    :class="bckClass"
  >
    Time remaining: <span>{{ formattedTimeLeft }}</span>
  </div>
</template>

<script>
/* ****************************
 COUNTDOWN COMPONENT

 <Countdown
 :duration="1"
 :warning="0.5"
 :alert="0.25"
 @change="countChange"
 />

 countChange(obj) {
 // eslint-disable-next-line no-console
 console.log('countChange', obj);
 }
 ***************************** */

import { firestore } from '@/firebase';

export default {
  props: {
    duration: {
      type: Number,
      required: true,
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
  data() {
    return {
      timestampStart: null,
      timestampNow: null,
      timePassed: 0,
      timeLeft: 0,
      bckClass: '',
      timerInterval: null,
    };
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      // The largest round integer less than or equal to the result of time divided being by 60.
      const minutes = Math.floor(timeLeft / 60);
      // Seconds are the remainder of the time divided by 60 (modulus operator)
      let seconds = timeLeft % 60;
      // If the value of seconds is less than 10, then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      // The output in MM:SS format
      return `${minutes}:${seconds}`;
    },
    doTimerObject() {
      return {
        duration: {
          s: this.duration * 60,
          m: this.duration,
        },
        timePassed: {
          s: this.timePassed,
          m: this.timePassed / 60,
        },
        timeLeft: {
          s: this.timeLeft,
          m: this.timeLeft / 60,
        },
      };
    },
  },
  mounted() {
    this.timestampStart = firestore.timestamp;
    this.startTimer();
  },
  beforeDestroy() {
    this.endTimer();
    this.$emit('change', { ...this.doTimerObject, action: 'destroy' });
  },
  methods: {
    startTimer() {
      if (this.duration > 0) {
        this.timerInterval = setInterval(this.doSetInterval, 1000);
      }
    },
    endTimer() {
      clearInterval(this.timerInterval);
    },
    doSetInterval() {
      this.timestampNow = firestore.Timestamp;
      this.timePassed += 1;
      this.doTimeLeft();

      // end of countdown
      if (this.timeLeft === 0) {
        this.endTimer();
        this.bckClass = 'alert';
        this.$emit('change', { ...this.doTimerObject, action: 'endTimer' });
      }

      // warning
      if (this.timeLeft === this.warning * 60) {
        this.$emit('change', { ...this.doTimerObject, action: 'warning' });
      }
      if (this.timeLeft <= this.warning * 60) {
        this.bckClass = 'warning';
      }

      // alert
      if (this.timeLeft === this.alert * 60) {
        this.$emit('change', { ...this.doTimerObject, action: 'alert' });
      }
      if (this.timeLeft <= this.alert * 60) {
        this.bckClass = 'alert';
      }
    },
    doTimeLeft() {
      const durationInSeconds = (this.duration * 60).toFixed(0);
      this.timeLeft = durationInSeconds - this.timePassed;
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
