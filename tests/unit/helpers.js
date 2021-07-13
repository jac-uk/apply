import { shallowMount, createLocalVue } from '@vue/test-utils';

const mocks = {
  route: {
    name: 'name-of-current-route',
    params: {
      id: 'abc123',
    },
  },
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
  store: {
    dispatch: jest.fn(),
    state: {
      vacancy: {
        record: {
          typeOfExercise: null,
          referenceNumber: null,
          welshRequirement: null,
          unknownVariable: null,
          locationQuestion: '',
          locationQuestionAnswers: [''],
          locationQuestionType: '',
          jurisdictionQuestion: '',
          jurisdictionQuestionAnswers: [''],
          jurisdictionQuestionType: '',
          shortlistingOutcomeDate: '',
          additionalWorkingPreferences: [],
        },
      },
      candidate: {
        record: {
          // personalDetails: null, see personaldetails.spec
        },
      },
      application: {
        record: {
          progress: {
            started: true,
          },
        //   personalDetails:{
        //     fullName: 'Jo Doe',
        //   },
        //   characterInformation: {
        //     criminalOffences: false,
        //   },
        //   equalityAndDiversitySurvey: {
        //     shareData: false,
        //     feePaidJudicialRole: false,
        //     otherFeePaidJudicialRoleDetails: 'other',
        //     oxbridgeUni: false,
        //     changedGender: false,
        //     disability: false,
        //     attendedOutreachEvents: false,
        //     hasTakenPAJE: false,
        //   },
        //   feePaidOrSalariedJudge: false,
        //   feePaidOrSalariedSatForThirtyDays: false,
        //   declaredAppointmentInQuasiJudicialBody: false,
        //   quasiJudicialSatForThirtyDays: false,
        //   canGiveReasonableLOS: false,
        //   applyingForWelshPost: false,
        //   canSpeakWelsh: false,
        //   canReadAndWriteWelsh: false,
        },
      },
      applications: {
        records: [],
      },
      qualifyingTestResponses: {
        dryRuns: [],
        records: [],
      },
    },
    getters: {
      'vacancy/getCloseDate': new Date(),
      'vacancy/isOpen': jest.fn(),
      'vacancy/id': jest.fn(),
      'vacancy/applicationParts': jest.fn(),
      'application/data': () => jest.fn(),
      // 'vacancies/bind': () => jest.fn(), //see views/vacancies.spec.js
      'candidate/characterInformation': () => jest.fn(),
    },
  },
};

const localVue = createLocalVue();

const createTestSubject = (component, customMountOptions = {
  mocks: {},
  stubs: [],
  propsData: {},
}) => {
  const mountOptions = {
    localVue,
    mocks: {
      $route: mocks.route,
      $router: mocks.router,
      $store: mocks.store,
      ...customMountOptions.mocks,
    },
    stubs: [...customMountOptions.stubs],
    propsData: { ...customMountOptions.propsData },
  };

  if (customMountOptions.parent) {
    mountOptions.parentComponent = customMountOptions.parent;
  }

  if (customMountOptions.methods) {
    mountOptions.methods = customMountOptions.methods;
  }

  if (customMountOptions.slots) {
    mountOptions.slots = {
      default: customMountOptions.slots,
    };
  }

  return shallowMount(component, mountOptions);
};

export {
  mocks,
  createTestSubject
};
