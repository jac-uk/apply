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
import candidateForms from '@/store/candidateForms';
import candidateForm from '@/store/candidateForm';
import candidateFormResponse from '@/store/candidateFormResponse';
import settings from '@/store/settings';

const store = createStore({
  // Don't use strict mode in production for performance reasons (https://vuex.vuejs.org/guide/strict.html)
  strict: import.meta.env.VITE_USER_NODE_ENV !== 'production',
  modules: {
    auth,
    vacancies,
    vacancy,
    candidate,
    invitations,
    applications,
    application,
    logs,
    candidateForms,
    candidateForm,
    candidateFormResponse,
    settings,
  },
  state: {
    packageVersion: import.meta.env.PACKAGE_VERSION || '0',
    env: import.meta.env.VITE_USER_NODE_ENV,
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
    isStaging: (state, getters) => {
      return getters.appEnvironment === 'STAGING';
    },
    isDevelop: (state, getters) => {
      return getters.appEnvironment === 'DEVELOP';
    },
    whichEnv: (state) => {
      return state.env;
    },
  },
});

export default store;
