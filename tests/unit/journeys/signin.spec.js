import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App';
import Router from 'vue-router';
import Vuex from 'vuex';

const routes = [
  ['job-advert', '/job-advert'],
  // ['eligibility-checker', '/eligibility/'],
  // ['eligibility-pass', '/eligibility/eligibility-pass'],
  // ['eligibility-fail', '/eligibility/eligibility-fail'],
  ['task-list', '/apply/'],
  ['character-information', '/apply/character-information'],
  ['equality-and-diversity-survey', '/apply/equality-and-diversity-survey'],
  ['pre-application-judicial-education', '/apply/pre-application-judicial-education'],
  ['personal-details', '/apply/personal-details'],
  ['assessors-details', '/apply/assessors-details'],
  ['self-assessment-competencies', '/apply/self-assessment-competencies'],
  ['review', '/apply/review'],
  ['judicial-experience', '/apply/judicial-experience'],
  ['post-qualification-work-experience', '/apply/post-qualification-work-experience'],
  ['relevant-qualifications', '/apply/relevant-qualifications'],
  ['part-time-working-preferences', '/apply/part-time-working-preferences'],
  ['leadership-statement-of-suitability', '/apply/leadership-statement-of-suitability'],
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
        router.push({ name: routeName });
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
        router.push({ name: routeName });
        expect(subject.vm.$route.path).toBe(routePath);
      });
    });
  });
});
