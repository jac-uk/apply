/**
 * Here we use Realtime Database to monitor user's connection
 */
import firebase from '@firebase/app';
import { auth } from '@/firebase';
import 'firebase/database';

let lastSessionPath = '';

export default {
  namespaced: true,
  actions: {
    start: async (context, ref) => {
      if (context.state.started) {
        return;
      }
      const userId = auth.currentUser.uid;
      const userStatusPath = `/${ref}/userStatus/${userId}`;
      const userStatusDatabaseRef = firebase.database().ref(userStatusPath);
      await firebase.database().ref('.info/connected').on('value', (snapshot) => {
        if (snapshot.val() == false) {
          return;
        }
        context.commit('setStarted', true);
        const sessionRef = userStatusDatabaseRef.push();
        lastSessionPath = `${userStatusPath}/${sessionRef.key}`;
        sessionRef.child('offline').onDisconnect().set(firebase.database.ServerValue.TIMESTAMP).then(() => {
          sessionRef.child('online').set(firebase.database.ServerValue.TIMESTAMP);
        });
      });
    },
    stop: async (context) => {
      context.commit('setStarted', false);
      if (lastSessionPath) {
        firebase.database().ref(lastSessionPath).child('offline').set(firebase.database.ServerValue.TIMESTAMP);
      }
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
