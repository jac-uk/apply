import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import * as filters from '@/filters';
import { auth } from '@/firebase';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import VueGtag from 'vue-gtag';
import browserDetect from 'vue-browser-detect-plugin';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import VueDOMPurifyHTML from 'vue-dompurify-html';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    Vue,
    dsn: 'https://2366ef9baa1a49bb8aa29c5262757de9@sentry.io/1499367',
    environment: store.getters.appEnvironment.toLowerCase(),
    release: process.env.PACKAGE_VERSION,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
    ],
  });

  Vue.use(VueGtag, {
    config: { id: 'UA-153516887-1' },
  }, router);
}

Vue.config.productionTip = false;

Vue.use(browserDetect);
Vue.use(VueDOMPurifyHTML);

// Register global filters
Object.keys(filters)
  .forEach((filterName) => {
    Vue.filter(filterName, filters[filterName]);
  });

let vueInstance = false;
auth.onAuthStateChanged( (user) => {
  store.dispatch('auth/setCurrentUser', user);
  if (store.getters['auth/isSignedIn']) {
    const urlParams = new URLSearchParams(window.location.search);
    const nextPage = urlParams.get('nextPage');
    if (nextPage) router.push(nextPage);  
    else router.push('/vacancies');
  }
  
  if (!vueInstance) {
    vueInstance = new Vue({
      el: '#app',
      render: h => h(App),
      router,
      store,
    });
  }
});

if (process.env.VUE_APP_RECAPTCHA_TOKEN) {
  Vue.use(VueReCaptcha, {
    siteKey: process.env.VUE_APP_RECAPTCHA_TOKEN,
  });
}
