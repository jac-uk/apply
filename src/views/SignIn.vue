<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form
        ref="formRef"
        @submit.prevent="submit"
      >
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">
            Sign in
          </h1>

          <p class="govuk-body-l">
            Or
            <RouterLink
              class="govuk-link"
              data-module="govuk-button"
              :to="{ name: 'sign-up' }"
            >
              create an account
            </RouterLink>
            if you do not have one.
          </p>

          <!-- <p>
            <button
              type="button"
              class="govuk-button button-image"
              @click="loginWithGoogle"
            >
              <img
                alt="Sign in with Google"
                src="@/assets/btn_google_signin_light_normal_web@2x.png"
                width="191"
              >
            </button>
          </p> -->

          <ErrorSummary :errors="errors" />

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

          <button
            class="govuk-button"
            :disabled="disabled"
          >
            Continue
          </button>

          <p class="govuk-body">
            Problems signing in?
            <RouterLink
              class="govuk-link"
              data-module="govuk-button"
              :to="{ name: 'reset-password' }"
            >
              Reset your password
            </RouterLink>
            here.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextField from '@/components/Form/TextField';
import { auth } from '@/firebase';
import { RECAPTCHA_ACTIONS } from '@/helpers/constants';

export default {
  components: {
    ErrorSummary,
    TextField,
  },
  data () {
    return {
      formData: {},
      errors: [],
    };
  },
  computed: {
    disabled() {
      return !this.formData.email || !this.formData.password;
    },
    exerciseId () {
      return this.$store.state.vacancy.record && this.$store.state.vacancy.record.id;
    },
  },
  methods: {
    // loginWithGoogle() {
    //   const provider = new auth.GoogleAuthProvider();
    //   auth().signInWithPopup(provider);
    // },
    async submit() {
      if (this.disabled) return;

      const token = await this.$recaptcha(RECAPTCHA_ACTIONS.LOGIN.action);
      const isVerified = await this.$store.dispatch('auth/verifyRecaptcha', {
        token,
        score: RECAPTCHA_ACTIONS.LOGIN.score,
      });
      if (!isVerified) return;

      this.login();
    },
    async login() {
      this.errors = [];
      auth().signInWithEmailAndPassword(this.formData.email, this.formData.password)
        .then((userCredential) => {

          // LOG
          const objToLog = {
            type: 'login',
            id: userCredential.user.uid,
            data: {
              uid: userCredential.user.uid,
              meta: this.$browserDetect.meta,
            },
          };
          this.$store.dispatch('logs/save', objToLog);
          // LOG

          this.$store.dispatch('auth/setCurrentUser', userCredential.user);
          if (this.$store.getters['vacancy/id']) {
            this.$router.push({ name: 'GDPR', params: { id: `${this.$store.getters['vacancy/id']}` } });
          } else {
            this.$router.push({ name: 'applications' });
          }
        })
        .catch((error) => {
          this.errors.push({ id: 'email', message: error.message });
        });
    },
  },
};
</script>

<style scoped>
  .login-container {
    max-width: 360px;
    margin: 0 auto;
  }
  .button-image {
    padding: 0;
    border: none;
    margin: 0;
    box-shadow: none;
    background-color: transparent;
  }

</style>
