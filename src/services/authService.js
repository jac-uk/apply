import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, getAuth } from 'firebase/auth';

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

const sendPasswordResetLink = async (returnUrl) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    await sendPasswordResetEmail(auth, user.email, {
      url: returnUrl,
    });
    return true;
  }
  return false;
};

export {
  createAuthUser,
  getAuthUser,
  sendEmailVerificationLink,
  sendPasswordResetLink
};
