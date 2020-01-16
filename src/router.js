import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import VueAnalytics from 'vue-analytics';

import SignIn from '@/views/SignIn';
import SignUp from '@/views/SignUp';

// Vacancies
// import Website from '@/Website/Home';

// Vacancies
import Vacancies from '@/views/Vacancies';
import Vacancy from '@/views/Vacancy';
import VacancyDetails from '@/views/Vacancy/VacancyDetails';
import VacancyMessage from '@/views/Vacancy/VacancyMessage';

//Eligibility
import Eligibility from '@/views/Eligibility/Eligibility';
import EligibilityPass from '@/views/Eligibility/EligibilityPass';
import EligibilityFail from '@/views/Eligibility/EligibilityFail';

// Applications
import Applications from '@/views/Applications';
import PersonalDetails from '@/views/PersonalDetails';
import CharacterInformation from '@/views/CharacterInformation';
import DiversityInformation from '@/views/DiversityInformation';

// Apply
import Apply from '@/views/Apply/Apply';
import TaskList from '@/views/Apply/TaskList';
import ApplyCharacterInformation from '@/views/Apply/AccountProfile/CharacterInformation';
import EqualityAndDiversitySurvey from '@/views/Apply/AccountProfile/EqualityAndDiversitySurvey';
import PAJE from '@/views/Apply/AccountProfile/PAJE';
import ApplyPersonalDetails from '@/views/Apply/AccountProfile/PersonalDetails';
import AssessorsDetails from '@/views/Apply/Assessments/AssessorsDetails';
import SelfAssessmentCompetencies from '@/views/Apply/Assessments/SelfAssessmentCompetencies';
import Review from '@/views/Apply/FinalCheck/Review';
import JudicialExperience from '@/views/Apply/QualificationsAndExperience/JudicialExperience';
import PostQualificationWorkExperience from '@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience';
import RelevantQualifications from '@/views/Apply/QualificationsAndExperience/RelevantQualifications';
import RelevantMemberships from '@/views/Apply/QualificationsAndExperience/RelevantMemberships';
import RelevantExperience from '@/views/Apply/QualificationsAndExperience/RelevantExperience';
import EmploymentGaps from '@/views/Apply/QualificationsAndExperience/EmploymentGaps';
import ReasonableLengthOfService from '@/views/Apply/QualificationsAndExperience/ReasonableLengthOfService';
import PartTimeWorkingPreferences from '@/views/Apply/WorkingPreferences/PartTimeWorkingPreferences';
import WelshPosts from '@/views/Apply/WorkingPreferences/WelshPosts';
import LeadershipSuitability from '@/views/Apply/Assessments/LeadershipSuitability';
import StatementOfSuitability from '@/views/Apply/Assessments/StatementOfSuitability';
import Confirmation from '@/views/Apply/Confirmation';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/vacancies',
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: Vacancies,
      meta: {
        title: 'Vacancies',
      },
    },
    {
      path: '/personal-details',
      name: 'personal-details',
      component: PersonalDetails,
      meta: {
        title: 'Personal details',
      },
    },
    {
      path: '/character-information',
      name: 'character-information',
      component: CharacterInformation,
      meta: {
        title: 'Character information',
      },
    },
    {
      path: '/diversity-information',
      name: 'diversity-information',
      component: DiversityInformation,
      meta: {
        title: 'Diversity information',
      },
    },
    {
      path: '/vacancy/:id',
      component: Vacancy,
      children: [
        {
          path: '',
          component: VacancyDetails,
          name: 'vacancy-details',
          meta: {
            title: 'Vacancy details',
          },
        },
        {
          path: 'message',
          component: VacancyMessage,
          name: 'vacancy-message',
          meta: {
            title: 'Vacancy message',
          },
        },
        {
          path: 'eligibility',
          component: Eligibility,
          name: 'eligibility',
          meta: {
            title: 'Eligibility Checker',
          },
        },
        {
          path: 'eligibility-pass',
          component: EligibilityPass,
          name: 'eligibility-pass',
          meta: {
            title: 'Eligibility Pass',
          },
        },
        {
          path: 'eligibility-fail',
          component: EligibilityFail,
          name: 'eligibility-fail',
          meta: {
            title: 'Eligibility Fail',
          },
        },
      ],
    },
    {
      path: '/applications',
      name: 'applications',
      component: Applications,
      meta: {
        title: 'Applications',
      },
    },
    // Apply for a role
    {
      path: '/apply/:id',
      component: Apply,
      children: [
      {
          path: '',
          component: TaskList,
          name: 'task-list',
          meta: {
            requiresAuth: true,
            title: 'Apply for a role task list',
          },
        },
        {
          path: 'character-information',
          component: ApplyCharacterInformation,
          name: 'apply-character-information',
          meta: {
            requiresAuth: true,
            title: 'Character information',
          },
        },
        {
          path: 'equality-and-diversity-survey',
          component: EqualityAndDiversitySurvey,
          name: 'equality-and-diversity-survey',
          meta: {
            requiresAuth: true,
            title: 'Take the equality and diversity survey',
          },
        },
        {
          path: 'pre-application-judicial-education',
          component: PAJE,
          name: 'pre-application-judicial-education',
          meta: {
            requiresAuth: true,
            title: 'Pre-application judicial education',
          },
        },
        {
          path: 'personal-details',
          component: ApplyPersonalDetails,
          name: 'apply-personal-details',
          meta: {
            requiresAuth: true,
            title: 'Personal details',
          },
        },
        {
          path: 'assessors-details',
          component: AssessorsDetails,
          name: 'assessors-details',
          meta: {
            requiresAuth: true,
            title: 'Give independent assessors details',
          },
        },
        {
          path: 'self-assessment-competencies',
          component: SelfAssessmentCompetencies,
          name: 'self-assessment-competencies',
          meta: {
            requiresAuth: true,
            title: 'Self-assessment competencies',
          },
        },
        {
          path: 'review',
          component: Review,
          name: 'review',
          meta: {
            requiresAuth: true,
            title: 'Review application',
          },
        },
        {
          path: 'judicial-experience',
          component: JudicialExperience,
          name: 'judicial-experience',
          meta: {
            requiresAuth: true,
            title: 'Judicial experience',
          },
        },
        {
          path: 'post-qualification-work-experience',
          component: PostQualificationWorkExperience,
          name: 'post-qualification-work-experience',
          meta: {
            requiresAuth: true,
            title: 'Post-qualification work experience',
          },
        },
        {
          path: 'relevant-qualifications',
          component: RelevantQualifications,
          name: 'relevant-qualifications',
          meta: {
            requiresAuth: true,
            title: 'Relevant qualifications',
          },
        },
        {
          path: 'relevant-memberships',
          component: RelevantMemberships,
          name: 'relevant-memberships',
          meta: {
            requiresAuth: true,
            title: 'Relevant memberships',
          },
        },
        {
          path: 'relevant-experience',
          component: RelevantExperience,
          name: 'relevant-experience',
          meta: {
            requiresAuth: true,
            title: 'Relevant experience',
          },
        },
        {
          path: 'employment-gaps',
          component: EmploymentGaps,
          name: 'employment-gaps',
          meta: {
            requiresAuth: true,
            title: 'Employment gaps',
          },
        },
        {
          path: 'reasonable-length-of-service',
          component: ReasonableLengthOfService,
          name: 'reasonable-length-of-service',
          meta: {
            requiresAuth: true,
            title: 'Reasonable length of service',
          },
        },
        {
          path: 'part-time-working-preferences',
          component: PartTimeWorkingPreferences,
          name: 'part-time-working-preferences',
          meta: {
            requiresAuth: true,
            title: 'Part-time working preferences',
          },
        },
        {
          path: 'welsh-posts',
          component: WelshPosts,
          name: 'welsh-posts',
          meta: {
            requiresAuth: true,
            title: 'Welsh posts',
          },
        },
        {
          path: 'leadership-statement-of-suitability',
          component: LeadershipSuitability,
          name: 'leadership-statement-of-suitability',
          meta: {
            requiresAuth: true,
            title: 'Statement of suitability',
          },
        },
        {
          path: 'statement-of-suitability',
          component: StatementOfSuitability,
          name: 'statement-of-suitability',
          meta: {
            requiresAuth: true,
            title: 'Statement of suitability',
          },
        },
        {
          path: 'confirmation',
          component: Confirmation,
          name: 'confirmation',
          meta: {
            requiresAuth: true,
            title: 'Confirmation',
          },
        },
      ],
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        title: 'Sign In',
      },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: {
        title: 'Create an account',
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

Vue.use(VueAnalytics, {
  id: 'UA-153516887-1',
  router,
});

// Global before guard to verify if a user can have access to other than sign-in pages.
// It redirects unauthorized users to a sign-in page.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const isSignedIn = store.getters['auth/isSignedIn'];
  if (requiresAuth && !isSignedIn) {
    // @todo Save destination so we can navigate there after sign-in
    return next({ name: 'sign-in' });
  } else {
    return next();
  }

});

// Global after hook to set an appropriate title for the page
router.afterEach((to) => {
  document.title = `${to.meta.title} | Judicial Appointments Commission`;
});

export default router;
