import firebase, { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import { isDate, isDateInFuture, parseEstimatedDate } from '@/helpers/date';
import getStaticVacancies from '@/helpers/getStaticVacancies';

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef }, params ) => {
      let firestoreRef = firestore.collection('vacancies');
      if (params && params.vacancyIds.length) {
        firestoreRef = firestoreRef.where(firebase.firestore.FieldPath.documentId(), 'in', params.vacancyIds);
      } else {
        firestoreRef = firestoreRef.orderBy('referenceNumber', 'desc');
      }
      return bindFirestoreRef('records', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('records');
    }),
  },
  state: {
    records: [],
  },

  getters: {
    vacancies: state => {
      return state.records;
    },
    openVacancies: (state, getters) => {
      const vacancies = getters.vacancies.concat(getStaticVacancies());

      return vacancies.filter(vacancy => {

          const openDate = vacancy.applicationOpenDate || parseEstimatedDate(vacancy.estimatedLaunchDate);
          const closeDate = vacancy.applicationCloseDate || new Date(2050, 1, 1);
          const hasOnlyEstimates = (vacancy.estimatedLaunchDate && (!vacancy.applicationOpenDate && !vacancy.applicationCloseDate));

          if (!isDate(openDate)) return false;
          
          // FIXME: workaround for hardcoded times
          openDate.setHours(13);
          closeDate.setHours(13);
          
          return (!isDateInFuture(openDate) && isDateInFuture(closeDate)) && !hasOnlyEstimates;
      });
    },
    futureVacancies: (state, getters) => {
      const vacancies = getters.vacancies.concat(getStaticVacancies());

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
      const vacancies = getters.vacancies.concat(getStaticVacancies());

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
  },
};
