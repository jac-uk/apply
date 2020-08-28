import firebase from '@firebase/app';
import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import clone from 'clone';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';

const collection = firestore.collection('qualifyingTestResponses');

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef }, id) => {
      const firestoreRef = collection.doc(id);

      return bindFirestoreRef('record', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('record');
    }),
    save: async ({ state }, data) => {
      data.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();

      return await collection.doc(state.record.id).update(data);
    },
  },
  state: {
    record: null,
  },
  getters: {
    id: (state) => {
      if (state.record === null) return null;

      return state.record.id;
    },
    data: (state) => () => {
      return clone(state.record);
    },
    isOpen: (state) => {
      if (state.record.qualifyingTest.startDate && state.record.qualifyingTest.endDate) {
        const today = new Date();

        return today > state.record.qualifyingTest.startDate && today < state.record.qualifyingTest.endDate;
      }
      return false;
    },
  },
};
