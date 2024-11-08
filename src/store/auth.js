import { httpsCallable } from '@firebase/functions';
import { functions } from '@/firebase';

const module = {
  namespaced: true,
  state: {
    currentUser: null,
    verificationModalOpen: false,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setVerificationModalOpen(state, open) {
      state.verificationModalOpen = open;
    },
  },
  actions: {
    setCurrentUser({ commit }, user) {
      if (user === null) {
        commit('setCurrentUser', null);
      } else {
        commit('setCurrentUser', {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
        });
      }
    },
    // eslint-disable-next-line no-empty-pattern
    async verifyRecaptcha({}, { token, score }) {
      try {
        const res = await httpsCallable(functions, 'verifyRecaptcha')({ token });
        if (res.data && res.data.success) {
          return res.data.score && res.data.score > score;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    setVerificationModalOpen({ commit }, open) {
      commit('setVerificationModalOpen', open);
    },
  },
  getters: {
    isSignedIn(state) {
      return (state.currentUser !== null);
    },
  },
};

export default module;
