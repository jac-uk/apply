import { collection, doc, setDoc, serverTimestamp } from '@firebase/firestore';
import { firestore } from '@/firebase';

const collectionName = 'logs';

export default {
  namespaced: true,
  actions: {
    save: async (context, obj) => {
      if (!obj || !obj.type || !obj.id || !obj.data) return;
      // get subcollection reference
      const collectionRef = collection(firestore, collectionName, obj.type, obj.id);
      const ref = doc(collectionRef);
      await setDoc(ref, {
        data: obj.data,
        type: obj.type,
        date: serverTimestamp(),
      });
    },
  },
};
