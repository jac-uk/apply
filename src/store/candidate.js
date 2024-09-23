import { collection, doc, setDoc, getDoc, serverTimestamp } from '@firebase/firestore';
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
      const docRef = doc(collectionRef,rootState.auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      // if candidate document has not been created correctly
      if (!docSnap.exists()) {
        dispatch('create', {
          created: serverTimestamp(),
        });
        dispatch('savePersonalDetails', {
          email: rootState.auth.currentUser.email,
        });
      }

      await bindFirestoreRef('personalDetails', doc(collectionRef, `${rootState.auth.currentUser.uid}/documents/personalDetails`), { serialize: vuexfireSerialize });
      await bindFirestoreRef('characterInformation', doc(collectionRef, `${rootState.auth.currentUser.uid}/documents/characterInformation`), { serialize: vuexfireSerialize });
      await bindFirestoreRef('equalityAndDiversitySurvey', doc(collectionRef, `${rootState.auth.currentUser.uid}/documents/equalityAndDiversitySurvey`), { serialize: vuexfireSerialize });
      await bindFirestoreRef('qualifications', doc(collectionRef, `${rootState.auth.currentUser.uid}/documents/qualifications`), { serialize: vuexfireSerialize });
      await bindFirestoreRef('postQualificationExperience', doc(collectionRef, `${rootState.auth.currentUser.uid}/documents/postQualificationExperience`), { serialize: vuexfireSerialize });
      return;
    }),
    unbind: firestoreAction(async ({ unbindFirestoreRef }) => {
      await unbindFirestoreRef('personalDetails');
      await unbindFirestoreRef('characterInformation');
      await unbindFirestoreRef('equalityAndDiversitySurvey');
      await unbindFirestoreRef('qualifications');
      await unbindFirestoreRef('postQualificationExperience');
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
    saveQualifications: async ({ rootState }, data) => {
      const ref = doc(collectionRef,`${rootState.auth.currentUser.uid}/documents/qualifications`);
      await setDoc(ref, data);
    },
    savePostQualificationExperience: async ({ rootState }, data) => {
      const ref = doc(collectionRef,`${rootState.auth.currentUser.uid}/documents/postQualificationExperience`);
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
    qualifications: null,
    postQualificationExperience: null,
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
    qualifications: (state) => () => {
      return clone(state.qualifications);
    },
    postQualificationExperience: (state) => () => {
      return clone(state.postQualificationExperience);
    },
  },
};
