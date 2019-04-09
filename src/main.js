import Vue from 'vue';
import App from '@/App.vue';
import {auth} from '@/firebase';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

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
