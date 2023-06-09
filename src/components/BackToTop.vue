<template>
  <div
    v-show="isBackToTopVisisble"
    class="back-to-top-wrapper govuk-width-container print-none"
  >
    <a
      class="govuk-link back-to-top-link"
      href="#"
      @click.prevent="backToTop"
    >
      <svg
        role="presentation"
        focusable="false"
        class="back-to-top-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="17"
        viewBox="0 0 13 17"
      >
        <path
          fill="currentColor"
          d="M6.5 0L0 6.5 1.4 8l4-4v12.7h2V4l4.3 4L13 6.4z"
        />
      </svg>
      Back to top
    </a>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      isBackToTopVisisble: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.isBackToTopVisisble = true;
      } else {
        this.isBackToTopVisisble = false;
      }
    },
    backToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style scoped>
.back-to-top-wrapper {
  margin-bottom: 15px;
}

.back-to-top-icon {
  display: inline-block;
  width: .8em;
  height: 1em;
  margin-top: -5px;
  margin-right: 10px;
  vertical-align: middle;
}
</style>
