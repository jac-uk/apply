import store from '@/store';
import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/auth';
import applicant from '@/store/applicant';
import application from '@/store/application';
import vacancy from '@/store/vacancy';

jest.mock('vue', () => {
  return {
    use: jest.fn()
  };
});

jest.mock('vuex', () => {
  return {
    Store: jest.fn((config) => {
      return config;
    })
  };
});

describe('Vuex store', () => {
  it('has strict mode enabled', () => {
    expect(store.strict).toBe(true);
  });

  it('registers Vuex to the Vue instance', () => {
    expect(Vue.use).toHaveBeenCalledWith(Vuex);
  });

  it('creates a new Vuex Store', () => {
    expect(Vuex.Store).toHaveBeenCalled();
  });

  const modules = [
    ['auth', auth],
    ['applicant', applicant],
    ['application', application],
    ['vacancy', vacancy],
  ];
  it.each(modules)('registers module `%s`', (moduleName, module) => {
    expect(store.modules[moduleName]).toBe(module);
  });
});
