const module = {
  state: {
    currentUser: null,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    setCurrentUser({commit}, user) {
      if (user === null) {
        commit('setCurrentUser', null);
      } else {
        commit('setCurrentUser', {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        });
      }
    },
  },
  getters: {
    isSignedIn(state) {
      return (state.currentUser !== null);
    },
    currentUserId(state) {
      return (state.currentUser !== null) ? state.currentUser.uid : null;
    },
    isEmailVerified(state) {
      return (state.currentUser !== null) ? state.currentUser.emailVerified : false;
    },
    currentUserEmail(state) {
      return (state.currentUser !== null) ? state.currentUser.email : null;
    },
  },
};

export default module;
