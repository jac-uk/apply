import firebase from '@firebase/app';
import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootState }, formId) => {
      const id = rootState.auth.currentUser.uid;
      const firestoreRef = firestore.doc(`candidateForms/${formId}/responses/${id}`);
      return bindFirestoreRef('record', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('record');
    }),
    update: async ({ rootState, state }, data) => {
      const ref = firestore.doc(`candidateForms/${state.record.formId}/responses/${rootState.auth.currentUser.uid}`);
      data.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();
      await ref.update(data);
    },    
  },
  mutations: {
    set(state, { name, value }) {
      state[name] = value;
    },
  },
  state: {
    record: null,
  },
};
