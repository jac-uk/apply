import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, getAuth, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';

const createAuthUser = async (email, password) => {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

const getAuthUser = async () => {
  const auth = getAuth();
  return auth.currentUser;
};

const sendEmailVerificationLink = async () => {
  const currentDomain = window.location.origin;
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    await sendEmailVerification(user, {
      url: `${currentDomain}/verify-email?email=${user.email}`, // Redirect link
    });
    return true;
  }
  return false;
};

const sendPasswordResetLink = async (email, returnUrl) => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email, {
    url: returnUrl,
  });
};

const signInWithEmailAndPwd = async (email, password) => {
  const auth = getAuth();
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

const  updatePwd = async(currentPwd, newPwd) => {
  const user = await getAuthUser();
  await signInWithEmailAndPwd(
    user.email,
    currentPwd
  );
  await updatePassword(user, newPwd);
};

const mapPwdResetMessage = (errorCode) => {
  const errorMessages = {
    //'CREDENTIAL_TOO_OLD_LOGIN_AGAIN'
    'auth/invalid-credential': 'The current password is incorrect.',
    'auth/wrong-password': 'The current password is incorrect.',
    'auth/weak-password': 'The new password is too weak. Please choose a stronger password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
    'auth/requires-recent-login': 'Your session is too old. Please log in again to perform this action.',
    default: 'An unexpected error occurred. Please try again or contact admin.',
  };

  return errorMessages[errorCode] || errorMessages.default;
};

export {
  createAuthUser,
  getAuthUser,
  sendEmailVerificationLink,
  sendPasswordResetLink,
  signInWithEmailAndPwd,
  mapPwdResetMessage,
  updatePwd
};
