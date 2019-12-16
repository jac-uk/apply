import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
Vue.use(Vuex);

// Vuex modules
import auth from '@/store/auth';
import vacancies from '@/store/vacancies';
import exercise from '@/store/exercise';
import candidate from '@/store/candidate';
import applications from '@/store/applications';
import application from '@/store/application';

const store = new Vuex.Store({
  // Don't use strict mode in production for performance reasons (https://vuex.vuejs.org/guide/strict.html)
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    vacancies,
    exercise,
    candidate,
    applications,
    application,
  },
  state: {},
  mutations: {
    ...vuexfireMutations,
  },
  actions: {},
  getters: {},
});

export default store;
