import { createApp } from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import * as filters from '@/filters';
import { auth } from '@/firebase';
import * as Sentry from '@sentry/vue';
import VueGtag from 'vue-gtag';
import browserDetect from 'vue-browser-detect-plugin';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import VueDOMPurifyHTML from 'vue-dompurify-html';

import './styles/main.scss';

// Global event emitter (fix vue warn of deprecation INSTANCE_EVENT_EMITTER)
import mitt from 'mitt';
const emitter = mitt();

let vueInstance = false;
auth.onAuthStateChanged( (user) => {
  store.dispatch('auth/setCurrentUser', user);
  if (store.getters['auth/isSignedIn']) {
    if (store.getters['vacancy/id']) {
      // TODO check that we're not already on this page!
      const urlToGo = {
        name: 'task-list',
        params: { id: store.getters['vacancy/id'] },
      };
      const thePageIamIn = {
        name: router.currentRoute.value.name,
        params: router.currentRoute.value.params,
      };
      const isSamePage = urlToGo.name === thePageIamIn.name && urlToGo.params.id === thePageIamIn.params.id;
      if (!isSamePage) {
        router.push(urlToGo);
      } else {
        router.push('');
      }
    } else {
      // router.push('applications');
    }
  }

  // Create the Vue instance, but only once
  if (!vueInstance) {

    // Root instance
    vueInstance = createApp(App)
      .use(router)
      .use(store)
      .use(browserDetect)
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
