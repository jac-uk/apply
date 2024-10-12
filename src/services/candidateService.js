import store from '@/store';
import { serverTimestamp } from '@firebase/firestore';

const createCandidate = async (personalDetails) => {

  // eslint-disable-next-line no-console
  console.log('CREATING THE CANDIDATE');

  await store.dispatch('candidate/create', {
    created: serverTimestamp(),
  });
  await saveCandidate(personalDetails);
};

const saveCandidate = async (personalDetails) => {

  /* eslint-disable no-console */
  console.log('SAVING THE CANDIDATE');
  console.log(personalDetails);
  /* eslint-enable no-console */

  await store.dispatch('candidate/savePersonalDetails', personalDetails);
};

const makeFullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

export {
  createCandidate,
  saveCandidate,
  makeFullName
};
