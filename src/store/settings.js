import { doc, getDoc } from '@firebase/firestore';
import { firestore } from '@/firebase';
import { DEFAULT_TWO_FACTOR_AUTH_TIMEOUT_DAYS } from '@/helpers/constants';

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
    isTwoFactorAuthEnabled: (state) => {
      return state?.record?.twoFactorAuth?.enabled || false;
    },
    getTwoFactorAuthTimeoutDays: (state) => {
      return state?.record?.twoFactorAuth?.timeoutDays || DEFAULT_TWO_FACTOR_AUTH_TIMEOUT_DAYS;
    },
  },
};
