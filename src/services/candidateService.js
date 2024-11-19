import store from '@/store';
import { serverTimestamp } from '@firebase/firestore';

const createCandidate = async (personalDetails) => {
  await store.dispatch('candidate/create', {
    created: serverTimestamp(),
  });
  return await saveCandidate(personalDetails);
};

const saveCandidate = async (personalDetails) => {
  await store.dispatch('candidate/savePersonalDetails', personalDetails);
  return true;
};

const makeFullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

export {
  createCandidate,
  saveCandidate,
  makeFullName
};
