import { doc, getDoc } from '@firebase/firestore';
import { firestore } from '@/firebase';

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
  },
};
