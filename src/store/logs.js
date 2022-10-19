import firebase from '@firebase/app';
import { firestore } from '@/firebase';

const collection = firestore.collection('logs');

export default {
  namespaced: true,
  actions: {
    save: async (context, obj) => {
      let ref = collection.doc(obj.type);
      ref = ref.collection(obj.id).doc();
      ref.set(
          {
            data: obj.data,
            type: obj.type,
            date: firebase.firestore.FieldValue.serverTimestamp(),
          }
      );
    },
  },
};
