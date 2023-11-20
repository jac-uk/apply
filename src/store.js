import { createStore } from 'vuex';

// Vuex modules
import auth from '@/store/auth';
import vacancies from '@/store/vacancies';
import vacancy from '@/store/vacancy';
import candidate from '@/store/candidate';
import invitations from '@/store/invitations';
import applications from '@/store/applications';
import application from '@/store/application';
import logs from '@/store/logs';
import session from '@/store/session';
import candidateForms from '@/store/candidateForms';

const store = createStore({
  // Don't use strict mode in production for performance reasons (https://vuex.vuejs.org/guide/strict.html)
  strict: import.meta.env.NODE_ENV !== 'production',
  modules: {
    auth,
    vacancies,
    vacancy,
    candidate,
    invitations,
    applications,
    application,
    logs,
    session,
    candidateForms,
  },
  state: {
    packageVersion: import.meta.env.PACKAGE_VERSION || '0',
    env: import.meta.env.NODE_ENV,
  },
  mutations: {},
  actions: {},
  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
    appEnvironment: () => {
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
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
