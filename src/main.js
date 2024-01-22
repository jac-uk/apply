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
  store.dispatch('auth/setCurrentUser', user);
  if (store.getters['auth/isSignedIn']) {
    await store.dispatch('settings/bind');
    const urlParams = new URLSearchParams(window.location.search);
    const nextPage = urlParams.get('nextPage');
    if (nextPage) router.push(nextPage);  
    else router.push('/vacancies');
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
    if (import.meta.env.NODE_ENV !== 'development') {
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

      vueInstance.use(VueGtag, {
        config: { id: 'UA-153516887-1' },
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
