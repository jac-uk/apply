import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import JobAdvert from '@/views/JobAdvert';
import SignIn from '@/views/SignIn';

//Eligibility
// import Eligibility from '@/views/Eligibility/Eligibility';
// import EligibilityChecker from '@/views/Eligibility/EligibilityChecker';
// import EligibilityPass from '@/views/Eligibility/EligibilityPass';
// import EligibilityFail from '@/views/Eligibility/EligibilityFail';

// Apply
import Apply from '@/views/Apply/Apply';
import ApplyTaskList from '@/views/Apply/ApplyTaskList';
import CharacterInformation from '@/views/Apply/AccountProfile/CharacterInformation';
import EqualityAndDiversitySurvey from '@/views/Apply/AccountProfile/EqualityAndDiversitySurvey';
import PAJE from '@/views/Apply/AccountProfile/PAJE';
import PersonalDetails from '@/views/Apply/AccountProfile/PersonalDetails';
import AssessorsDetails from '@/views/Apply/Assessments/AssessorsDetails';
import SelfAssessmentCompetencies from '@/views/Apply/Assessments/SelfAssessmentCompetencies';
import Review from '@/views/Apply/FinalCheck/Review';
import JudicialExperience from '@/views/Apply/QualificationsAndExperience/JudicialExperience';
import PostQualificationWorkExperience from '@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience';
import RelevantQualifications from '@/views/Apply/QualificationsAndExperience/RelevantQualifications';
import PartTimeWorkingPreferences from '@/views/Apply/WorkingPreferences/PartTimeWorkingPreferences';

// other
import TaskList from '@/views/TaskList';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/job-advert',
    },
    {
      path: '/job-advert',
      name: 'job-advert',
      component: JobAdvert,
      meta: {
        requiresAuth: true,
        title: 'Job Advert',
      },
    },
    // {
    //   path: '/eligibility/',
    //   component: Eligibility,
    //   children: [
    //     {
    //       path: '',
    //       component: EligibilityChecker,
    //       name: 'eligibility-checker',
    //       meta: {
    //         title: 'Eligibility Checker',
    //       },
    //     },
    //     {
    //       path: 'eligibility-pass',
    //       component: EligibilityPass,
    //       name: 'eligibility-pass',
    //       meta: {
    //         title: 'Eligibility Pass',
    //       },
    //     },
    //     {
    //       path: 'eligibility-fail',
    //       component: EligibilityFail,
    //       name: 'eligibility-fail',
    //       meta: {
    //         title: 'Eligibility Fail',
    //       },
    //     },
    //   ],
    // },
    // Apply for a role
    {
      path: '/apply/',
      component: Apply,
      children: [
      {
          path: '',
          component: ApplyTaskList,
          name: 'apply-task-list',
          meta: {
            requiresAuth: true,
            title: 'Apply for a role task list',
          },
        },
        {
          path: 'character-information',
          component: CharacterInformation,
          name: 'character-information',
          meta: {
            requiresAuth: true,
            title: 'Declare character information',
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
          component: PersonalDetails,
          name: 'personal-details',
          meta: {
            requiresAuth: true,
            title: 'Add personal details',
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
            title: 'Upload self-assessment competencies',
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
            title: 'Add judicial experience',
          },
        },
        {
          path: 'post-qualification-work-experience',
          component: PostQualificationWorkExperience,
          name: 'post-qualification-work-experience',
          meta: {
            requiresAuth: true,
            title: 'Add post-qualification work experience',
          },
        },
        {
          path: 'relevant-qualifications',
          component: RelevantQualifications,
          name: 'relevant-qualifications',
          meta: {
            requiresAuth: true,
            title: 'Add relevant qualifications',
          },
        },
        {
          path: 'part-time-working-preferences',
          component: PartTimeWorkingPreferences,
          name: 'part-time-working-preferences',
          meta: {
            requiresAuth: true,
            title: 'Set part-time working preferences',
          },
        },
      ],
    },
    {
      path: '/task-list',
      name: 'task-list',
      component: TaskList,
      meta: {
        requiresAuth: true,
        title: 'Task List',
      },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        title: 'Sign In',
      },
      beforeEnter: (to, from, next) => {
        const isSignedIn = store.getters.isSignedIn;
        if(isSignedIn) {
          return next({ name: 'job-advert' });
        }

        return next();
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

// Global before guard to verify if a user can have access to other than sign-in pages.
// It redirects unauthorized users to a sign-in page.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const isSignedIn = store.getters.isSignedIn;

  if (requiresAuth && !isSignedIn) {
    return next({ name: 'sign-in' });
  }

  return next();
});

// Global after hook to set an appropriate title for the page
router.afterEach((to) => {
  document.title = `${to.meta.title} | Judicial Appointments Commission`;
});

export default router;
