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
    save: async ({ state, getters }, data) => {
      // @TODO make sure QT is still open
      if (!state.record.statusLog.started || getters.timeLeft) {
        data.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();
        return await collection.doc(state.record.id).update(data);
      }
      return false;
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
    timeLeft: (state) => {
      if (
        state.record.statusLog.completed ||
        !state.record.statusLog.started
      ) {
        return false;
      }
      const minute = 60 * 1000;
      const duration = state.record.duration.testDurationAdjusted;
      const startTime = state.record.statusLog.started;
      const endTime = new Date(startTime.getTime() + duration * minute);
      if (endTime < Date.now()) {
        return false;
      }
      return (endTime - Date.now());
    },    
  },
};
