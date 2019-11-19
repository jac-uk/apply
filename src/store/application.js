import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import clone from 'clone';

const collection = firestore.collection('applications');

export default {
  namespaced: true,
  actions: {
    bind: async ({ rootState, dispatch }, id) => {
      if (id) {
        return dispatch('bindRef', collection.doc(id));
      } else {
        const snapshotRef = await collection
        .where('userId', '==', rootState.auth.currentUser.uid)
        .where('exerciseId', '==', rootState.exercise.record.id)
        .limit(1).get();
        if (!snapshotRef.empty) {
          return dispatch('bindRef', collection.doc(snapshotRef.docs[0].id)); // @todo refine this!
        } else {
          // do nothing
        }
      }
    },
    bindRef: firestoreAction(({ bindFirestoreRef }, firestoreRef) => {
      return bindFirestoreRef('record', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('record');
    }),
    save: async ({ rootState, state, dispatch }, data) => {
      if (state.record) {
        const ref = collection.doc(state.record.id);
        await ref.set(data, { merge: true });  
      } else {
        const newDoc = data;
        newDoc.userId = rootState.auth.currentUser.uid;
        newDoc.exerciseId = rootState.exercise.record.id;
        const ref = await collection.add(newDoc);
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

