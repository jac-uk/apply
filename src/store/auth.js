import { httpsCallable } from '@firebase/functions';
import { functions } from '@/firebase';
import clone from 'clone';

const module = {
  namespaced: true,
  state: {
    currentUser: null,
    emailVerified: false,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setEmailVerified(state, value) {
      state.emailVerified = value;
    },
  },
  actions: {
    setCurrentUser: async ({ commit, rootGetters, dispatch }, user) => {
      if (user === null) {
        commit('setCurrentUser', null);
        commit('setEmailVerified', false);
      } else {
        commit('setCurrentUser', {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
        });
        commit('setEmailVerified', user.emailVerified);

        // Get the candidate so we can detect if signup is complete
        const personalDetails = rootGetters['candidate/personalDetails']();

        if (personalDetails === null) {
          await dispatch('candidate/bind', null, { root: true });
        }

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
  },
  getters: {
    isSignedIn(state) {
      return (state.currentUser !== null);
    },
    isEmailVerified(state) {
      return clone(state.emailVerified);
    },
    currentUser(state) {
      return clone(state.currentUser);
    },
  },
};

export default module;
