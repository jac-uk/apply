import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import clone from 'clone';

const collection = firestore.collection('candidates');

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootState }) => {
      const firestoreRef = collection.doc(rootState.auth.currentUser.uid);
      return bindFirestoreRef('record', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('record');
    }),
    save: async ({ rootState, state, dispatch }, data) => {
      const ref = collection.doc(rootState.auth.currentUser.uid);
      await ref.set(data);
      if (!state.record) {
        dispatch('bind', ref.id);
      }
    },
  },
  state: {
    record: null,
  },
  getters: {
    data: (state) => () => {
      return clone(state.record);
    },
  },
};

