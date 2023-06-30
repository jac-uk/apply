import firebase, { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import { isDate, isDateInFuture, parseEstimatedDate } from '@/helpers/date';

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef }, params ) => {
      let firestoreRef = firestore.collection('vacancies');
      if (params && params.vacancyIds.length) {
        firestoreRef = firestoreRef.where(firebase.firestore.FieldPath.documentId(), 'in', params.vacancyIds);
        return bindFirestoreRef('records', firestoreRef, { serialize: vuexfireSerialize });
      } else {
        firestoreRef = firestoreRef.orderBy('referenceNumber', 'desc');
        return bindFirestoreRef('allRecords', firestoreRef, { serialize: vuexfireSerialize });
      }
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('records');
      unbindFirestoreRef('allRecords');
      return true;
    }),
  },
  state: {
    records: [],
    allRecords: [],
    },

  getters: {
    vacancies: state => {
      return state.records;
    },
    allVacancies: state => {
      return state.allRecords;
    },
    openVacancies: (state, getters) => {
      const vacancies = getters.allVacancies;
      return vacancies.filter(vacancy => {

          // console.log(vacancy.state);
          const isArchived = vacancy.state === 'archived';
          const isDeleted = vacancy.state === 'deleted';
          const openDate = vacancy.applicationOpenDate || parseEstimatedDate(vacancy.estimatedLaunchDate);
          const closeDate = vacancy.applicationCloseDate || new Date(2050, 1, 1);
          const hasOnlyEstimates = (vacancy.estimatedLaunchDate && (!vacancy.applicationOpenDate && !vacancy.applicationCloseDate));

          if (!isDate(openDate)) return false;

          // FIXME: workaround for hardcoded times
          openDate.setHours(13);
          closeDate.setHours(13);

          return (!isDateInFuture(openDate) && isDateInFuture(closeDate)) && !hasOnlyEstimates && !isArchived && !isDeleted;
      });
    },
    futureVacancies: (state, getters) => {
      const vacancies = getters.allVacancies;
      return vacancies.filter(vacancy => {
        const openDate = vacancy.applicationOpenDate || parseEstimatedDate(vacancy.estimatedLaunchDate);
        const hasOnlyEstimates = (vacancy.estimatedLaunchDate && (!vacancy.applicationOpenDate && !vacancy.applicationCloseDate));

        if (!isDate(openDate)) return false;

        // FIXME: workaround for hardcoded times
        openDate.setHours(13);

        return isDateInFuture(openDate) || hasOnlyEstimates;
      });
    },
    inProgressVacancies: (state, getters) => {
      const vacancies = getters.allVacancies;
      return vacancies.filter(vacancy => {
        if (!vacancy.applicationCloseDate) {
          return false;
        }
        const closeDate = vacancy.applicationCloseDate || new Date(2050, 1, 1);

        // FIXME: workaround for hardcoded times
        closeDate.setHours(13);

        return !isDateInFuture(closeDate);
      });
    },
    getVacancy: (state, getters) => (vacancyId) => {
      const vacancies = getters.allVacancies;
      const returnVacancies = vacancies.filter(vacancy => vacancy.id === vacancyId);
      return returnVacancies.length == 1 ? returnVacancies[0] : {};
    },
  },
};
