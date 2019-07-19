<template>
  <main class="container">
    <h1>Apply for Vacancy</h1>
    <div v-if="loaded === false && loadFailed === false">
      Loading...
    </div>
    <div v-if="loaded === false && loadFailed === true">
      <p>Could not load data. Please reload the page and try again.</p>
    </div>
    <div v-if="loaded === true">
      <div class="row">
        <nav class="col-md-4 mb-4">
          <ApplicationNav />
        </nav>
        <div class="col-md-8">
          <Banner />
          <RouterView @continue="nextPage" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import ApplicationNav from '@/components/ApplicationNav';
  import Banner from '@/components/Banner';

  export default {
    name: 'Apply',
    components: {
      ApplicationNav,
      Banner,
    },
    data() {
      return {
        vacancyId: 'hsQqdvAfZpSw94X2B8nA', // hardcoded for now
        loaded: false,
        loadFailed: false,
      };
    },
    methods: {
      initStore() {
        this.$store.commit('setVacancyId', this.vacancyId);
        return Promise.all([
          this.$store.dispatch('loadApplicant'),
          this.$store.dispatch('loadVacancy'),
          this.$store.dispatch('loadApplication')
        ]);
      },
      nextPage() {
        const nextPage = this.$store.getters.nextPagePath;
        if (nextPage) {
          this.$router.push(nextPage);
        }
      },
    },
    created() {
      this.initStore()
        .then(() => {
          this.loaded = true;
        })
        .catch((e) => {
          this.loadFailed = true;
          throw e;
        });

      this.$store.dispatch('setCurrentPagePath', this.$route.path);
    },
    watch: {
      '$route'(to) {
        this.$store.dispatch('setCurrentPagePath', to.path);
      },
    },
  };
</script>
