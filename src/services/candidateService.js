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
  const latestExemptionCertificateFullPath = store.getters['candidate/getExemptionCertificateFullPath']();

  console.log(`latestExemptionCertificateFullPath: ${latestExemptionCertificateFullPath}`);

  return latestExemptionCertificateFullPath ? splitFilePath(latestExemptionCertificateFullPath) : [];
};

export {
  createCandidate,
  saveCandidate,
  makeFullName,
  getExemptionCertificateSplitPath
};
