// import firebase from '@firebase/app';
import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import clone from 'clone';

const collection = firestore.collection('invitations');

export default {
  namespaced: true,
  state: {
    records: [],
  },
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootState }) => {
      if (rootState.auth.currentUser){
        const firestoreRef = collection.where('candidate.email', '==', rootState.auth.currentUser.email);
        return bindFirestoreRef('records', firestoreRef, { serialize: vuexfireSerialize });
      }
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('records');
    }),
  },
  getters: {
    data: (state) => () => {
      return clone(state.records);
    },
  },
};
