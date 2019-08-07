const module = {
  state: {
    applyPages: [
      {
        title: 'Introduction',
        path: '/apply',
      },
      {
        title: 'Citizenship',
        path: '/apply/citizenship',
      },
      {
        title: 'Personal Details',
        path: '/apply/personal',
      },
      {
        title: 'Qualifications',
        path: '/apply/qualifications',
      },
      {
        title: 'Experience',
        path: '/apply/experience',
      },
      {
        title: 'Self Assessment',
        path: '/apply/self-assessment',
      },
      {
        title: 'Assessors',
        path: '/apply/assessors',
      },
      {
        title: 'Character',
        path: '/apply/character',
      },
      {
        title: 'Preferences',
        path: '/apply/preferences',
      },
      {
        title: 'Declarations',
        path: '/apply/declarations',
      },
      {
        title: 'Diversity',
        path: '/apply/diversity',
      },
      {
        title: 'Outreach',
        path: '/apply/outreach',
      },
      {
        title: 'Review and Submit',
        path: '/apply/review',
      },
      {
        title: 'Submitted',
        path: '/apply/submitted',
      },
    ],
    currentPage: undefined,
  },
  mutations: {
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
  actions: {
    setCurrentPagePath({ commit, state }, path) {
      const currentPage = state.applyPages.find((page) => {
        return page.path === path;
      });
      commit('setCurrentPage', currentPage);
    },
  },
  getters: {
    applyPages: state => {
      return state.applyPages;
    },
    nextPagePath: state => {
      const currentIndex = state.applyPages.indexOf(state.currentPage);
      const nextIndex = currentIndex + 1;

      if (currentIndex !== -1 && state.applyPages[nextIndex]) {
        return state.applyPages[nextIndex].path;
      } else {
        return null;
      }
    },
  },
};

export default module;
