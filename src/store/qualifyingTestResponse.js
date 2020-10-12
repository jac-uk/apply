import firebase from '@firebase/app';
import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import clone from 'clone';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import { QUALIFYING_TEST } from '@/helpers/constants';
import { helperTimeLeft } from '@/helpers/date';

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
    startTest: async (context) => {
      const data = {
        status: QUALIFYING_TEST.STATUS.STARTED,
        'statusLog.started': firebase.firestore.FieldValue.serverTimestamp(),
        'candidate.id': firebase.auth().currentUser.uid,
      };
      await context.dispatch('save', data);
    },
    outOfTime: async (context) => {
      const data = {
        status: QUALIFYING_TEST.STATUS.COMPLETED,
        'statusLog.completed': firebase.firestore.FieldValue.serverTimestamp(),
        'isOutOfTime': true,
      };
      await context.dispatch('save', data);
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
      return helperTimeLeft(state.record);
    },
    testInProgress: (state, getters) => {
      return state.record.status === QUALIFYING_TEST.STATUS.STARTED
        && getters.isOpen
        && getters.timeLeft;
    },
  },
};
