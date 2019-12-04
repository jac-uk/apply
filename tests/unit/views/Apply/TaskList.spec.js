import TaskList from '@/views/Apply/TaskList';
import { shallowMount } from '@vue/test-utils';
const mockRoute = {
 name: 'name-of-current-route',
 params: {
   id: 'abc123',
 },
};
const mockRouter = {
 replace: jest.fn(),
};
const mockStore = {
  dispatch: jest.fn(),
  state: {
    exercise: {
      record: {},
    },
    candidate: {
      record: {},
    },
    application: {
      record: { progress: { started: true } },
    },
  },
};
const createTestSubject = () => {
 return shallowMount(TaskList, {
   mocks: {
     $route: mockRoute,
     $router: mockRouter,
     $store: mockStore,
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
     expect(wrapper.exists()).toBe(true);
   });
   it('contains a <h1>', () => {
     expect(wrapper.contains('h1')).toBe(true);
   });
   it('contains a router-link tag', () => {
     expect(wrapper.find('RouterLink-stub').exists()).toBe(true);
   });
   describe('Experience h2', () => {
     it('renders the 3rd block h2 as Qualifications and experience if the role is legal', () => {
       let wrapper = shallowMount(TaskList, {
         mocks: {
           $store: {
             state: {
               exercise: {
                 record: { typeOfExercise: 'legal'},
               },
               candidate: {
                 record: {},
               },
               application: {
                 record: {},
               },
             }
           },
           $route: mockRoute,
           $router: mockRouter,
         }
        });
        expect(wrapper.find('#qualifications-and-experience').exists()).toBe(true);
        expect(wrapper.find('#qualifications-and-experience').text()).toBe('3. Qualifications and experience');
      });
      it('renders the 3rd block h2 as Memberships and experience if the role is non-legal', () => {
        let wrapper = shallowMount(TaskList, {
          mocks: {
            $store: {
              state: {
                exercise: {
                  record: { typeOfExercise: 'non-legal'},
                },
                candidate: {
                  record: {},
                },
                application: {
                  record: {},
                },
              }
            }
          }
         });
         expect(wrapper.find('#memberships-and-experience').exists()).toBe(true);
         expect(wrapper.find('#memberships-and-experience').text()).toBe('3. Memberships and Experience');
       });
   });
 });
});
