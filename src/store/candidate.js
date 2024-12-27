import { collection, doc, setDoc, getDoc, serverTimestamp } from '@firebase/firestore';
import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import clone from 'clone';
import _has from 'lodash/has';

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
      await bindFirestoreRef('relevantQualifications', doc(collectionRef, `${rootState.auth.currentUser.uid}/documents/relevantQualifications`), { serialize: vuexfireSerialize });
      await bindFirestoreRef('postQualificationExperience', doc(collectionRef, `${rootState.auth.currentUser.uid}/documents/postQualificationExperience`), { serialize: vuexfireSerialize });

      await dispatch('checkRequiredFields');
      return;
    }),
    unbind: firestoreAction(async ({ unbindFirestoreRef }) => {
      await unbindFirestoreRef('personalDetails');
      await unbindFirestoreRef('characterInformation');
      await unbindFirestoreRef('equalityAndDiversitySurvey');
      await unbindFirestoreRef('relevantQualifications');
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
    saveRelevantQualifications: async ({ rootState }, data) => {
      const ref = doc(collectionRef,`${rootState.auth.currentUser.uid}/documents/relevantQualifications`);
      await setDoc(ref, data);
    },
    savePostQualificationExperience: async ({ rootState }, data) => {
      const ref = doc(collectionRef,`${rootState.auth.currentUser.uid}/documents/postQualificationExperience`);
      await setDoc(ref, data);
    },
    checkRequiredFields: async ({ state, commit }) => {
      const personalDetails = state.personalDetails;
      if (personalDetails) {
        // Check if required fields are filled
        const isComplete = Boolean(
          personalDetails.dateOfBirth &&
          personalDetails.email &&
          personalDetails.firstName &&
          personalDetails.lastName &&
          personalDetails.title
        );
        commit('set', { name: 'requiredFieldsComplete', value: isComplete });
      }
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
    relevantQualifications: null,
    postQualificationExperience: null,
    requiredFieldsComplete: false,    // Fields that ** MUST ** be completed in sign up
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
    relevantQualifications: (state) => () => {
      return clone(state.relevantQualifications);
    },
    postQualificationExperience: (state) => () => {
      return clone(state.postQualificationExperience);
    },
    requiredFieldsComplete: (state) => () => {
      return clone(state.requiredFieldsComplete);
    },
    exemptionCertificateFullPath: (getters) => {
      // Get the lastest exemption certificate (full path) in the list, if it exists
      const relevantQualifications = getters.relevantQualifications;
      if (relevantQualifications === null) return null;
      if (_has(relevantQualifications, 'uploadedExemptionCertificates') && Array.isArray(relevantQualifications.uploadedExemptionCertificates) && relevantQualifications.uploadedExemptionCertificates.length > 0) {
        return relevantQualifications.uploadedExemptionCertificates[relevantQualifications.uploadedExemptionCertificates.length - 1];
      }
      return null;
    },
    practicingCertificateFullPath: (getters) => {
      // Get the lastest practicing certificate (full path) in the list, if it exists
      const relevantQualifications = getters.relevantQualifications;
      if (relevantQualifications === null) return null;
      if (_has(relevantQualifications, 'uploadedPracticingCertificates') && Array.isArray(relevantQualifications.uploadedPracticingCertificates) && relevantQualifications.uploadedPracticingCertificates.length > 0) {
        return relevantQualifications.uploadedPracticingCertificates[relevantQualifications.uploadedPracticingCertificates.length - 1];
      }
      return null;
    },
  },
};
