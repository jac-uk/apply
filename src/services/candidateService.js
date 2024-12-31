import store from '@/store';
import { serverTimestamp } from '@firebase/firestore';
import { splitFilePath } from '@/helpers/file';
import _has from 'lodash/has';

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

  console.log(`CS latestExemptionCertificateFullPath: ${latestExemptionCertificateFullPath}`);

  return latestExemptionCertificateFullPath ? splitFilePath(latestExemptionCertificateFullPath) : [];
};

const getPracticingCertificateSplitPath = () => {
  const latestPracticingCertificateFullPath = store.getters['candidate/practicingCertificateFullPath'];

  console.log(`CS latestPracticingCertificateFullPath: ${latestPracticingCertificateFullPath}`);

  return latestPracticingCertificateFullPath ? splitFilePath(latestPracticingCertificateFullPath) : [];
};

const updateRelevantQualifications = async (newCertificateFullPaths, newQualifications = null) => {
  const relevantQualififcations = store.getters['candidate/relevantQualifications']();

  console.log('-- CS candidateRelevantQualifications:');
  console.log(relevantQualififcations);

  console.log('-- CS newCertificateFullPaths:');
  console.log(newCertificateFullPaths);

  console.log('-- CS newQualifications:');
  console.log(newQualifications);

  if (newQualifications) {
    relevantQualififcations.qualifications = newQualifications;
  }
  if (_has(newCertificateFullPaths, 'exemptionCertificateFullPath' && newCertificateFullPaths.exemptionCertificateFullPath)) {

    // Exemption certificate has been added/updated so update the candidate profile
    console.log('-- RQ exemption certificate has been added/updated so update the candidate profile');

    if (_has(relevantQualififcations, 'uploadedExemptionCertificates')) {

      console.log('-- RQ candidateRelevantQualifications HAS uploadedExemptionCertificates array');

      if (relevantQualififcations.uploadedExemptionCertificates.length > 0) {

        console.log('-- RQ candidateRelevantQualifications.uploadedExemptionCertificates array is not empty so checking last entry');

        const latestEntry = relevantQualififcations.uploadedExemptionCertificates[relevantQualififcations.uploadedExemptionCertificates.length - 1];

        console.log('-- RQ last entry:');
        console.log(latestEntry);

        if (latestEntry !== newCertificateFullPaths.exemptionCertificateFullPath) {

          console.log('-- RQ last entry IS NOT EQUAL to new one so updating');

          relevantQualififcations.uploadedExemptionCertificates.push(newCertificateFullPaths.exemptionCertificateFullPath);
        }
        else {
          console.log('-- RQ last entry IS EQUAL so NOT updating');
        }
      }
      else {

        console.log('-- RQ candidateRelevantQualifications.uploadedExemptionCertificates array is empty so populate');

        relevantQualififcations.uploadedExemptionCertificates = [newCertificateFullPaths.exemptionCertificateFullPath];
      }
    }
    else {

      console.log('-- RQ candidateRelevantQualifications DOES NOT have uploadedExemptionCertificates array so create it and populate');

      relevantQualififcations.uploadedExemptionCertificates = [newCertificateFullPaths.exemptionCertificateFullPath];
    }

    await store.dispatch('candidate/saveRelevantQualifications', relevantQualififcations);
  }

};

export {
  createCandidate,
  saveCandidate,
  makeFullName,
  getExemptionCertificateSplitPath,
  getPracticingCertificateSplitPath,
  updateRelevantQualifications
};
