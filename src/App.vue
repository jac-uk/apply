<template>
  <div class="page-container">
    <Header v-if="!fullPageMode" />

    <main
      id="main-content"
      class="govuk-width-container"
      :class="fullPageMode ? 'govuk-!-margin-0' : 'govuk-main-wrapper govuk-main-wrapper--auto-spacing'"
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
    overflow: hidden;
  }
</style>
