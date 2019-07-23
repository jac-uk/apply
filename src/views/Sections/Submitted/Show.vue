<template>
  <section>
    <article
      v-if="application.state === 'submitted'"
      class="card"
    >
      <div class="card-header">
        <h2 class="card-title">
          Thank you for your application
        </h2>
      </div>
      <div class="card-body">
        You have applied for <strong>{{ vacancy.jac_ref }}: {{ vacancy.title }}</strong>
      </div>
    </article>
    <article
      v-else
      class="card"
    >
      <div class="card-header">
        <h2 class="card-title">
          Please submit your application
        </h2>
      </div>
      <div class="card-body">
        <p>
          You are applying for <strong>{{ vacancy.jac_ref }}: {{ vacancy.title }}</strong>
        </p>
        <p>
          Your application is not complete until you have reviewed and submitted. Please do so on
          the <router-link :to="'Review'">
            Review and Submit
          </router-link> page.
        </p>
      </div>
    </article>
  </section>
</template>
<script>

export default {
  data() {
    return {
      vacancy: this.$store.getters.vacancy,
      application: this.$store.getters.application(),
    };
  },
};
</script>
