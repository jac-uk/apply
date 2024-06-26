import { query, collection, doc, where, serverTimestamp, updateDoc } from '@firebase/firestore';
import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';

const collectionName = 'invitations';
const collectionRef = collection(firestore, collectionName);

export default {
  namespaced: true,
  state: {
    records: [],
  },
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootState }) => {
      if (rootState.auth.currentUser){
        const firestoreRef = query(collectionRef,
          where('candidate.email', '==', rootState.auth.currentUser.email),
          where('status', 'in', ['created', 'invited', 'accepted'])
        );

        return bindFirestoreRef('records', firestoreRef, { serialize: vuexfireSerialize });
      }
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('records');
    }),
    acceptInvitation: async (context, id) => {
      const ref = doc(collectionRef, id);
      const data = {
        'statusLog.accepted': serverTimestamp(),
        'status': 'accepted',
      };
      await updateDoc(ref, data);
    },
  },
  mutations: {
    set(state, { name, value }) {
      state[name] = value;
    },
  },
};
