import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

// Views
import Apply from '@/views/Apply';
import SignIn from '@/views/SignIn';
import VerifyEmail from '@/views/VerifyEmail';

// Form Sections
import Introduction from '@/views/Sections/Introduction/Edit';
import Citizenship from '@/views/Sections/Citizenship/Edit';
import Personal from '@/views/Sections/Personal/Edit';
import Qualifications from '@/views/Sections/Qualifications/Edit';
import Experience from '@/views/Sections/Experience/Edit';
import SelfAssessment from '@/views/Sections/SelfAssessment/Edit';
import Assessors from '@/views/Sections/Assessors/Edit';
import Character from '@/views/Sections/Character/Edit';
import Preferences from '@/views/Sections/Preferences/Edit';
import Declarations from '@/views/Sections/Declarations/Edit';
import Diversity from '@/views/Sections/Diversity/Edit';
import Outreach from '@/views/Sections/Outreach/Edit';
import Review from '@/views/Sections/Review/Edit';
import Submitted from '@/views/Sections/Submitted/Show';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/apply',
      component: Apply,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          component: Introduction,
        },
        {
          path: 'citizenship',
          component: Citizenship,
        },
        {
          path: 'personal',
          component: Personal,
        },
        {
          path: 'qualifications',
          component: Qualifications,
        },
        {
          path: 'experience',
          component: Experience,
        },
        {
          path: 'self-assessment',
          component: SelfAssessment,
        },
        {
          path: 'assessors',
          component: Assessors,
        },
        {
          path: 'character',
          component: Character,
        },
        {
          path: 'preferences',
          component: Preferences,
        },
        {
          path: 'declarations',
          component: Declarations,
        },
        {
          path: 'diversity',
          component: Diversity,
        },
        {
          path: 'outreach',
          component: Outreach,
        },
        {
          path: 'review',
          component: Review,
        },
        {
          path: 'submitted',
          component: Submitted,
        }
      ],
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: VerifyEmail,
      beforeEnter: (to, from, next) => {
        const isSignedIn = store.getters.isSignedIn;
        const isEmailVerified = store.getters.isEmailVerified;

        if (!isSignedIn) {
          // User must be logged in
          return next({name: 'sign-in',});
        }

        if (isEmailVerified) {
          // Email is already verified, skip this page
          return next('/');
        }

        return next();
      },
    },
    {
      path: '*',
      redirect: '/apply',
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0,};
    }
  },
});

/**
 * Verify User's Access
 *
 * - redirect to the sign in page if required
 * - show 'verify your email' page if required
 * - otherwise display the page
 */
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const isSignedIn = store.getters.isSignedIn;
  const isEmailVerified = store.getters.isEmailVerified;

  if (requiresAuth && !isSignedIn) {
    // User must be logged in
    return next({name: 'sign-in',});
  }

  if (requiresAuth && !isEmailVerified) {
    // User must verify their email address
    return next({name: 'verify-email',});
  }

  return next();
});

export default router;
