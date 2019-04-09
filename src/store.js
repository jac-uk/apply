import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/auth';
import applicant from '@/store/applicant';
import application from '@/store/application';
import navigation from '@/store/navigation';
import vacancy from '@/store/vacancy';

Vue.use(Vuex);

const store = new Vuex.Store({
  // Don't use strict mode in production for performance reasons (https://vuex.vuejs.org/guide/strict.html)
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    auth,
    applicant,
    application,
    navigation,
    vacancy,
  },

  state: {},
  mutations: {},
  actions: {},
  getters: {},
});

export default store;
