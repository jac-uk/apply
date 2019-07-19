import vacancy from '@/store/vacancy';
import sanitizeFirestore from '@/utils/sanitizeFirestore';
import {firestore} from '@/firebase';

jest.mock('@/utils/sanitizeFirestore');
jest.mock('@/firebase', () => {
  const firebase = require('firebase-mock');
  const firestore = firebase.MockFirebaseSdk().firestore();
  firestore.autoFlush();
  return {firestore,};
});

describe('store/vacancy', () => {
  const mutations = vacancy.mutations;
  const actions = vacancy.actions;
  const getters = vacancy.getters;
  let state;
  beforeEach(() => {
    state = {
      data: {},
      id: null,
    };
  });

  describe('mutations', () => {
    describe('setVacancy', () => {
      it('stores the supplied data in the state', () => {
        const data = {title: 'Example Vacancy Title',};
        mutations.setVacancy(state, data);
        expect(state.data).toBe(data);
      });
    });

    describe('setVacancyId', () => {
      it('stores the supplied data in the state', () => {
        const id = 'hsQqdvAfZpSw94X2B8nA';
        vacancy.mutations.setVacancyId(state, id);
        expect(state.id).toBe(id);
      });
    });
  });

  describe('actions', () => {
    let context;
    let docBackup;
    beforeEach(() => {
      context = {
        commit: jest.fn(),
        getters,
        state,
      };
      docBackup = getters.vacancyDoc;
    });

    afterEach(() => {
      getters.vacancyDoc = docBackup;
    });

    describe('loadVacancy', () => {
      describe('vacancy ID has not been set', () => {
        it('throws an error', async () => {
          await expect(actions.loadVacancy(context)).rejects.toThrowError('set the Vacancy ID first');
        });
      });

      describe('happy path', () => {
        const docId = 'hsQqdvAfZpSw94X2B8nA';
        const data = {title: 'Example Vacancy Title',};
        const sanitizedData = {title: 'Example Vacancy Title', sanitized: true,};

        beforeEach(async () => {
          state.id = docId;
          getters.vacancyDoc = firestore.collection('vacancies').doc(docId);
          await getters.vacancyDoc.set(data);
          await actions.loadVacancy(context);
        });

        afterEach(() => {
          getters.vacancyDoc.delete();
        });

        it('finds the document data in Firestore and sanitizes it', () => {
          expect(sanitizeFirestore).toHaveBeenCalledWith(data);
        });

        it('commits the sanitized data', () => {
          expect(context.commit).toHaveBeenCalledWith('setVacancy', sanitizedData);
        });
      });

      it('returns a Promise', () => {
        state.id = 'hsQqdvAfZpSw94X2B8nA';
        getters.vacancyDoc = firestore.collection('vacancies').doc();
        expect(actions.loadVacancy(context)).toBeInstanceOf(Promise);
      });
    });
  });

  describe('getters', () => {
    describe('vacancy', () => {
      it('returns the vacancy data object from state (passed by reference)', () => {
        const data = {title: 'Example Vacancy Title',};
        state.data = data;
        expect(getters.vacancy(state)).toBe(data);
      });
    });

    describe('vacancyDoc', () => {
      describe('when ID is set in the state', () => {
        it('returns the document matching path vacancies/{vacancyId}', () => {
          state.id = 'hsQqdvAfZpSw94X2B8nA';
          const doc = getters.vacancyDoc(state);
          expect(doc.id).toBe('hsQqdvAfZpSw94X2B8nA');
          expect(doc.path).toBe('vacancies/hsQqdvAfZpSw94X2B8nA');
        });
      });

      describe('when ID in state is null', () => {
        it('returns null', () => {
          expect(getters.vacancyDoc(state)).toBe(null);
        });
      });
    });
  });
});
