import { serverTimestamp, doc, collection, updateDoc } from '@firebase/firestore';
import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import { CANDIDATE_FORM_RESPONSE_STATUS } from '@/helpers/constants';
import clone from 'clone';

const collectionName = 'candidateForms';
const collectionRef = collection(firestore, collectionName);

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootState }, formId) => {
      const id = rootState.auth.currentUser.uid;
      const firestoreRef = doc(collectionRef, `${formId}/responses/${id}`);
      return bindFirestoreRef('record', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('record');
    }),
    update: async ({ rootState, state }, data) => {
      const ref = doc(collectionRef,`${state.record.formId}/responses/${rootState.auth.currentUser.uid}`);
      data.lastUpdated = serverTimestamp();
      await updateDoc(ref, data);
    },
    submit: async ({ rootState, state }) => {
      const ref = doc(collectionRef, `${state.record.formId}/responses/${rootState.auth.currentUser.uid}`);
      const saveData = {};
      saveData.status = CANDIDATE_FORM_RESPONSE_STATUS.COMPLETED;
      saveData[`statusLog.${CANDIDATE_FORM_RESPONSE_STATUS.COMPLETED}`] = serverTimestamp();
      await updateDoc(ref, saveData);
    },
  },
  mutations: {
    set(state, { name, value }) {
      state[name] = value;
    },
  },
  state: {
    record: null,
  },
  getters: {
    data: (state) => () => {
      if (!state.record) return {};
      const data = clone(state.record);
      return data;
    },
  },
};
