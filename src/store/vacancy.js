import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';

const collection = firestore.collection('vacancies');

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
  },
  state: {
    record: null,
  },
  getters: {
    id: (state) => {
      if (state.record === null) return null;
      return state.record.id;
    },
    isOpen: (state) => {
      if (state.record.applicationOpenDate && state.record.applicationCloseDate) {
        const today = new Date();
        const openDate = new Date(
          state.record.applicationOpenDate.getFullYear(),
          state.record.applicationOpenDate.getMonth(),
          state.record.applicationOpenDate.getDate(), 
          13,
          0,
          0
        );
        const closeDate = new Date(
          state.record.applicationCloseDate.getFullYear(),
          state.record.applicationCloseDate.getMonth(),
          state.record.applicationCloseDate.getDate(), 
          13,
          0,
          0
        );
        return today > openDate && today < closeDate;
      }
      return false;
    },
  },
};
