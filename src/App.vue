<template>
  <div class="page-container">
    <Header v-if="!fullPageMode" />

    <main
      id="main-content"
      class="govuk-width-container"
      role="main"
    >
      <div
        :class="fullPageMode ? 'govuk-!-margin-0' : 'govuk-main-wrapper govuk-main-wrapper--auto-spacing govuk-!-padding-top-0'"
      >
        <Banner
          v-if="invitations && invitations.length"
          status="information"
        >
          <template>
            <div
              v-for="invite in invitations"
              :key="invite.id"
            >
              <span>
                You are invited to apply for
                <RouterLink
                  :to="{ name: 'vacancy-details', params: { id: invite.vacancy.id } }"
                >
                  {{ invite.vacancy.name }}
                </RouterLink>
              </span>
            </div>
          </template>
        </Banner>
        <RouterView />
      </div>
    </main>

    <Footer
      v-if="!fullPageMode"
    />
  </div>
</template>

<script>
import Header from '@/components/Page/Header';
import Footer from '@/components/Page/Footer';
import Banner from '@/components/Page/Banner';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Banner,
  },
  computed: {
    fullPageMode() {
      return this.$route.meta.fullPageMode;
    },
    invitations() {
      return this.$store.state.invitations.records;
    },
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
  },
  watch: {
    isSignedIn: function (val) { 
      if (val) {
        this.$store.dispatch('invitations/bind');
      } else {
        this.$store.dispatch('invitations/unbind');
      }
    },
  },
};
</script>

<style lang="scss" scoped>

  .page-container {
    position: relative;
    min-height: 100%;
    overflow: hidden;
  }
</style>
