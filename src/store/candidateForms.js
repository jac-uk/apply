import firebase from '@firebase/app';
import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import tableQuery from '@jac-uk/jac-kit/components/Table/tableQuery';

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(async ({ bindFirestoreRef, rootState, state, commit }) => {
      //const now = firebase.firestore.FieldValue.serverTimestamp();
      const now = firebase.firestore.Timestamp.now();
      let firestoreRef = firestore
        .collection('candidateForms')
        .where('candidateIds', 'array-contains', rootState.auth.currentUser.uid);
        //.where('openDate', '<=', now);
        //.where('closeDate', '>=', now);
      //firestoreRef = await tableQuery(state.records, firestoreRef);

      // @TODO: MUST NOW FILTER THE RESULTS TO REMOVE THOSE THAT ARE: ('closeDate', '>=', now) AS CANNOT DO TWO OF THESE QUERIES ON DIFFERENT FIELDS!!
      // SEE: https://medium.com/antigua-mobile/querying-a-firestore-collection-with-multiple-inequality-filters-on-different-fields-85e4bb342ec7

      // @TODO: Add indexes for new tables to the epic/DP ticket!!

      if (firestoreRef) {
        return bindFirestoreRef('records', firestoreRef, { serialize: vuexfireSerialize });
      } else {
        commit('records', []);
      }
    }),

    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('records');
    }),
  },
  state: {
    records: [],
  },
  mutations: {
    set(state, { name, value }) {
      state[name] = value;
    },
    records(state, data) {
      state.records = data;
    },
  },
};
