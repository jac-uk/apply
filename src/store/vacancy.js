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
    isOpen: (state, getters) => () => {
      if (state.record.applicationOpenDate && state.record.applicationCloseDate) {
        const today = new Date();
        const openDate = getters.getOpenDate;
        const closeDate = getters.getCloseDate;

        return today > openDate && today < closeDate;
      }
      return false;
    },
    getOpenDate: (state) => {
      if (state.record === null) return null;
      if (state.record.applicationOpenDate === null) return null;
      return new Date(
        state.record.applicationOpenDate.getFullYear(),
        state.record.applicationOpenDate.getMonth(),
        state.record.applicationOpenDate.getDate(),
        13,
        0,
        0
      );
    },
    getCloseDate: (state) => {
      if (state.record === null) return null;
      if (state.record.applicationCloseDate === null) return null;
      return new Date(
        state.record.applicationCloseDate.getFullYear(),
        state.record.applicationCloseDate.getMonth(),
        state.record.applicationCloseDate.getDate(),
        13,
        0,
        0
      );
    },
    isLegal: (state) => {
      return state.record.typeOfExercise ==='legal' || state.record.typeOfExercise ==='leadership';
    },
  },
};
