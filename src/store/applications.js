import firebase from '@firebase/app';
import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootState, commit, getters }) => {
      const firestoreRef = firestore
        .collection('applications')
        .where('userId', '==', rootState.auth.currentUser.uid)
        .limit(200);  // @TODO enable paging
      return bindFirestoreRef('records', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('records');
    }),
    bindCandidateForms: async ({ getters, commit }, data) => {
      const candidateForms = getters.getCandidateForms;
      commit('setCandidateForms', candidateForms);
    },
  },
  mutations: {
    set(state, { name, value }) {
      state[name] = value;
    },
    setCandidateForms(state, candidateForms) {

      console.log('candidateForms:');
      console.log(candidateForms);

      const newRecords = [];
      for (let i=0; i<state.records.length; ++i) {
        const record = { ...state.records[i] };

        console.log(`record.exerciseId: ${record.exerciseId}`);

        const candidateForm = candidateForms.find(o => o.exercise.id === record.exerciseId);


        if (candidateForm) {

          console.log('MATCH');

          record.candidateForm = candidateForm;
        }
        newRecords.push(record);
      }
      state.records = newRecords;
    },
  },
  getters: {
    getCandidateForms: (state) => {
      return [
        {
          exercise: { id: '1qef6rsaSLvvsZHrJuw7' },
          task: 'candidateAvailability',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          openDate: '2023-11-16',
          closeDate: '2024-12-31',
          candidateIds: ['TmA0uGoFH9WzZqLuxJAvd6Q79i72', '123'],
          parts: {
            candidateAvailability: true,
            panellistConflicts: true,
            commissionerConflicts: true,
            characterChecks: true,
            reasonableAdjustments: true,
            workingPreferences: true,
            welshPosts: true,
          },
          panellists: [
            { id: 'hgZO2QEZ6pUJgF6CDxOp', fullName: 'Albert Brown' },
            { id: 'tlg9eeceWesWGGeU4t04', fullName: 'Jane Jones' },
          ]
        },
        {
          exercise: { id: 'B9NM1PGDaYBJxdZhhKcF' },
          task: 'candidateAvailability',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          openDate: '2023-11-16',
          closeDate: '2024-12-31',
          candidateIds: ['123'],
          parts: {
            candidateAvailability: true,
            panellistConflicts: true,
            commissionerConflicts: true,
            characterChecks: true,
          },
          panellists: [
            { id: 'tlg9eeceWesWGGeU4t04', fullName: 'Jane Jones' },
          ]
        },
      ];
    }
  },
  state: {
    records: [],
  },
};
