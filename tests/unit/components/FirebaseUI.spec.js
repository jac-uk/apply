// import { createTestSubject } from '../helpers';
// import FirebaseUI from '@/components/FirebaseUI';
// import firebaseui from 'firebaseui';
// import { auth } from '@/firebase';
// import { vi } from 'vitest';

// const mockUiInstance = {
//   start: vi.fn(),
//   delete: vi.fn(),
// };

// // Can these mocks be moved to helpers?
// // if so how do we move them over, if not
// // when should logic be added to helpers?
// vi.mock('@/firebase', () => {
//   return {
//     auth: {
//       EmailAuthProvider: {
//         PROVIDER_ID: 'email',
//         EMAIL_LINK_SIGN_IN_METHOD: true,
//         requireDisplayName: true,
//       },
//     },
//   };
// });

// vi.mock('firebaseui', () => (
//   { auth: {
//     AuthUI: vi.fn(() => mockUiInstance),
//     CredentialHelper: {
//       NONE: 'none',
//     },
//   },
// }));

// describe('FirebaseUI component', () => {
//   let wrapper;
//   beforeAll(() => {
//     wrapper = createTestSubject(FirebaseUI,{
//       propsData: {},
//       stubs: [],
//     });
//   });

//   it('renders the component', () => {
//     expect(wrapper.exists()).toBe(true);
//   });

//   it('renders a firebaseui-auth-container element in DOM', () => {
//     expect(wrapper.find('#firebaseui-auth-container').exists()).toBe(true);
//   });

//   it('creates a FirebaseUI instance bound to the Firebase Auth instance', () => {
//     expect(firebaseui.auth.AuthUI).toHaveBeenCalledWith(auth);
//     expect(wrapper.vm.ui).toBe(mockUiInstance);
//   });

//   it('starts FirebaseUI', () => {
//     expect(mockUiInstance.start).toHaveBeenCalledTimes(1);
//     expect(mockUiInstance.start).toHaveBeenCalledWith(
//       '#firebaseui-auth-container',
//       wrapper.vm.uiConfig
//     );
//   });

//   it('passes the right config into FirebaseUI', () => {
//     const uiConfigOptions = {
//       signInOptions: [
//         {
//           provider: auth.EmailAuthProvider.PROVIDER_ID,
//           signInMethod: auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
//         },
//       ],
//       credentialHelper: firebaseui.auth.CredentialHelper.NONE,
//       callbacks: {
//         signInSuccessWithAuthResult: wrapper.vm.signInSuccess,
//       },
//     };

//     expect(wrapper.vm.uiConfig).toEqual(uiConfigOptions);
//   });

//   it('emits a signInSuccess event containing an authResult object', () => {
//     const authResult = {
//       additionalUserInfo: {},
//       credential: null,
//       operationType: 'signIn',
//       user: {},
//     };

//     wrapper.vm.signInSuccess(authResult);
//     expect(wrapper.emitted().signInSuccess).toHaveLength(1);
//     expect(wrapper.emitted().signInSuccess[0]).toEqual([authResult]);
//   });

//   it('destroys the FirebaseUI instance when the component is destroyed', () => {
//     wrapper.destroy();
//     expect(mockUiInstance.delete).toBeCalledTimes(1);
//   });

// });

it('empty suite', () => {

});
