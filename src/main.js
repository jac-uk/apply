import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import { auth } from '@/firebase';
Vue.config.productionTip = false;

let vueInstance = false;
auth().onAuthStateChanged( (user) => {
  store.dispatch('setCurrentUser', user);
  if (!vueInstance) {
    vueInstance = new Vue({
      el: '#app',
      render: h => h(App),
      router,
      store,
    });
  }
});
