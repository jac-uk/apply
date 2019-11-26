<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form @submit.prevent="login">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">
            Sign in
          </h1>

          <p class="govuk-body-l">
            Or <a href="#">create an account</a> if you do not have one
          </p>

          <TextField
            id="email"
            v-model="formData.email"
            label="Email address"
            type="email"
          />

          <TextField
            id="password"
            v-model="formData.password"
            label="Password"
            type="password"
          />

          <button class="govuk-button">
            Continue
          </button>
        </div>
      </form>       
    </div>
  </div>
</template>

<script>
import TextField from '@/components/Form/TextField';
import { auth } from '@/firebase';

export default {
  components: {
    TextField,
  },
  data () {
    return {
      formData: {},
    };
  },
  computed: {
    exerciseId () {
      return this.$store.state.exercise.record && this.$store.state.exercise.record.id;
    },
  },
  methods: {
    login() {
      if (this.formData.email && this.formData.password) {
        auth().signInWithEmailAndPassword(this.formData.email, this.formData.password);
        // .catch((error) => {
        //   // handle errors - e.g. account not valid
        // });
      }    
    },
  },
};
</script>

<style scoped>
  .login-container {
    max-width: 360px;
    margin: 0 auto;
  }
</style>
