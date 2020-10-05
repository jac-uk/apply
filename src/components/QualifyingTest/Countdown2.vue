<template>
  <div
    v-if="showCountdown"
    class="countdown"
    :class="bckClass"
  >
    <div class="float-left govuk-grid-column-one-third">
      <slot
        name="left-slot"
      />
    </div>
    <div class="govuk-grid-column-one-third">
      <span>
        <span style="margin-right: 5px;">
          {{ mobileView ? '' : 'Time Remaining:' }}
        </span>
        <span 
          v-if="hours" 
        >
          {{ hours | zeroPad }}:
        </span>
        <span>
          {{ minutes | zeroPad }}:{{ seconds | zeroPad }}
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
    <div class="float-right govuk-grid-column-one-third">
      <slot
        name="right-slot"
      />
    </div>
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
    endTime: {
      type: Date,
      required: true,
    },
    mobileView: {
      type: Boolean,
      default: false,
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
      hours: '',
      minutes: '',
      seconds: '',
      bckClass: '',
    };
  },
  mounted() {
    const start = new Date(this.startTime);
    let end = new Date(this.startTime);

    end.setMinutes(end.getMinutes() + this.duration);

    // #495 Absolute End
    const absoluteEnd = new Date(this.endTime);
    const isAbsluteEndBeforeTheEnd = absoluteEnd < end;
  
    if (isAbsluteEndBeforeTheEnd) {
      end = absoluteEnd;
    }
    // END #495 Absolute End

    this.start = start.getTime();
    this.end = end.getTime();

    this.tick(this.start, this.end);

    this.interval = setInterval(() => {
      this.tick(this.start, this.end);
    }, second);
  },
  methods: {
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    },
    tick(start, end) {
      const now = new Date().getTime();

      const timeRemaining = end - now;

      if (timeRemaining > 0) {
        this.calculateTimeLeft(timeRemaining);
        if (this.hours < 1) {
          if (this.minutes < this.warning) {
            this.bckClass = 'warning';
          }
          if (this.minutes < this.alert) {
            this.bckClass = 'alert';
          }
        }
      } else {
        clearInterval(this.interval);
        this.showCountdown = false;
        this.$emit('change', { action: 'ended' });
      }
    },
    calculateTimeLeft(timeRemaining) {
      this.hours = Math.floor((timeRemaining % (24 * 60 * minute)) / (60 * minute));
      this.minutes = Math.floor((timeRemaining % (60 * minute)) / (minute));
      this.seconds = Math.floor((timeRemaining % (minute)) / 1000);
    },
  },
};
</script>

<style lang="scss" scoped>

  span {
    vertical-align: middle;
    display: inline-block;
  }

  .countdown {
    background-color: green;
    color: white;
    text-align: center;
    font-weight: bold;
    padding: 10px 0;
    display: flex;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 9;

    &.alert {
      background-color: red;
    }

    div {
      text-align: center;
    }

  }

  .float-right {
    text-align: right !important;
  }

  .float-left {
    text-align: left !important;
    left: 0;
  }

</style>
