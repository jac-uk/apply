<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form
        ref="formRef"
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
              :to="{ name: 'sign-up', query: { nextPage: nextPage } }"
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
          <WarningSummary :warning-object="warningObject" />

          <TextField
            id="email"
            v-model="formData.email"
            label="Email address"
            type="email"
            warn-cps-email-msg="Use of a CPS device causes multiple known issues with the JAC Digital Platform due to the device firewall settings - it is strongly recommended that applicants use a personal device to log on/submit an application."
            required
          />

          <Password
            id="password"
            v-model="formData.password"
            label="Password"
            required
          />

          <ActionButton
            type="primary"
            class="govuk-!-margin-bottom-4"
            :action="submit"
          >
            Continue
          </ActionButton>

          <p class="govuk-body">
            <RouterLink
              class="govuk-link"
              data-module="govuk-button"
              :to="{ name: 'reset-password', query: { nextPage: nextPage } }"
            >
              Forgot password?
            </RouterLink>
          </p>
          <ChangeEmailMessage />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import WarningSummary from '@/components/Form/WarningSummary.vue';
import ChangeEmailMessage from '@/components/Page/ChangeEmailMessage.vue';
import TextField from '@/components/Form/TextField.vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { RECAPTCHA_ACTIONS } from '@/helpers/constants';
import Password from '@/components/Form/Password.vue';
import { getBrowserMeta } from '@/helpers/browser';
import ActionButton from '@jac-uk/jac-kit/draftComponents/ActionButton.vue';

export default {
  name: 'SignIn',
  components: {
    ErrorSummary,
    WarningSummary,
    TextField,
    ChangeEmailMessage,
    Password,
    ActionButton,
  },
  extends: Form,
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
    nextPage() {
      return this.$route.query.nextPage;
    },
  },
  methods: {
    // loginWithGoogle() {
    //   const provider = new auth.GoogleAuthProvider();
    //   auth.signInWithPopup(provider);
    // },
    async submit() {
      if (this.disabled) return false;

      const token = await this.$recaptcha(RECAPTCHA_ACTIONS.LOGIN.action);
      const isVerified = await this.$store.dispatch('auth/verifyRecaptcha', {
        token,
        score: RECAPTCHA_ACTIONS.LOGIN.score,
      });
      if (!isVerified) return false;

      return await this.login();
    },
    async login() {
      this.errors = [];

      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.formData.email, this.formData.password);
        // LOG
        const objToLog = {
          type: 'login',
          id: userCredential.user.uid,
          data: {
            uid: userCredential.user.uid,
            meta: getBrowserMeta(),
          },
        };

        await this.$store.dispatch('logs/save', objToLog);
        return true;

      } catch (error) {
        let message = error.message;
        // if (['auth/wrong-password', 'auth/user-not-found'].includes(error.code)) {
        message = 'Either the email address and/or password you have entered is incorrect';
        // }
        this.errors.push({ id: 'email', message: message });
        return false;
      }

      // auth.signInWithEmailAndPassword(this.formData.email, this.formData.password)
      //   .then((userCredential) => {

      //     // LOG
      //     const objToLog = {
      //       type: 'login',
      //       id: userCredential.user.uid,
      //       data: {
      //         uid: userCredential.user.uid,
      //         meta: getBrowserMeta(),
      //       },
      //     };
      //     this.$store.dispatch('logs/save', objToLog);
      //     // LOG

      //   })
      //   .catch((error) => {
      //     let message = error.message;
      //     // if (['auth/wrong-password', 'auth/user-not-found'].includes(error.code)) {
      //     message = 'Either the email address and/or password you have entered is incorrect';
      //     // }
      //     this.errors.push(
      //       { id: 'email', message: message });
      //   });
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
