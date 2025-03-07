import { createApp } from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import * as filters from '@/filters';
import { auth } from '@/firebase';
import * as Sentry from '@sentry/vue';
import VueGtag from 'vue-gtag';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import { logoutUser } from '@/services/authService.js';
import { startActivityMonitor, stopActivityMonitor } from '@/services/activityService.js';

import './styles/main.scss';

// Global event emitter (fix vue warn of deprecation INSTANCE_EVENT_EMITTER)
import mitt from 'mitt';
const emitter = mitt();

let vueInstance = false;
auth.onAuthStateChanged( async (user) => {
  await store.dispatch('auth/setCurrentUser', user);
  const isSignedIn = store.getters['auth/isSignedIn'];
  const isEmailVerified = store.getters['auth/isEmailVerified'];
  const requiredFieldsComplete = store.getters['candidate/requiredFieldsComplete']();
  if (isSignedIn) {

    await store.dispatch('settings/bind');

    if (!isEmailVerified) {
      router.replace({ name: 'verify-email-request' });
    }
    else if (!requiredFieldsComplete) {
        router.replace({ name: 'sign-up-step2' });
    }
    else {
      // 2FA
      let isSignedInSuccess = true;

      if (router.currentRoute.value.name === 'sign-in') {
        await store.dispatch('candidate/bind');
        // check if two-factor authentication is enabled
        const isTwoFactorAuthEnabled = store.getters['settings/isTwoFactorAuthEnabled'];
        const twoFactorAuthTimeoutDays = store.getters['settings/getTwoFactorAuthTimeoutDays'];
        if (isTwoFactorAuthEnabled &&
          store.state.candidate?.personalDetails?.mobile &&
          store.state.candidate?.personalDetails?.mobileVerifiedAt && (
            !store.state.candidate?.personalDetails?.twoFactorAuthVerifiedAt ||
            store.state.candidate?.personalDetails?.twoFactorAuthVerifiedAt < new Date(Date.now() - twoFactorAuthTimeoutDays * 24 * 60 * 60 * 1000)
          )
        ) {
          await store.dispatch('auth/setVerificationModalOpen', true);
          isSignedInSuccess = false;
        }
      }

      if (isSignedInSuccess) {
        startActivityMonitor((timeLeft) => {
          if (window.updateDisplayCallback) {
            window.updateDisplayCallback(timeLeft);
          }
        }, async () => {
          alert('User inactive for specified period. Logging out...');
          await logoutUser();
          router.push('/sign-in');
        });

        const urlParams = new URLSearchParams(window.location.search);
        const nextPage = urlParams.get('nextPage');
        if (nextPage) {
          router.push(nextPage);
        }
        else {
          router.push('/vacancies');
        }
      }
    }
  } else {
    stopActivityMonitor();
  }

  // Create the Vue instance, but only once
  if (!vueInstance) {

    // Root instance
    vueInstance = createApp(App)
      .use(router)
      .use(store)
      .use(VueDOMPurifyHTML);

    // Bind global filters before mounting
    vueInstance.config.globalProperties.$filters = filters;

    // Bind emitter for global events
    vueInstance.config.globalProperties.emitter = emitter;

    // Initialise Sentry
    if (import.meta.env.VITE_USER_NODE_ENV !== 'development') {
      Sentry.init({
        app: vueInstance,
        dsn: 'https://2366ef9baa1a49bb8aa29c5262757de9@sentry.io/1499367',
        environment: store.getters.appEnvironment.toLowerCase(),
        release: import.meta.env.PACKAGE_VERSION,
        integrations: [
          Sentry.browserTracingIntegration({ router }),
        ],
      });
    }

    // Config GA
    if (import.meta.env.VITE_USER_NODE_ENV === 'production') {
      vueInstance.use(VueGtag, {
        config: { id: 'G-EQLM6VRFCB' },
      }, router);
    }

    if (import.meta.env.VITE_RECAPTCHA_TOKEN) {
      vueInstance.use(VueReCaptcha, {
        siteKey: import.meta.env.VITE_RECAPTCHA_TOKEN,
      });
    }

    // Root component
    vueInstance.mount('#app');
  }
});
