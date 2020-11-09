/**
 * Here we use Realtime Database to get server time offset
 */
import firebase from '@firebase/app';
import 'firebase/database';

const module = {
  namespaced: true,
  actions: {
    async load(context) {
      // We are calling both `once` and `on` here so that we wait for offset and respond to changes
      // TODO changing computer time does not get picked up by this...even if we call `.off()`. Possibly need to do a write first?
      const ref = firebase.database().ref('.info/serverTimeOffset');
      const snapshot = await ref.once('value');
      context.commit('setServerTimeOffset', snapshot.val());
      ref.on('value', (snapshot) => {
        context.commit('setServerTimeOffset', snapshot.val());
      });
    },
  },
  mutations: {
    setServerTimeOffset(state, offset) {
      state.serverTimeOffset = offset;
    },
  },
  state: {
    serverTimeOffset: 0,
  },
};

export default module;
