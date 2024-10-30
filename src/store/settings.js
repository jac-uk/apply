import { doc, getDoc } from '@firebase/firestore';
import { firestore } from '@/firebase';
import { DEFAULT_TWO_FACTOR_AUTHENTICATION_TIMEOUT_IN_DAYS } from '@/helpers/constants';

const docRef = doc(firestore, 'settings/candidateSettings');

export default {
  namespaced: true,
  actions: {
    bind: async (context) => {
      const doc = await getDoc(docRef);
      context.commit('set', doc.data());
    },
  },
  mutations: {
    set(state, data) {
      state.record = data;
    },
  },
  state: {
    record: null,
  },
  getters: {
    getCommissioners: (state) => {
      if (state.record === null) return null;
      return state.record.commissioners;
    },
    getActivityTimeoutSeconds: (state) => {
      if (state.record === null) return null;
      return state.record.activityTimeoutSec;
    },
    isTwoFactorAuthenticationEnabled: (state) => {
      return state?.record?.twoFactorAuthentication?.enabled || false;
    },
    getTwoFactorAuthenticationTimeoutDays: (state) => {
      return state?.record?.twoFactorAuthentication?.timeoutDays || DEFAULT_TWO_FACTOR_AUTHENTICATION_TIMEOUT_IN_DAYS;
    },
  },
};
