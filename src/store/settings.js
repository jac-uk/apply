import { doc } from '@firebase/firestore';

const docRef = doc('settings/candidateSettings');

export default {
  namespaced: true,
  actions: {
    bind: async (context) => {
      const doc = await docRef.get();
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
  },
};
