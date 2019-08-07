import application from '@/store/application';
import sanitizeFirestore from '@/utils/sanitizeFirestore';
import { firestore } from '@/firebase';

jest.mock('@/utils/sanitizeFirestore');
jest.mock('@/firebase', () => {
  const firebase = require('firebase-mock');
  const firestore = firebase.MockFirebaseSdk().firestore();
  firestore.autoFlush();
  return { firestore };
});

describe('store/application', () => {
  const mutations = application.mutations;
  const actions = application.actions;
  const getters = application.getters;
  let state;
  beforeEach(() => {
    state = {
      data: {},
      id: null,
    };
  });

  describe('mutations', () => {
    describe('setApplication', () => {
      const id = 'abc123';
      const data = { status: 'draft' };

      beforeEach(() => {
        mutations.setApplication(state, { id, data });
      });

      it('stores the supplied document ID in the state', () => {
        expect(state.id).toBe(id);
      });
      it('stores the supplied data in the state', () => {
        expect(state.data).toBe(data);
      });
    });
  });

  describe('actions', () => {
    let context;
    beforeEach(() => {
      context = {
        commit: jest.fn(),
        getters,
        state,
      };
    });

    describe('loadApplication', () => {
      describe('applicant and vacancy documents have not been set', () => {
        it('throws an error', async () => {
          await expect(actions.loadApplication(context)).rejects.toThrowError('Applicant and Vacancy docs must exist');
        });
      });

      describe('application already exists in Firestore', () => {
        const docId = 'abc123';
        const data = { state: 'draft' };
        const sanitizedData = { state: 'draft', sanitized: true, updatedAt: expect.any(Date) };

        beforeEach(async () => {
          getters.applicantDoc = 'applicants/4jsbvO27RJYqSRsgZM9sPhDFLDU2';
          getters.vacancyDoc = 'vacancies/hsQqdvAfZpSw94X2B8nA';

          await firestore.collection('applications').doc(docId).set({
            applicant: getters.applicantDoc,
            vacancy: getters.vacancyDoc,
            ...data,
          });

          await actions.loadApplication(context);
        });

        afterEach(() => {
          firestore.collection('applications').data = null;
          delete getters.applicantDoc;
          delete getters.vacancyDoc;
        });

        it('finds the document data in Firestore, removes relational keys and sanitizes it', () => {
          expect(sanitizeFirestore).toHaveBeenCalledWith(data);
        });

        it('commits the document ID and sanitized data', () => {
          expect(context.commit).toHaveBeenCalledWith('setApplication', { id: docId, data: sanitizedData });
        });
      });

      describe('initialize an empty state when the application does not exist in Firestore', () => {
        beforeEach(async () => {
          getters.applicantDoc = 'applicants/4jsbvO27RJYqSRsgZM9sPhDFLDU2';
          getters.vacancyDoc = 'vacancies/hsQqdvAfZpSw94X2B8nA';
          await actions.loadApplication(context);
        });

        afterEach(() => {
          delete getters.applicantDoc;
          delete getters.vacancyDoc;
        });

        it('commits a null document ID and an empty data object', () => {
          expect(context.commit)
            .toHaveBeenCalledWith(
              'setApplication',
              {
                id: null,
                data: { createdAt: expect.any(Date), state: 'draft', updatedAt: expect.any(Date) },
              }
            );
        });
      });

      it('returns a Promise', () => {
        getters.applicantDoc = 'applicants/4jsbvO27RJYqSRsgZM9sPhDFLDU2';
        getters.vacancyDoc = 'vacancies/hsQqdvAfZpSw94X2B8nA';

        expect(actions.loadApplication(context)).toBeInstanceOf(Promise);

        delete getters.applicantDoc;
        delete getters.vacancyDoc;
      });
    });

    describe('saveApplication', () => {
      describe('applicant and vacancy documents have not been set', () => {
        it('throws an error', async () => {
          await expect(actions.saveApplication(context, {})).rejects.toThrowError('Applicant and Vacancy docs must exist');
        });
      });

      describe('happy path', () => {
        let backupDoc;
        beforeEach(() => {
          getters.applicantDoc = 'applicants/4jsbvO27RJYqSRsgZM9sPhDFLDU2';
          getters.vacancyDoc = 'vacancies/hsQqdvAfZpSw94X2B8nA';
          backupDoc = getters.applicationDoc;
          getters.applicationDoc = {
            set: jest.fn().mockResolvedValue(null),
            id: 'abc123',
          };
        });

        afterEach(() => {
          delete getters.applicantDoc;
          delete getters.vacancyDoc;
          getters.applicationDoc = backupDoc;
        });

        it('saves data to Firestore with `applicant` and `vacancy` relational keys', async () => {
          const data = { status: 'submitted' };
          await actions.saveApplication(context, data);
          expect(getters.applicationDoc.set).toHaveBeenCalledTimes(1);
          expect(getters.applicationDoc.set).toHaveBeenCalledWith({
            status: 'submitted',
            applicant: getters.applicantDoc,
            vacancy: getters.vacancyDoc,
          });
        });

        it('does not change the original input data (not passed by reference)', async () => {
          const data = { status: 'submitted' };
          await actions.saveApplication(context, data);
          expect(data).toEqual({ status: 'submitted' });
        });

        it('commits the document ID and a copy of the data (not the input object passed by reference)', async () => {
          const data = { status: 'submitted' };
          await actions.saveApplication(context, data);
          expect(context.commit).toHaveBeenCalledWith('setApplication', { id: 'abc123', data });
          const committedData = context.commit.mock.calls[0][1].data;
          expect(committedData).not.toBe(data);
        });
      });

      it('returns a Promise', () => {
        getters.applicantDoc = 'applicants/4jsbvO27RJYqSRsgZM9sPhDFLDU2';
        getters.vacancyDoc = 'vacancies/hsQqdvAfZpSw94X2B8nA';
        const docBackup = getters.applicationDoc;
        getters.applicationDoc = {
          set: jest.fn().mockResolvedValue(null),
          id: 'abc123',
        };

        expect(actions.saveApplication(context, {})).toBeInstanceOf(Promise);

        delete getters.applicantDoc;
        delete getters.vacancyDoc;
        getters.applicationDoc = docBackup;
      });
    });
  });

  describe('getters', () => {
    describe('application()', () => {
      beforeEach(() => {
        state.data = { status: 'draft' };
      });

      it('is a function (so vuex does not cache output)', () => {
        expect(getters.application(state)).toBeInstanceOf(Function);
      });

      it('returns a clone of the application data (rather than a reference to the state object)', () => {
        const application = getters.application(state)();
        expect(application).not.toBe(state.data);
        expect(application).toEqual(state.data);
      });
    });

    describe('applicationDoc', () => {
      describe('when ID is set in the state', () => {
        it('returns the document matching path `applications/{applicationId}`', () => {
          state.id = 'abc123';
          const doc = getters.applicationDoc(state, getters);
          expect(doc.id).toBe('abc123');
          expect(doc.path).toBe('applications/abc123');
        });
      });

      describe('when ID in state is null', () => {
        it('returns a new document matching path `applications/{applicationId}`', () => {
          state.id = null;
          const doc = getters.applicationDoc(state, getters);
          expect(typeof doc.id).toBe('string');
          expect(doc.path).toBe(`applications/${doc.id}`);
        });
      });
    });
  });
});
