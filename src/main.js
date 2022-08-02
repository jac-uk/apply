import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import * as filters from '@/filters';
import { auth } from '@/firebase';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import VueGtag from 'vue-gtag';
import browserDetect from 'vue-browser-detect-plugin';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://2366ef9baa1a49bb8aa29c5262757de9@sentry.io/1499367',
    environment: store.getters.appEnvironment.toLowerCase(),
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  });

  Vue.use(VueGtag, {
    config: { id: 'UA-153516887-1' },
  }, router);
}

Vue.config.productionTip = false;

Vue.use(browserDetect);

// Register global filters
Object.keys(filters)
  .forEach((filterName) => {
    Vue.filter(filterName, filters[filterName]);
  });

let vueInstance = false;
auth().onAuthStateChanged( (user) => {
  store.dispatch('auth/setCurrentUser', user);
  if (store.getters['auth/isSignedIn']) {
    if (store.getters['vacancy/id']) {
      // TODO check that we're not already on this page!
      const urlToGo = {
        name: 'task-list',
        params: { id: store.getters['vacancy/id'] },
      };
      const thePageIamIn = {
        name: router.currentRoute.name,
        params: router.currentRoute.params,
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
  if (!vueInstance) {
    vueInstance = new Vue({
      el: '#app',
      render: h => h(App),
      router,
      store,
    });
  }
});
