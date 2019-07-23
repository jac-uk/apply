import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import store from '@/store';

const initSentry = () => {
  Sentry.init({
    dsn: 'https://2366ef9baa1a49bb8aa29c5262757de9@sentry.io/1499367',
    environment: process.env.NODE_ENV,
    integrations: [new Integrations.Vue({Vue, attachProps: true})],
  });
  setUserScope();
};

const setUserScope = () => {
  Sentry.configureScope((scope) => {
    scope.setUser({
      id: store.getters.currentUserId,
      email: store.getters.currentUserEmail,
    });
  });
};

// Update the Sentry user scope when the current user changes in the Vuex store
store.watch((state, getters) => (getters.currentUserId), setUserScope);

export {initSentry};
