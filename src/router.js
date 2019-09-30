import Vue from 'vue';
import Router from 'vue-router';

import JobAdvert from '@/views/JobAdvert';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/JobAdvert',
      name: 'job-advert',
      component: JobAdvert,
      meta: {
        title: 'Job Advert',
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
// Global after hook to set an appropriate title for the page
router.afterEach((to) => {
  document.title = `${to.meta.title} | Judicial Appointments Commission`;
});

export default router;
