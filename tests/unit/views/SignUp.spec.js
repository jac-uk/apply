// import { createTestSubject, mocks } from '../helpers';
// import SignUp from '@/views/SignUp.vue';
// import { vi } from 'vitest';
// import { auth } from '@/firebase';
// import firebase from '@firebase/app';

// vi.mock('@/firebase', () => {
//   return {
//     auth: {
//       createUserWithEmailAndPassword: vi.fn(),
//     },
//   };
// });

// vi.mock('@firebase/app', () => {
//   return {
//     firestore: {
//       FieldValue: {
//         serverTimestamp: vi.fn(),
//       },
//     },
//   };
// });

// describe('views/SignUp', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = createTestSubject(SignUp, {
//       stubs: ['RouterLink'],
//     });
//   });

//   describe('template', () => {
//     it('renders', () => {
//       expect(wrapper.exists()).toBe(true);
//     });

//     it('contains a <form>', () => {
//       expect(wrapper.find('form').exists()).toBe(true);
//     });

//     it('contains expected fields', () => {
//       expect(wrapper.find('#title').exists()).toBe(true);
//       expect(wrapper.find('#firstName').exists()).toBe(true);
//       expect(wrapper.find('#lastName').exists()).toBe(true);
//       expect(wrapper.find('#email').exists()).toBe(true);
//       expect(wrapper.find('#password').exists()).toBe(true);
//       expect(wrapper.find('#date-of-birth').exists()).toBe(true);
//       expect(wrapper.find('#national-insurance-number').exists()).toBe(true);
//     });

//     it('contains a "Continue" submit button', () => {
//       const button = wrapper.find('form button');
//       expect(button.element.type).toBe('submit');
//       expect(button.text()).toBe('Create Account');
//     });
//   });

//   describe('methods', () => {

//     describe('scrollToTop()', () => {
//       it('is a function', () => {
//         expect(typeof wrapper.vm.scrollToTop).toBe('function');
//       });

//       it('scrolls to top', () => {
//         wrapper.vm.$el.scrollIntoView = vi.fn();
//         wrapper.vm.scrollToTop();
//         expect(wrapper.vm.$el.scrollIntoView).toHaveBeenCalled();
//       });
//     });

//     describe('onSubmit()', () => {
//       beforeEach(() => {
//         wrapper.vm.validate = vi.fn();
//         wrapper.vm.scrollToTop = vi.fn();
//       });

//       it('is a function', () => {
//         expect(typeof wrapper.vm.onSubmit).toBe('function');
//       });

//       it('calls validate()', () => {
//         wrapper.vm.onSubmit();
//         expect(wrapper.vm.validate).toHaveBeenCalled();
//       });

//       it('if isValid() returns true, calls signUp()', async () => {
//         wrapper.vm.isValid = vi.fn().mockReturnValue(true);
//         wrapper.vm.signUp = vi.fn();

//         await wrapper.vm.onSubmit();
//         expect(wrapper.vm.signUp).toHaveBeenCalled();

//       });

//       it('if signUp failed, sets error and calls scrollToTop()', async () => {
//         wrapper.vm.isValid = vi.fn().mockReturnValue(true);
//         wrapper.vm.signUp = vi.fn().mockRejectedValue(new Error('Mock error'));

//         await wrapper.vm.onSubmit();

//         expect(wrapper.vm.errors).toBeArrayOfSize(1);
//         expect(wrapper.vm.scrollToTop).toHaveBeenCalled();
//       });
//     });

//     describe('signUp()', () => {
//       const mockFormData = {
//         email: 'mockemail@mock.com',
//         password: 'mock password',
//       };

//       it('is a function', () => {
//         expect(typeof wrapper.vm.signUp).toBe('function');
//       });

//       it('calls auth.createUserWithEmailAndPassword with formData', () => {
//         wrapper.setData({
//           formData: mockFormData,
//         });
//         wrapper.vm.signUp();
//         expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(mockFormData.email, mockFormData.password);
//       });

//       it('calls createCandidate() if createUserWithEmailAndPassword succeeded', async () => {
//         const mockUserCredentials = 'mock user credentials';
//         auth.createUserWithEmailAndPassword.mockResolvedValue(mockUserCredentials);
//         wrapper.vm.createCandidate = vi.fn();

//         await wrapper.vm.signUp();

//         expect(wrapper.vm.createCandidate).toHaveBeenCalledWith(mockUserCredentials);
//       });
//     });

//     describe('createCandidate()', () => {
//       const mockUserCredentials = {
//         user: 'mockUser',
//       };
//       it('is a function', () => {
//         expect(typeof wrapper.vm.createCandidate).toBe('function');
//       });

//       it('sets current user', async () => {
//         await wrapper.vm.createCandidate(mockUserCredentials);
//         expect(mocks.store.dispatch).toHaveBeenCalledWith('auth/setCurrentUser', mockUserCredentials.user);
//       });

//       it('creates candidate document', async () => {
//         const mockTimestamp = 'mock timestamp';
//         firebase.firestore.FieldValue.serverTimestamp.mockReturnValue(mockTimestamp);

//         await wrapper.vm.createCandidate(mockUserCredentials);
//         expect(mocks.store.dispatch).toHaveBeenCalledWith('candidate/create', {
//           created: mockTimestamp,
//         });
//       });

//       it('saves formdata to candidate personal details', async () => {
//         const mockFormData = {
//           title: 'Mr',
//           firstName: 'Tom',
//           lastName: 'Smith',
//           fullName: 'Tom Smith',
//           email: 'tom-smith@testing.com',
//           dateOfBirth: new Date(),
//           nationalInsuranceNumber: 'mock NIN',
//         };

//         wrapper.setData({
//           formData: mockFormData,
//         });

//         await wrapper.vm.createCandidate(mockUserCredentials);
//         expect(mocks.store.dispatch).toHaveBeenCalledWith('candidate/savePersonalDetails', mockFormData);
//       });
//     });
//   });
// });

it('empty suite', () => {

});
