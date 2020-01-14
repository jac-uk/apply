import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import '@/filters';
import { auth } from '@/firebase';
import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
  id: 'UA-153516887-1',
});
// import * as Sentry from '@sentry/browser';
// import * as Integrations from '@sentry/integrations';
//
// Sentry.init({
//   dsn: 'https://2366ef9baa1a49bb8aa29c5262757de9@sentry.io/1499367',
//   integrations: [new Integrations.Vue({ Vue, attachProps: true })],
// });
Vue.config.productionTip = false;

let vueInstance = false;
auth().onAuthStateChanged( (user) => {
  store.dispatch('auth/setCurrentUser', user);
  if (store.getters['auth/isSignedIn']) {
    if (store.getters['exercise/id']) {
      router.push(`/apply/${store.getters['exercise/id']}`);
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
