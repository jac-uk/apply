import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
Vue.use(Vuex);

// Vuex modules
import auth from '@/store/auth';
import exercise from '@/store/exercise';
import candidate from '@/store/candidate';

const store = new Vuex.Store({
  // Don't use strict mode in production for performance reasons (https://vuex.vuejs.org/guide/strict.html)
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    exercise,
    candidate,
  },
  state: {},
  mutations: {
    ...vuexfireMutations,
  },
  actions: {},
  getters: {},
});

export default store;
