/**
 * Here we use Realtime Database to monitor user's connection
 */
import firebase from '@firebase/app';
import 'firebase/database';

export default {
  namespaced: true,
  actions: {
    start: async (context, ref) => {
      const userId = firebase.auth().currentUser.uid;
      const userStatusDatabaseRef = firebase.database().ref(`/${ref}/userStatus/${userId}`);
      const isOfflineForDatabase = {
        state: 'offline',
        lastUpdated: firebase.database.ServerValue.TIMESTAMP,
      };
      const isOnlineForDatabase = {
        state: 'online',
        lastUpdated: firebase.database.ServerValue.TIMESTAMP,
      };
      await firebase.database().ref('.info/connected').on('value', (snapshot) => {
        if (snapshot.val() == false) {
          return;
        }
        context.commit('setStarted', true);
        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
          userStatusDatabaseRef.set(isOnlineForDatabase);
        });
      });
    },
    stop: async (context) => {
      context.commit('setStarted', false);
      firebase.database().ref('.info/connected').off();
    },
  },
  mutations: {
    setStarted(state, started) {
      state.started = started;
    },
  },  
  state: {
    started: false,
  },
};
