import applicant from '@/store/applicant';
import sanitizeFirestore from "@/utils/sanitizeFirestore";
import {firestore} from '@/firebase';

jest.mock('@/utils/sanitizeFirestore');
jest.mock('@/firebase', () => {
  const firebase = require('firebase-mock');
  const firestore = firebase.MockFirebaseSdk().firestore();
  firestore.autoFlush();
  return {firestore};
});

describe('store/applicant', () => {
  const mutations = applicant.mutations;
  const actions = applicant.actions;
  const getters = applicant.getters;
  let state;
  beforeEach(() => {
    state = {
      data: {},
    };
  });

  describe('mutations', () => {
    describe('setApplicant', () => {
      it('stores the supplied data in the state', () => {
        const data = {name: 'John Smith'};
        mutations.setApplicant(state, data);
        expect(state.data).toBe(data);
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
      docBackup = getters.applicantDoc;
    });

    afterEach(() => {
      getters.applicantDoc = docBackup;
    });

    describe('loadApplicant', () => {
      describe('getters.currentUserId is null', () => {
        it('throws an error', async () => {
          getters.applicantDoc = null;
          await expect(actions.loadApplicant(context)).rejects.toThrowError('Cannot get Applicant doc');
        });
      });

      describe('applicant exists in Firestore', () => {
        const docId = '4jsbvO27RJYqSRsgZM9sPhDFLDU2';
        const data = {name: 'John Smith'};
        const sanitizedData = {name: 'John Smith', sanitized: true};

        beforeEach(async () => {
          getters.applicantDoc = firestore.collection('applicants').doc(docId);
          await getters.applicantDoc.set(data);
          await actions.loadApplicant(context);
        });

        afterEach(() => {
          getters.applicantDoc.delete();
        });

        it('finds the document data in Firestore and sanitizes it', () => {
          expect(sanitizeFirestore).toHaveBeenCalledWith(data);
        });

        it('commits the sanitized data', () => {
          expect(context.commit).toHaveBeenCalledWith('setApplicant', sanitizedData);
        });
      });

      describe('applicant does not exist in Firestore - initialise an empty state', () => {
        const docId = '4jsbvO27RJYqSRsgZM9sPhDFLDU2';

        beforeEach(async () => {
          getters.applicantDoc = firestore.collection('applicants').doc(docId);
          await actions.loadApplicant(context);
        });

        it('commits an empty data object', () => {
          expect(context.commit).toHaveBeenCalledWith('setApplicant', {});
        });
      });

      it('returns a Promise', () => {
        getters.applicantDoc = firestore.collection('applicants').doc();
        expect(actions.loadApplicant(context)).toBeInstanceOf(Promise);
      });
    });

    describe('saveApplicant', () => {
      describe('getters.currentUserId is null', () => {
        it('throws an error', async () => {
          getters.applicantDoc = null;
          await expect(actions.saveApplicant(context, {})).rejects.toThrowError('Cannot get Applicant doc');
        });
      });

      describe('happy path', () => {
        const docId = '4jsbvO27RJYqSRsgZM9sPhDFLDU2';
        const data = {name: 'John Smith'};

        beforeEach(async () => {
          getters.applicantDoc = firestore.collection('applicants').doc(docId);
          await actions.saveApplicant(context, data);
        });

        it('saves the data to Firestore', async () => {
          const snapshot = await getters.applicantDoc.get();
          expect(snapshot.data()).toEqual(data);
        });

        it('commits a clone of the data to the state (not passed by reference)', async () => {
          // Check that the committed object *IS NOT* the same as that which was passed to the saveApplicant method
          // A clone is committed to avoid accidental 'pass by reference' changes to state data
          const committedData = context.commit.mock.calls[0][1];
          expect(committedData).not.toBe(data);
          expect(committedData).toEqual(data);
        });
      });

      it('returns a Promise', () => {
        getters.applicantDoc = firestore.collection('applicants').doc();
        expect(actions.saveApplicant(context, {})).toBeInstanceOf(Promise);
      });
    });
  });

  describe('getters', () => {
    describe('applicant()', () => {
      beforeEach(() => {
        state.data = {name: 'John Smith'};
      });

      it('is a function (so vuex does not cache output)', () => {
        expect(getters.applicant(state)).toBeInstanceOf(Function);
      });

      it('returns a clone of the applicant data (rather than a reference to the state object)', () => {
        const applicant = getters.applicant(state)();
        expect(applicant).not.toBe(state.data);
        expect(applicant).toEqual(state.data);
      });
    });

    describe('applicantDoc', () => {
      afterEach(() => {
        delete getters.currentUserId;
      });

      describe('when getters.currentUserId is set', () => {
        it('returns the document matching path applicants/{currentUserId}', () => {
          getters.currentUserId = '4jsbvO27RJYqSRsgZM9sPhDFLDU2';
          const doc = getters.applicantDoc(state, getters);
          expect(doc.id).toBe(getters.currentUserId);
          expect(doc.path).toBe(`applicants/${getters.currentUserId}`);
        });
      });

      describe('when getters.currentUserId is null', () => {
        it('returns null', () => {
          getters.currentUserId = null;
          expect(getters.applicantDoc(state, getters)).toBe(null);
        });
      });
    });
  });
});
