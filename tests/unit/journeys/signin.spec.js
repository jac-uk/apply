import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App';
import Router from 'vue-router';
import Vuex from 'vuex';

const id = 12345;
const routes = [
  // ['eligibility-checker', '/eligibility/'],
  // ['eligibility-pass', '/eligibility/eligibility-pass'],
  // ['eligibility-fail', '/eligibility/eligibility-fail'],
  ['task-list', `/apply/${id}/`],
  ['character-information', `/apply/${id}/character-information`],
  ['equality-and-diversity-survey', `/apply/${id}/equality-and-diversity-survey`],
  ['pre-application-judicial-education', `/apply/${id}/pre-application-judicial-education`],
  ['personal-details', `/apply/${id}/personal-details`],
  ['assessors-details', `/apply/${id}/assessors-details`],
  ['self-assessment-competencies', `/apply/${id}/self-assessment-competencies`],
  ['review', `/apply/${id}/review`],
  ['judicial-experience', `/apply/${id}/judicial-experience`],
  ['post-qualification-work-experience', `/apply/${id}/post-qualification-work-experience`],
  ['relevant-qualifications', `/apply/${id}/relevant-qualifications`],
  ['part-time-working-preferences', `/apply/${id}/part-time-working-preferences`],
  ['leadership-statement-of-suitability', `/apply/${id}/leadership-statement-of-suitability`],
  ['statement-of-suitability', `/apply/${id}/statement-of-suitability`],
  ['confirmation', `/apply/${id}/confirmation`],
];

describe('Sign in journey', () => {
  let subject;
  let router;
  let store;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Router);
    localVue.use(Vuex);

    router = require('@/router').default;
    store = require('@/store').default;
    window.scrollTo = () => {};
    subject = shallowMount(App, {
      localVue,
      router,
      store,
    });
  });

  const user = {
    uid: 'abc123',
    email: 'user@judicialappointments.digital',
  };

  describe('for unauthenticated user', () => {
    describe('when they visit page sign in', () => {
      it('loads sign in page', () => {
        router.push({ name: 'sign-in' });
        expect(subject.vm.$route.path).toBe('/sign-in');
      });
    });

    describe.each(routes)('when they visit page %s', (routeName) => {
      it('loads sign in page',() => {
        router.push({ name: routeName, params: { id } });
        expect(subject.vm.$route.path).toBe('/sign-in');
      });
    });
  });

  describe('for authenticated user', () => {
    beforeEach(() => {
      store.dispatch('setCurrentUser', user);
    });

    describe.each(routes)('when they visit page %s', (routeName, routePath) => {
      it(`loads ${routePath}`,() => {
        router.push({ name: routeName, params: { id } });
        expect(subject.vm.$route.path).toBe(routePath);
      });
    });
  });
});
