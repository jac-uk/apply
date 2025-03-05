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

/**
 * Split the filepath to return an array of [path, filename]
 * @returns Array
 */
const getExemptionCertificateSplitPath = () => {
  const latestExemptionCertificateFullPath = store.getters['candidate/exemptionCertificateFullPath'];
  return latestExemptionCertificateFullPath ? splitFilePath(latestExemptionCertificateFullPath) : [];
};

/**
 * Split the filepath to return an array of [path, filename]
 * @returns Array
 */
const getPracticingCertificateSplitPath = () => {
  const latestPracticingCertificateFullPath = store.getters['candidate/practicingCertificateFullPath'];
  return latestPracticingCertificateFullPath ? splitFilePath(latestPracticingCertificateFullPath) : [];
};

/**
 * Update the releavant qualifications
 * The certificates are stored in arrays where the latest entry is the current certificate
 * New uploaded files have their filepath appended to the array
 * @param {Object} newCertificateFullPaths
 * @param {Array} newQualifications
 */
const updateRelevantQualifications = async (newCertificateFullPaths, newQualifications = null) => {
  let relevantQualifications = store.getters['candidate/relevantQualifications']();
  if (!relevantQualifications) {
    relevantQualifications = {};
  }
  if (newQualifications) {
    relevantQualifications.qualifications = newQualifications;
  }
  // Exemption Certificate
  if (_has(newCertificateFullPaths, 'exemptionCertificateFullPath') && newCertificateFullPaths.exemptionCertificateFullPath) {
    // Exemption certificate has been added/updated so update the candidate profile
    if (_has(relevantQualifications, 'uploadedExemptionCertificates')) {
      if (relevantQualifications.uploadedExemptionCertificates.length > 0) {
        const latestEntry = relevantQualifications.uploadedExemptionCertificates[relevantQualifications.uploadedExemptionCertificates.length - 1];
        if (latestEntry !== newCertificateFullPaths.exemptionCertificateFullPath) {
          relevantQualifications.uploadedExemptionCertificates.push(newCertificateFullPaths.exemptionCertificateFullPath);
        }
      }
      else {
        relevantQualifications.uploadedExemptionCertificates = [newCertificateFullPaths.exemptionCertificateFullPath];
      }
    }
    else {
      relevantQualifications.uploadedExemptionCertificates = [newCertificateFullPaths.exemptionCertificateFullPath];
    }
  }
  // Practicing Certificate
  if (_has(newCertificateFullPaths, 'practicingCertificateFullPath') && newCertificateFullPaths.practicingCertificateFullPath) {
    // Practicing certificate has been added/updated so update the candidate profile
    if (_has(relevantQualifications, 'uploadedPracticingCertificates')) {
      if (relevantQualifications.uploadedPracticingCertificates.length > 0) {
        const latestEntry = relevantQualifications.uploadedPracticingCertificates[relevantQualifications.uploadedPracticingCertificates.length - 1];
        if (latestEntry !== newCertificateFullPaths.practicingCertificateFullPath) {
          relevantQualifications.uploadedPracticingCertificates.push(newCertificateFullPaths.practicingCertificateFullPath);
        }
      }
      else {
        relevantQualifications.uploadedPracticingCertificates = [newCertificateFullPaths.practicingCertificateFullPath];
      }
    }
    else {
      relevantQualifications.uploadedPracticingCertificates = [newCertificateFullPaths.practicingCertificateFullPath];
    }
  }
  await store.dispatch('candidate/saveRelevantQualifications', relevantQualifications);
};

export {
  createCandidate,
  saveCandidate,
  makeFullName,
  getExemptionCertificateSplitPath,
  getPracticingCertificateSplitPath,
  updateRelevantQualifications
};
