import store from '@/store';
import { serverTimestamp } from '@firebase/firestore';
import { splitFilePath } from '@/helpers/file';

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

const getExemptionCertificateSplitPath = () => {
  const latestExemptionCertificateFullPath = store.getters['candidate/exemptionCertificateFullPath'];

  console.log(`latestExemptionCertificateFullPath: ${latestExemptionCertificateFullPath}`);

  return latestExemptionCertificateFullPath ? splitFilePath(latestExemptionCertificateFullPath) : [];
};

const getPracticingCertificateSplitPath = () => {
  const latestPracticingCertificateFullPath = store.getters['candidate/practicingCertificateFullPath'];

  console.log(`latestPracticingCertificateFullPath: ${latestPracticingCertificateFullPath}`);

  return latestPracticingCertificateFullPath ? splitFilePath(latestPracticingCertificateFullPath) : [];
};

export {
  createCandidate,
  saveCandidate,
  makeFullName,
  getExemptionCertificateSplitPath,
  getPracticingCertificateSplitPath
};
