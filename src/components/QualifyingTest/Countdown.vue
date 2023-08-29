<template>
  <div
    v-if="showCountdown"
    class="countdown"
    :class="bckClass"
  >
    <div class="govuk-!-padding-2 govuk-width-container">
      <div class="text-left">
        <div
          class="header-background clearfix"
          style="display: flex;"
        >
          <slot
            name="left-slot"
          />
        </div>
      </div>
      <div class="text-center">
        <span
          id="time-remaining"
        >
          <span
            v-if="hours"
          >
            {{ $filters.zeroPad(hours) }}:
          </span>
          <span
            style="margin-right: 5px;"
          >
            {{ $filters.zeroPad(minutes) }}:{{ $filters.zeroPad(seconds) }}
          </span>
          <svg
            v-if="bckClass"
            class="moj-banner__icon"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            height="25"
            width="25"
          >
            <path
              d="M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8 C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z"
            />
          </svg>
        </span>
      </div>
      <div class="text-right">
        <slot
          name="right-slot"
        />
      </div>
    </div>
  </div>
</template>

<script>
const second = 1000;
const minute = 60 * second;

export default {
  name: 'Countdown',
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
    endTime: {
      type: Date,
      default: null,
    },
    serverTimeOffset: {
      type: Number,
      default: 0,
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
  emits: ['change'],
  data: function() {
    return {
      showCountdown: true,
      start: '',
      end: '',
      interval: '',
      //days: '',
      hours: '',
      minutes: '',
      seconds: '',
      bckClass: '',
      saveCounter: 0,
      saveSeconds: 5,
      ticksPerSecond: 1,
      started: false,
      paused: false,
    };
  },
  watch: {
    serverTimeOffset(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.resumeCountdown();
      }
    },
  },
  created() {
    window.addEventListener('blur', this.onBlur);
    window.addEventListener('focus', this.onFocus);

    const start = new Date(this.startTime);
    let end = new Date(this.startTime);
    end.setMinutes(end.getMinutes() + this.duration);

    // if we are provided an endTime and it is sooner than expected end then use it instead
    if (this.endTime !== null) {
      const absoluteEnd = new Date(this.endTime);
      const isAbsoluteEndBeforetheEnd = absoluteEnd < end;
      if (isAbsoluteEndBeforetheEnd) {
        end = absoluteEnd;
      }
    }

    this.start = start.getTime();
    this.end = end.getTime();
    this.startCountdown();
  },
  unmounted() {
    window.removeEventListener('blur', this.onBlur);
    window.removeEventListener('focus', this.onFocus);
    this.endCountdown();
  },
  methods: {
    onFocus() {
      this.$emit('change', { action: 'refresh' });
      this.resumeCountdown();
    },
    onBlur() {
      this.pauseCountdown();
    },
    startCountdown() {
      if (!this.started) {
        this.started = true;
        this.updateClock();
        this.tick();
      }
    },
    endCountdown() {
      this.started = false;
      this.showCountdown = false;
    },
    pauseCountdown() {
      this.paused = true;
    },
    resumeCountdown() {  // turns the pause off after short delay. Gives refresh action a chance to happen.
      setTimeout(
        () => {
          this.paused = false;
        },
        (second / this.ticksPerSecond)
      );
    },
    tick() {
      if (this.started) {
        setTimeout(
          () => {
            this.updateClock();
            this.tick();
          },
          (second / this.ticksPerSecond)
        );
      }
    },
    updateClock() {
      if (this.started) {
        this.saveCounter++;
        if (this.saveCounter === this.saveSeconds * this.ticksPerSecond) {
          this.$emit('change', { action: 'autoSave' });
          this.saveCounter = 0;
        }
        if (this.saveCounter === (2 * this.ticksPerSecond)) { // clean the autoSaver 2s after it is set to true
          this.$emit('change', { action: 'cleanAutoSave' });
        }

        const currentLocalTime = new Date().getTime();
        const now = currentLocalTime + this.serverTimeOffset;
        const timeRemaining = this.end - now;
        if (timeRemaining > 0) {
          if (!this.paused) {
            this.hours = Math.floor((timeRemaining % (24 * 60 * minute)) / (60 * minute));
            this.minutes = Math.floor((timeRemaining % (60 * minute)) / (minute));
            this.seconds = Math.floor((timeRemaining % (minute)) / 1000);
            if (this.hours < 1) {
              this.bckClass = '';
              if (this.minutes < this.warning) {
                this.bckClass = 'warning';
              }
              if (this.minutes < this.alert) {
                this.bckClass = 'alert';
              }
            }
          }
        } else {
          this.$emit('change', { action: 'ended' });
          this.endCountdown();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>

  #time-remaining:before {
    content: 'Time remaining: ';
    @media (max-width: 599px) {
      content: '';
    }
  }

  span {
    vertical-align: middle;
    display: inline-block;
  }

  .countdown {
    background-color: green;
    color: white;
    text-align: center;
    font-weight: bold;
    // padding-bottom: 10px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 9;
    left: 0;

    &.alert {
      background-color: red;
    }

    div {
      text-align: center;
    }

  }

  .text-right {
    text-align: right !important;
    display: inline;
    min-height: 1px;
    float: right;
  }

  .text-center {
    text-align: center !important;
    display: inline-block;
    min-height: 1px;
  }

  .text-left {
    text-align: left !important;
    display: inline;
    min-height: 1px;
    float: left;
  }

</style>
