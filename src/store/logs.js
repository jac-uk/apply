import { collection, doc, serverTimestamp } from '@firebase/firestore';
import { firestore } from '@/firebase';

const collectionName = 'logs';
const collectionRef = collection(firestore, collectionName);

export default {
  namespaced: true,
  actions: {
    save: async (context, obj) => {
      const ref = doc(collectionRef, obj.type);
      // ref = ref.collection(obj.id).doc();
      ref.set(
          {
            data: obj.data,
            type: obj.type,
            date: serverTimestamp(),
          }
      );
    },
  },
};
