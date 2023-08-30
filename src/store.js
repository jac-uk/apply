import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// Vuex modules
import auth from '@/store/auth';
import vacancies from '@/store/vacancies';
import vacancy from '@/store/vacancy';
import candidate from '@/store/candidate';
import invitations from '@/store/invitations';
import applications from '@/store/applications';
import application from '@/store/application';
import qualifyingTestResponse from '@/store/qualifyingTestResponse';
import qualifyingTestResponses from '@/store/qualifyingTestResponses';
import logs from '@/store/logs';
import connectionMonitor from '@/store/connectionMonitor';
import session from '@/store/session';

const store = new Vuex.Store({
  // Don't use strict mode in production for performance reasons (https://vuex.vuejs.org/guide/strict.html)
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    vacancies,
    vacancy,
    candidate,
    invitations,
    applications,
    application,
    qualifyingTestResponse,
    qualifyingTestResponses,
    logs,
    connectionMonitor,
    session,
  },
  state: {
    packageVersion: process.env.PACKAGE_VERSION || '0',
    env: process.env.NODE_ENV,
  },
  mutations: {},
  actions: {},
  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
    appEnvironment: () => {
      const projectId = process.env.VUE_APP_FIREBASE_PROJECT_ID;
      if (projectId.indexOf('-develop') >= 0) {
        return 'DEVELOP';
      }
      if (projectId.indexOf('-staging') >= 0) {
        return 'STAGING';
      }
      if (projectId.indexOf('-production') >= 0) {
        return 'PRODUCTION';
      }
      return '';
    },
    isProduction: (state, getters) => {
      return getters.appEnvironment === 'PRODUCTION';
    },
    whichEnv: (state) => {
      return state.env;
    },
  },
});

export default store;
