<template>
  <div class="page-container">
    <Header v-if="!fullPageMode" />
    <div
      v-if="!fullPageMode"
      class="govuk-phase-banner govuk-!-margin-bottom-4 print-none"
    >
      <p class="govuk-phase-banner__content">
        <strong class="govuk-tag govuk-phase-banner__content__tag">
          alpha
        </strong>
        <span class="govuk-phase-banner__text">
          This is a new service – your <a
            style="font-size: 16px"
            class="govuk-link govuk-body"
            href="https://docs.google.com/forms/d/e/1FAIpQLSexm0qgMV0tOQTFP4QUSegOOX89VeYhWwuofV---JZTOEXGIQ/viewform"
            target="_blank"
          >feedback</a> will help us improve it.
        </span>
      </p>
    </div>

    <main
      id="main-content"
      class="govuk-width-container govuk-main-wrapper govuk-main-wrapper--auto-spacing"
      role="main"
    >
      <RouterView />
    </main>

    <Footer
      v-if="!fullPageMode"
    />
  </div>
</template>

<script>
import Header from '@/components/Page/Header';
import Footer from '@/components/Page/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  computed: {
    fullPageMode() {
      return this.$route.meta.fullPageMode;
    },
  },
};
</script>

<style lang="scss" scoped>
  .govuk-main-wrapper {
    padding: 0px;
  }

  .page-container {
    position: relative;
    min-height: 100%;
  }
</style>
