import Vue from 'vue';
import App from '@/App.vue';
import { auth } from '@/firebase';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

if (process.env.NODE_ENV !== 'development') {
  // Don't use Sentry in development
  // We want to see Vue & JS errors in the local developer console rather than being silently rerouted to Sentry
  // Related GitHub issues: https://github.com/getsentry/sentry-javascript/issues/1416 https://github.com/vuejs/vue/issues/8433
  const sentry = require('@/sentry');
  sentry.initSentry();
}

// Initialise the Vue app once Firebase Auth has initialised
// The Vue app depends on the user's auth state to load the correct view (i.e. an authenticated view or the login view)
// We only want to initialise Vue once, so we assign it to `vueInstance` and do nothing on subsequent calls
let vueInstance = false;
auth().onAuthStateChanged((user) => {
  // Bind Firebase auth state to the vuex auth state store
  store.dispatch('setCurrentUser', user);

  // Create the Vue instance, but only once
  if (!vueInstance) {
    vueInstance = new Vue({
      el: '#app',
      render: h => h(App),
      router,
      store,
    });
  }
});
