<template>
  <button
    :class="buttonStyle"
    data-module="govuk-button"
    @click="$emit('click', $event)"
  >
    <slot>Start now</slot>
    <svg
      class="govuk-button__start-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="17.5"
      height="19"
      viewBox="0 0 33 40"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M0 0h13l20 20-20 20H0l20-20z"
      />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    requiredStyle: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonStyle() {
      return `govuk-button govuk-button--start info-btn--start-button--start-now-or-continue ${this.requiredStyle}`;
    },
  },
};
</script>
