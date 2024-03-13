import { collection, doc, setDoc, serverTimestamp } from '@firebase/firestore';
import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import clone from 'clone';

const collectionName = 'candidates';
const collectionRef = collection(firestore, collectionName);

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(async ({ bindFirestoreRef, rootState, dispatch }) => {
      const doc = await doc(collectionRef,rootState.auth.currentUser.uid).get();
      // if candidate document has not been created correctly
      if (!doc.exists) {
        dispatch('create', {
          created: serverTimestamp(),
        });
        dispatch('savePersonalDetails', {
          email: rootState.auth.currentUser.email,
        });
      }

      await bindFirestoreRef('personalDetails', doc(collectionRef,(`${rootState.auth.currentUser.uid}/documents/personalDetails`), { serialize: vuexfireSerialize }));
      await bindFirestoreRef('characterInformation', doc(collectionRef,(`${rootState.auth.currentUser.uid}/documents/characterInformation`), { serialize: vuexfireSerialize }));
      await bindFirestoreRef('equalityAndDiversitySurvey', doc(collectionRef,(`${rootState.auth.currentUser.uid}/documents/equalityAndDiversitySurvey`), { serialize: vuexfireSerialize }));
      return;
    }),
    unbind: firestoreAction(async ({ unbindFirestoreRef }) => {
      await unbindFirestoreRef('personalDetails');
      await unbindFirestoreRef('characterInformation');
      await unbindFirestoreRef('equalityAndDiversitySurvey');
      return;
    }),
    create: async ({ rootState, dispatch }, data) => {
      const ref = doc(collectionRef,rootState.auth.currentUser.uid);
      await setDoc(ref, data);
      return dispatch('bind', ref.id);
    },
    savePersonalDetails: async ({ rootState }, data) => {
      const ref = doc(collectionRef,`${rootState.auth.currentUser.uid}/documents/personalDetails`);
      await setDoc(ref, data);
    },
    saveCharacterInformation: async ({ rootState }, data) => {
      const ref = doc(collectionRef,`${rootState.auth.currentUser.uid}/documents/characterInformation`);
      await setDoc(ref, data);
    },
    saveEqualityAndDiversitySurvey: async ({ rootState }, data) => {
      const ref = doc(collectionRef,`${rootState.auth.currentUser.uid}/documents/equalityAndDiversitySurvey`);
      await setDoc(ref, data);
    },
  },
  mutations: {
    set(state, { name, value }) {
      state[name] = value;
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

