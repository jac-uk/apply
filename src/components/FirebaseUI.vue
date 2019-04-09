<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
  import {auth} from '@/firebase';
  import firebaseui from 'firebaseui';

  export default {
    name: "FirebaseUI",
    mounted() {
      this.ui = new firebaseui.auth.AuthUI(auth());
      this.ui.start('#firebaseui-auth-container', this.uiConfig);
    },
    destroyed() {
      this.ui.delete();
    },
    data() {
      return {
        uiConfig: {
          signInOptions: [
            {
              provider: auth.EmailAuthProvider.PROVIDER_ID,
              requireDisplayName: false
            }
          ],
          credentialHelper: firebaseui.auth.CredentialHelper.NONE,
          callbacks: {
            signInSuccessWithAuthResult: this.signInSuccess
          }
        }
      }
    },
    methods: {
      signInSuccess(authResult) {
          this.$emit('signInSuccess', authResult);
        // Return false to disable FirebaseUI auth redirect
        return false;
      },
    }
  }
</script>

<style src="firebaseui/dist/firebaseui.css"></style>
