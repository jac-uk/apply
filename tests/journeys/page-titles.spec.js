import router from '@/router';
import store from '@/store';

const routes = [
  // ['eligibility-checker', 'Eligibility Checker'],
  // ['eligibility-pass', 'Eligibility Pass'],
  // ['eligibility-fail', 'Eligibility Fail'],
  ['vacancies', 'Vacancies'],
  ['task-list', 'Apply for a role task list'],
  ['apply-character-information', 'Character information'],
  ['equality-and-diversity-survey', 'Take the equality and diversity survey'],
  ['pre-application-judicial-education', 'Pre-application judicial education'],
  ['apply-personal-details', 'Personal details'],
  ['assessors-details', 'Give independent assessors details'],
  ['self-assessment-competencies', 'Self-assessment competencies'],
  ['review', 'Review application'],
  ['judicial-experience', 'Judicial experience'],
  ['post-qualification-work-experience', 'Post-qualification work experience'],
  ['relevant-qualifications', 'Relevant qualifications'],
  ['part-time-working-preferences', 'Part-time working preferences'],
  ['leadership-statement-of-suitability', 'Statement of suitability'],
  ['statement-of-suitability', 'Statement of suitability'],
  ['confirmation', 'Confirmation'],
];

describe('Page titles', () => {

  const pushSpy = jest.spyOn(router, 'push');
  const user = {
    uid: 'abc123',
    email: 'user@judicialappointments.digital',
  };
  
  describe('router', () => {
    beforeEach(() => {
      router.push({ name: 'sign-in' });
      store.dispatch('auth/setCurrentUser', user);
      pushSpy.mockClear();
    });
    
    it('wont push to same route', () => {
      router.push({ name: 'vacancies' });
      expect(document.title).toContain('Vacancies');
      expect(pushSpy).toHaveBeenCalledTimes(1);
      router.push({ name: 'vacancies' });
      expect(document.title).toContain('Vacancies');
    });    

  });

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
      store.dispatch('auth/setCurrentUser', user);
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
