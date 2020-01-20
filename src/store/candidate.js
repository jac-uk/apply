import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import clone from 'clone';

const collection = firestore.collection('candidates');

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(async ({ bindFirestoreRef, rootState }) => {
      await bindFirestoreRef('personalDetails', collection.doc(`${rootState.auth.currentUser.uid}/documents/personalDetails`), { serialize: vuexfireSerialize });
      await bindFirestoreRef('characterInformation', collection.doc(`${rootState.auth.currentUser.uid}/documents/characterInformation`), { serialize: vuexfireSerialize });
      await bindFirestoreRef('equalityAndDiversitySurvey', collection.doc(`${rootState.auth.currentUser.uid}/documents/equalityAndDiversitySurvey`), { serialize: vuexfireSerialize });
      return;
    }),
    unbind: firestoreAction(async ({ unbindFirestoreRef }) => {
      await unbindFirestoreRef('personalDetails');
      await unbindFirestoreRef('characterInformation');
      await unbindFirestoreRef('equalityAndDiversitySurvey');
      return;
    }),
    create: async ({ rootState, dispatch }, data) => {
      const ref = collection.doc(rootState.auth.currentUser.uid);
      await ref.set(data);
      return dispatch('bind', ref.id);
    },
    savePersonalDetails: async ({ rootState }, data) => {
      const ref = collection.doc(`${rootState.auth.currentUser.uid}/documents/personalDetails`);
      await ref.set(data);
    },
    saveCharacterInformation: async ({ rootState }, data) => {
      const ref = collection.doc(`${rootState.auth.currentUser.uid}/documents/characterInformation`);
      await ref.set(data);
    },
    saveEqualityAndDiversitySurvey: async ({ rootState }, data) => {
      const ref = collection.doc(`${rootState.auth.currentUser.uid}/documents/equalityAndDiversitySurvey`);
      await ref.set(data);
    },      
  },
  state: {
    personalDetails: null,
    characterInformation: null,
    equalityAndDiversitySurvey: null,
  },
  getters: {
    personalDetails: (state) => () => {
      return clone(state.personalDetails);
    },
    characterInformation: (state) => () => {
      return clone(state.characterInformation);
    },
    equalityAndDiversitySurvey: (state) => () => {
      return clone(state.equalityAndDiversitySurvey);
    },
  },
};

