import { shallowMount } from '@vue/test-utils';
import TaskList from '@/views/Apply/TaskList';

const mockRoute = {
 name: 'name-of-current-route',
 params: {
   id: 'abc123',
 },
};
const mockRouter = {
 replace: jest.fn(),
};
const mockStore = () => {
  return {
    dispatch: jest.fn(),
    state: {
      vacancy: {
        record: {},
      },
      candidate: {
        record: {},
      },
      application: {
        record: { progress: { started: true } },
      },
      applications: {
        records: [],
      },
    },
    getters: {
      'vacancy/getCloseDate': new Date(),
    },
  };
};
const createTestSubject = () => {
 return shallowMount(TaskList, {
   mocks: {
     $route: mockRoute,
     $router: mockRouter,
     $store: mockStore(),
   },
   stubs: {
     'RouterLink': true,
   },
 });
};
describe('views/TaskList', () => {
 let wrapper;
 beforeEach(() => {
   wrapper = createTestSubject();
 });
 describe('template', () => {
   it('renders', () => {
     expect(wrapper.exists()).toBeTrue();
   });
   it('contains a <h1>', () => {
     expect(wrapper.contains('h1')).toBeTrue();
   });
   describe('back to applications link', () => {
     describe('with applications available', () => {
       beforeEach(() => {
         wrapper.vm.$store.state.applications.records = [
           { id: 'application1' },
           { id: 'application2' },
         ];
       });
       it('exists', () => {
         expect(wrapper.find('.govuk-back-link').exists()).toBeTrue();
       });
       it('contains text \'Applications\'', () => {
         expect(wrapper.find('.govuk-back-link').text()).toBe('Applications');
       });
       xit('is a RouterLink', () => {
       });
       xit('goes to applications page', () => {
       });
     });
     describe('without applications', () => {
       it('does not exist', () => {
         expect(wrapper.find('.govuk-back-link').exists()).toBeFalse();
       });
     });
   });

  //  xdescribe('Experience h2', () => {
  //    it('renders the 3rd block h2 as Qualifications and experience if the role is legal', () => {
  //      let wrapper = shallowMount(TaskList, {
  //        mocks: {
  //          $store: {
  //            state: {
  //              exercise: {
  //                record: { typeOfExercise: 'legal'},
  //              },
  //              candidate: {
  //                record: {},
  //              },
  //              application: {
  //                record: {},
  //              },
  //            }
  //          },
  //          $route: mockRoute,
  //          $router: mockRouter,
  //        }
  //       });
  //       expect(wrapper.find('#qualifications-and-experience').exists()).toBeTrue();
  //       expect(wrapper.find('#qualifications-and-experience').text()).toBe('3. Qualifications and experience');
  //     });
  //     it('renders the 3rd block h2 as Memberships and experience if the role is non-legal', () => {
  //       let wrapper = shallowMount(TaskList, {
  //         mocks: {
  //           $store: {
  //             state: {
  //               exercise: {
  //                 record: { typeOfExercise: 'non-legal'},
  //               },
  //               candidate: {
  //                 record: {},
  //               },
  //               application: {
  //                 record: {},
  //               },
  //             }
  //           }
  //         }
  //        });
  //        expect(wrapper.find('#memberships-and-experience').exists()).toBeTrue();
  //        expect(wrapper.find('#memberships-and-experience').text()).toBe('3. Memberships and Experience');
  //      });
  //  });
 });
});
