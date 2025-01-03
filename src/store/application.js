import { collection, doc, addDoc, getDocs, updateDoc, serverTimestamp, where, limit, query, runTransaction } from '@firebase/firestore';
import { firestore } from '@/firebase';
import { firestoreAction } from '@/helpers/vuexfireJAC';
import { getIPAddress, getBrowserInfo } from '@/helpers/browser';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import clone from 'clone';
import { LANGUAGES } from '@/helpers/constants';

const collectionName = 'applications';
const collectionRef = collection(firestore, collectionName);

export default {
  namespaced: true,
  actions: {
    bind: async ({ rootState, dispatch }, id) => {
      if (id) {
        return dispatch('bindRef', doc(collectionRef, id));
      } else {
        const snapshotRef = query(
          collectionRef,
          where('userId', '==', rootState.auth.currentUser.uid),
          where('exerciseId', '==', rootState.vacancy.record.id),
          limit(1)
        );
        const docSnap = await getDocs(snapshotRef);
        if (!docSnap.empty) {
          return dispatch('bindRef', doc(collectionRef, docSnap.docs[0].id)); // @todo refine this!
        } else {
          return dispatch('unbind');
        }
      }
    },
    bindRef: firestoreAction(({ bindFirestoreRef }, firestoreRef) => {
      return bindFirestoreRef('record', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('record');
    }),
    setLanguage: ({ commit }, language) => {
      commit('setLanguage', language);
    },
    save: async ({ rootState, state, dispatch }, data) => {
      if (state.record) {
        const ref = doc(collectionRef, state.record.id);
        await updateDoc(ref, data);
      } else {
        const newDoc = data;
        newDoc.userId = rootState.auth.currentUser.uid;
        newDoc.exerciseId = rootState.vacancy.record.id;
        newDoc.exerciseName = rootState.vacancy.record.name;
        newDoc.exerciseRef = rootState.vacancy.record.referenceNumber;
        newDoc.createdAt = serverTimestamp();
        const ref = await addDoc(collectionRef, newDoc);
        dispatch('bind', ref.id);
      }
    },
    submit: async ({ state, dispatch }) => {
      if (state.record) {
        if (state.record.referenceNumber) {
          const data = {
            status: 'applied',
            appliedAt: serverTimestamp(),
            [`_submittedLog.${state.record._processing.stage}`]: serverTimestamp(),
          };

          // check if application was made in Welsh
          if (state.language) {
            data['_language'] = state.language;
          }

          // update browser info
          const browserInfo = getBrowserInfo();
          data.client = {
            ip: await getIPAddress(),
            ...browserInfo,
          };

          await dispatch('save', data);
          return;
        }

        const vacancyMetaRef = doc(firestore, `vacancies/${state.record.exerciseId}/meta/stats`);
        const vacancyReferenceNumber = state.record.exerciseRef;
        const applicationRef = doc(firestore, `applications/${state.record.id}`);

        return runTransaction(firestore, async transaction => {
          const doc = await transaction.get(vacancyMetaRef);
          let newApplicationsCount = 1;

          if (doc.exists()) {
            newApplicationsCount = doc.data().applicationsCount + 1;
          }
          const characters = 'abcdefghijklmnopqrstuvwxyz';
          let randomCharacters = '';
          for (let i = 0, len = 3; i < len; i++) {
            randomCharacters += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          const applicationReferenceNumber = `${vacancyReferenceNumber  }-${  randomCharacters  }${(10000 + newApplicationsCount).toString().substr(1)}`;

          transaction
            .set(vacancyMetaRef, {
              applicationsCount: newApplicationsCount,
            }, { merge: true })
            .update(applicationRef, {
              status: 'applied',
              referenceNumber: applicationReferenceNumber,
              appliedAt: serverTimestamp(),
            });

          return applicationReferenceNumber;
        });
      }
    },
  },
  mutations: {
    set(state, { name, value }) {
      state[name] = value;
    },
    setLanguage(state, language) {
      state.language = language;
    },
  },
  state: {
    language: LANGUAGES.ENGLISH,
    record: null,
  },
  getters: {
    data: (state) => (objectToPopulate) => {
      const data = clone(state.record);
      if (objectToPopulate) {
        Object.keys(objectToPopulate).forEach(key => {
          if (data[key] !== undefined) {
            objectToPopulate[key] = data[key];
          }
        });
        return objectToPopulate;
      } else {
        return data;
      }
    },
    getExtendedDate(state) {
      if (state.record && state.record.dateExtension) {
        return state.record.dateExtension;
      } else {
        return;
      }
    },
  },
};

