//import { getAuth, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

const logoutUser = async () => {
  const auth = getAuth();
  try {
    //await signOut(auth);
    await auth.signOut();
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export {
  logoutUser
};
