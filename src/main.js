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

import './styles/main.scss';

// Global event emitter (fix vue warn of deprecation INSTANCE_EVENT_EMITTER)
import mitt from 'mitt';
const emitter = mitt();

let vueInstance = false;
auth.onAuthStateChanged( async (user) => {

  /* eslint-disable no-console */
  console.log('================ onAuthStateChanged ==================');
  console.log('-- oasc user:');
  console.log(user);
  console.log('-- oasc calling setCurrentUser');
  /* eslint-enable no-console */

  await store.dispatch('auth/setCurrentUser', user);

  const isSignedIn = store.getters['auth/isSignedIn'];
  const isEmailVerified = store.getters['auth/isEmailVerified'];
  const requiredFieldsComplete = store.getters['candidate/requiredFieldsComplete']();

  /* eslint-disable no-console */
  console.log(`-- oasc isSignedIn: ${isSignedIn}`);
  console.log(`-- oasc isEmailVerified: ${isEmailVerified}`);
  console.log(`-- oasc requiredFieldsComplete: ${requiredFieldsComplete}`);
  console.log('-- oasc personalDetails:');
  console.log(store.getters['candidate/personalDetails']());
  console.log('-- oasc router.currentRoute:');
  console.log(router.currentRoute.value);
  /* eslint-enable no-console */

  if (isSignedIn) {

    await store.dispatch('settings/bind');

    if (!isEmailVerified) {

      // eslint-disable-next-line no-console
      console.log('-- oasc redirecting to verify email request');

      router.replace({ name: 'verify-email-request' });
      //router.replace({ name: 'verify-email-request', params: { id: 123 }, query: { search: 'vue' } });
    }
    else if (!requiredFieldsComplete) {
        // eslint-disable-next-line no-console
        console.log('-- oasc redirecting to complete required fields');

        router.replace({ name: 'sign-up-step2' });
    }
    else {
      const urlParams = new URLSearchParams(window.location.search);
      const nextPage = urlParams.get('nextPage');
      if (nextPage) {
        // eslint-disable-next-line no-console
        console.log(`-- oasc redirecting to nextPage: ${nextPage}`);
        router.push(nextPage);
      }
      else {
        // eslint-disable-next-line no-console
        console.log('-- oasc redirecting to: vacancies');

        router.push('/vacancies');
      }
    }
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
          new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          }),
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
