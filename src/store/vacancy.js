import { collection, doc } from '@firebase/firestore';
import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import _has from 'lodash/has';

const collectionName = 'vacancies';
const collectionRef = collection(firestore, collectionName);

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef }, id) => {
      const firestoreRef = doc(collectionRef, id);
      return bindFirestoreRef('record', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('record');
    }),
  },
  mutations: {
    set(state, { name, value }) {
      state[name] = value;
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
    ref: (state) => {
      if (state.record === null) return null;
      return state.record.referenceNumber;
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
      return new Date(state.record.applicationOpenDate);
    },
    getCloseDate: (state, getters, rootState, rootGetters) => {
      if (state.record === null) return null;
      const extendedDate = rootGetters['application/getExtendedDate'];
      const closeDate = extendedDate || state.record.applicationCloseDate;
      if (closeDate === null) return null;
      return new Date(closeDate);
    },
    enableApplyInWelsh: (state) => {
      // exclude some exercises on production
      const exclusiveReferenceNumbers = ['JAC00155', 'JAC00149'];
      return state.record ? state.record.welshPosts && !exclusiveReferenceNumbers.includes(state.record.referenceNumber) : false;
    },
    getSelectionDays: (state) => {
      if (state.record === null) return null;
      if (_has(state.record, 'selectionDays') && Array.isArray(state.record.selectionDays) && state.record.selectionDays.length > 0) {
        return state.record.selectionDays;
      }
      return null;
    },
  },
};
