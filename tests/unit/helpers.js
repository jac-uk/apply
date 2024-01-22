// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import * as filters from '@/filters';
import { vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const mocks = {
  route: {
    name: 'name-of-current-route',
    params: {
      id: 'abc123',
    },
    query: {
    },
  },
  router: {
    push: vi.fn(),
    replace: vi.fn(),
  },
  store: {
    dispatch: vi.fn(),
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
          qualifications: [],
          otherQualifications: '',
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
      'vacancy/isOpen': vi.fn(),
      'vacancy/id': vi.fn(),
      'vacancy/applicationParts': vi.fn(),
      'application/data': () => vi.fn(),
      // 'vacancies/bind': () => vi.fn(), //see views/vacancies.spec.js
      'candidate/characterInformation': () => vi.fn(),
    },
  },
};

// const localVue = createLocalVue();

// // Register global filters
// Object.keys(filters)
//   .forEach((filterName) => {
//     localVue.filter(filterName, filters[filterName]);
//   });

const createTestSubject = (component, customMountOptions = {
  mocks: {},
  stubs: [],
  propsData: {},
}) => {
  const mountOptions = {
    //localVue,
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
