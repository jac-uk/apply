import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App';
import Router from 'vue-router';
import Vuex from 'vuex';

const routes = [
  ['job-advert', 'Job Advert'],
];

describe('Page titles', () => {
  let router;
  let store;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Router);
    localVue.use(Vuex);

    router = require('@/router').default;
    store = require('@/store').default;
    window.scrollTo = () => {};
    shallowMount(App, {
      localVue,
      router,
      store,
    });
  });

  describe.each(routes)('%s', (routeName, routeTitle) => {
     beforeEach(() => {
      router.push({ name: routeName });
    });

    it(`contains ${routeTitle}`, () => {
      expect(document.title).toContain(routeTitle);
    });

    it('contains Judicial Appointments Commission', () => {
      expect(document.title).toContain('Judicial Appointments Commission');
    });
  });
});
