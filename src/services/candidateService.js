import store from '@/store';
import { serverTimestamp } from '@firebase/firestore';

const createCandidate = async (personalDetails) => {

  console.log('CREATING THE CANDIDATE');

  await store.dispatch('candidate/create', {
    created: serverTimestamp(),
  });
  await saveCandidate(personalDetails);
};

const saveCandidate = async (personalDetails) => {

  console.log('SAVING THE CANDIDATE');
  console.log(personalDetails);

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
