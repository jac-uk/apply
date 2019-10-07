import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import JobAdvert from '@/views/JobAdvert';
import SignIn from '@/views/SignIn';
import EligibilityChecker from '@/views/EligibilityChecker';
import EligibilityPass from '@/views/EligibilityPass';
import EligibilityFail from '@/views/EligibilityFail';
import PersonalDetails from '@/views/PersonalDetails';
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
    {
      path: '/eligibility-checker',
      name: 'eligibility-checker',
      component: EligibilityChecker,
      meta: {
        requiresAuth: true,
        title: 'Eligibility Checker',
      },
    },
    {
      path: '/eligibility-pass',
      name: 'eligibility-pass',
      component: EligibilityPass,
      meta: {
        requiresAuth: true,
        title: 'Eligibility Pass',
      },
    },
    {
      path: '/eligibility-fail',
      name: 'eligibility-fail',
      component: EligibilityFail,
      meta: {
        requiresAuth: true,
        title: 'Eligibility Fail',
      },
    },
    {
      path: '/personal-details',
      name: 'personal-details',
      component: PersonalDetails,
      meta: {
        requiresAuth: true,
        title: 'Personal Details',
      },
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
