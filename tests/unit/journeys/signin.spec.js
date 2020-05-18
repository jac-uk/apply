// *error-four* Quite a different test base, couldnt manange to successfully integrate helpers
// couldnt tell how to add necessary logic to either 
// this file or ../helpers.js
import { createTestSubject } from '../helpers';
import App from '@/App';

const id = 12345;
const routes = [
  // ['eligibility-checker', '/eligibility/'],
  // ['eligibility-pass', '/eligibility/eligibility-pass'],
  // ['eligibility-fail', '/eligibility/eligibility-fail'],
  ['task-list', `/apply/${id}/`],
  ['apply-character-information', `/apply/${id}/apply-character-information`],
  ['equality-and-diversity-survey', `/apply/${id}/equality-and-diversity-survey`],
  ['pre-application-judicial-education', `/apply/${id}/pre-application-judicial-education`],
  ['apply-personal-details', `/apply/${id}/apply-personal-details`],
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

// How much of the code in here is boilerplate/can be extracted
// there seems to be a lot of specific code in here,
//  perhaps journeys shouldn't be in units

xdescribe('Sign in journey', () => {
  let wrapper;

  beforeEach(() => {
    window.scrollTo = () => {};
    wrapper = createTestSubject(App, {
      propsData: {},
      stubs: ['RouterView'],
    });
  });

  const user = {
    uid: 'abc123',
    email: 'user@judicialappointments.digital',
  };

  describe('for unauthenticated user', () => {
    describe('when they visit page sign in', () => {
      it('loads sign in page', () => {
        wrapper.vm.$router.push({ name: 'sign-in' });
        expect(wrapper.vm.$route.path).toBe('/sign-in');
      });
    });

    describe.each(routes)('when they visit page %s', (routeName) => {
      it('loads sign in page',() => {
        wrapper.vm.$router.push({ name: routeName, params: { id } });
        expect(wrapper.vm.$route.path).toBe('/sign-in');
      });
    });
  });

  describe('for authenticated user', () => {
    beforeEach(() => {
      wrapper.vm.$store.dispatch('auth/setCurrentUser', user);
    });

    describe.each(routes)('when they visit page %s', (routeName, routePath) => {
      it(`loads ${routePath}`,() => {
        wrapper.vm.$router.push({ name: routeName, params: { id } });
        expect(wrapper.vm.$route.path).toBe(routePath);
      });
    });
  });
});
