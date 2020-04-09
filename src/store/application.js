import firebase from '@firebase/app';
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
        .where('exerciseId', '==', rootState.vacancy.record.id)
        .limit(1).get();
        if (!snapshotRef.empty) {
          return dispatch('bindRef', collection.doc(snapshotRef.docs[0].id)); // @todo refine this!
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
    save: async ({ rootState, state, dispatch }, data) => {
      if (state.record) {
        const ref = collection.doc(state.record.id);
        await ref.set(data, { merge: true });  
      } else {
        const newDoc = data;
        newDoc.userId = rootState.auth.currentUser.uid;
        newDoc.exerciseId = rootState.vacancy.record.id;
        newDoc.exerciseName = rootState.vacancy.record.name;
        newDoc.exerciseRef = rootState.vacancy.record.referenceNumber;
        const ref = await collection.add(newDoc);
        dispatch('bind', ref.id);
      }
    },
    submit: async ({ state, dispatch }) => {
      if (state.record) {
        if (state.record.referenceNumber) {
          const data = {
            status: 'applied',
            appliedAt: firebase.firestore.FieldValue.serverTimestamp(),
          };
          await dispatch('save', data);
          return;
        }

        const vacancyMetaRef = firestore.doc(`vacancies/${state.record.exerciseId}/meta/stats`);
        const vacancyReferenceNumber = state.record.exerciseRef;
        const applicationRef = firestore.doc(`applications/${state.record.id}`);

        return firestore.runTransaction(async transaction => {
          const doc = await transaction.get(vacancyMetaRef);
          let newApplicationsCount = 1;

          if (doc.exists) {
            newApplicationsCount = doc.data().applicationsCount + 1;
          }
          const characters = 'abcdefghijklmnopqrstuvwxyz';
          let randomCharacters = '';
          for (let i = 0, len = 3; i < len; i++) {
            randomCharacters += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          const applicationReferenceNumber = vacancyReferenceNumber + '-' + randomCharacters + (10000 + newApplicationsCount).toString().substr(1);

          transaction
            .set(vacancyMetaRef, {
              applicationsCount: newApplicationsCount,
            }, { merge: true })
            .update(applicationRef, {
              status: 'applied',
              referenceNumber: applicationReferenceNumber,
              appliedAt: firebase.firestore.FieldValue.serverTimestamp(),
            });

          return applicationReferenceNumber;
        });
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

