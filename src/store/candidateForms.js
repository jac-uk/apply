import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';

const collection = firestore.collection('candidateForms');

export default {
  namespaced: true,
  state: {
    records: [],
  },
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootState }) => {
      const firestoreRef = collection
      .where('candidateIds', 'array-contains', rootState.auth.currentUser.uid)
      .where('status', '==', 'open');
      return bindFirestoreRef('records', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('records');
    }),
  },
  mutations: {
    set(state, { name, value }) {
      state[name] = value;
    },
  },
};
