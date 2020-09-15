import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';

const collection = firestore.collection('qualifyingTestResponses');

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootState }) => {
      const firestoreRef = collection.where('candidate.id', '==', rootState.auth.currentUser.uid).limit(100);

      return bindFirestoreRef('records', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('records');
    }),
    bindDryRuns: firestoreAction(({ bindFirestoreRef, rootState }) => {
      const firestoreRef = collection.where('candidate.email', '==', rootState.auth.currentUser.email).limit(100);

      return bindFirestoreRef('dryRuns', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbindDryRuns: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('dryRuns');
    }),
  },
  state: {
    records: [],
    dryRuns: [],
  },
};
