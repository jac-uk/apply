import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App';
import Router from 'vue-router';
import Vuex from 'vuex';

const routes = [
  ['job-advert', 'Job Advert'],
  // ['eligibility-checker', 'Eligibility Checker'],
  // ['eligibility-pass', 'Eligibility Pass'],
  // ['eligibility-fail', 'Eligibility Fail'],
  ['task-list', 'Apply for a role task list'],
  ['character-information', 'Declare character information'],
  ['equality-and-diversity-survey', 'Take the equality and diversity survey'],
  ['pre-application-judicial-education', 'Pre-application judicial education'],
  ['personal-details', 'Add personal details'],
  ['assessors-details', 'Give independent assessors details'],
  ['self-assessment-competencies', 'Upload self-assessment competencies'],
  ['review', 'Review application'],
  ['judicial-experience', 'Add judicial experience'],
  ['post-qualification-work-experience', 'Add post-qualification work experience'],
  ['relevant-qualifications', 'Add relevant qualifications'],
  ['part-time-working-preferences', 'Set part-time working preferences'],
  ['leadership-statement-of-suitability', 'Statement of suitability'],
  ['statement-of-suitability', 'Statement of suitability'],
  ['confirmation', 'Confirmation'],
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

  const user = {
    uid: 'abc123',
    email: 'user@judicialappointments.digital',
  };

  describe('sign in', () => {
    beforeEach(() => {
      router.push({ name: 'sign-in' });
    });

    it('contains Sign In', () => {
      expect(document.title).toContain('Sign In');
    });

    it('contains Judicial Appointments Commission', () => {
      expect(document.title).toContain('Judicial Appointments Commission');
    });
  });

  describe.each(routes)('%s', (routeName, routeTitle) => {
    beforeEach(() => {
     store.dispatch('setCurrentUser', user);
     router.push({ name: routeName, params: { id: 123 } });
   });

    it(`contains ${routeTitle}`, () => {
      expect(document.title).toContain(routeTitle);
    });

    it('contains Judicial Appointments Commission', () => {
      expect(document.title).toContain('Judicial Appointments Commission');
    });
  });
});
