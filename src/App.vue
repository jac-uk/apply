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
        <div
          v-if="validInvitations.length"
        >
          <Banner
            v-for="invite in validInvitations"
            :key="invite.id"
            status="information"
          >
            <span>
              You've been invited to apply for
              <RouterLink
                :to="{ name: 'vacancy-details', params: { id: invite.vacancyId } }"
              >
                {{ invite.name }}
              </RouterLink>
            </span>
          </Banner>
        </div>
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
    vacancies() {
      return this.$store.getters['vacancies/openVacancies'];
    },
    validInvitations() {
      const result = [];
      if (this.invitations.length && this.vacancies.length) {
        this.invitations.forEach(invite => {
          if (this.vacancies.some(vac => vac.id === invite.vacancy.id)) {
            const validInvite = {
              name: this.vacancies.find(vacancy => vacancy.id === invite.vacancy.id).name,
              vacancyId: invite.vacancy.id,
            };
            result.push(validInvite);
          }
        });
      }
      return result;
    },
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
  },
  watch: {
    isSignedIn: {
      immediate: true,
      handler(val) { 
        if (val) {
          this.$store.dispatch('invitations/bind');
        } else {
          this.$store.dispatch('invitations/unbind');
        }
      },
    },
    invitations: {
      immediate: true,
      deep: true,
      handler(val) { 
        if (val && val.length) {
          // if (this.$store.state.vacancies.records.length) { 
          this.$store.dispatch('vacancies/bind', { vacancyIds: this.invitations.map(invite => invite.vacancy.id) });
          // }
        }
      }, 
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
