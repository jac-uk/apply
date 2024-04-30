// customised Vuexfire firestoreAction to support Vuex 4
// ref: https://github.com/vuejs/vuefire/blob/v2/packages/vuexfire/src/firestore.ts
import { onSnapshot } from '@firebase/firestore';
const firestoreAction = (action) => {
  return function (context, payload) {
    const { state, commit } = context;

    const getUnsubscribeName = (name) => {
      return `unsubscribe${name[0].toUpperCase()}${name.slice(1)}`;
    };

    const handleError = ({ error, name, ref, context, payload }) => {
      // only print details if in develop environment
      if (context?.rootGetters?.isDevelop) {
        // eslint-disable-next-line no-console
        console.log('error code', error.code);
        // eslint-disable-next-line no-console
        console.log('error message', error.message);
        // eslint-disable-next-line no-console
        console.log('error stack', error.stack);
        // eslint-disable-next-line no-console
        console.log('state name:', name);
        // eslint-disable-next-line no-console
        console.log('ref', ref);
        // eslint-disable-next-line no-console
        console.log('context', context);
        // eslint-disable-next-line no-console
        console.log('payload', payload);
      }
    };

    const unbindFirestoreRef = (name) => {
      const unsubscribe = state[getUnsubscribeName(name)];
      if (unsubscribe) {
        unsubscribe();
        // clear state
        commit('set', { name, value: Array.isArray(state[name]) ? [] : null });
        commit('set', { name: getUnsubscribeName(name), value: null });
      }
    };

    const bindFirestoreRef = (name, ref, options) => {
      // unbind if ref is already bound
      unbindFirestoreRef(name);

      return new Promise((resolve) => {
        let unsubscribe = null;
        if (ref.type === 'query' || ref.type === 'collection') {
          // bind collection
          unsubscribe = onSnapshot(ref, {
              next: (snapshot) => {
                const records = [];
                snapshot.forEach(doc => {
                  const data = options && options.serialize ? options.serialize(doc) : doc.data();
                  records.push(data);
                });
                commit('set', { name, value: records });
                resolve(records);
              },
              error: (error) => handleError({ error, name, ref, context, payload }),
            });

          // unsubscribe = ref.onSnapshot(ref => {
          //   const records = [];
          //   ref.forEach(doc => {
          //     const data = options && options.serialize ? options.serialize(doc) : doc.data();
          //     records.push(data);
          //   });
          //   commit('set', { name, value: records });
          //   resolve(records);
          // });
        } else {
          // bind document
          unsubscribe = onSnapshot(ref, {
            next: (snap) => {
              let record = null;
              if (snap.exists()) {
                record = options && options.serialize ? options.serialize(snap) : snap.data();
                commit('set', { name, value: record });
              }
              resolve(record);
            },
            error: (error) => handleError({ error, name, ref, context, payload }),
          });

          // unsubscribe = ref.onSnapshot(snap => {
          //   let record = null;
          //   if (snap.exists) {
          //     record = options && options.serialize ? options.serialize(snap) : snap.data();
          //     commit('set', { name, value: record });
          //   }
          //   resolve(record);
          // });
        }
        commit('set', { name: getUnsubscribeName(name), value: unsubscribe });
      });
    };

    return action.call(this, { ...context, bindFirestoreRef, unbindFirestoreRef }, payload);
  };
};

export { firestoreAction };
