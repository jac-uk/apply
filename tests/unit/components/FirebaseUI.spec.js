import { shallowMount } from '@vue/test-utils';
import FirebaseUI from '@/components/FirebaseUI';

const mockFirebaseAuth = jest.fn();

import { auth } from '@/firebase';
jest.mock('@/firebase', () => {
  const mock = {
    auth: jest.fn(() => (mockFirebaseAuth)),
  };
  mock.auth.EmailAuthProvider = {
    PROVIDER_ID: 'email',
  };
  return mock;
});

const mockUiInstance = {
  start: jest.fn(),
  delete: jest.fn(),
};

import firebaseui from 'firebaseui';
jest.mock('firebaseui', () => {
  return {
    auth: {
      AuthUI: jest.fn(() => mockUiInstance),
      CredentialHelper: {
        NONE: 'none',
      },
    },
  };
});

describe('FirebaseUI component', () => {
  const createTestSubject = () => {
    jest.clearAllMocks();
    return shallowMount(FirebaseUI);
  };

  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject();
  });

  describe('start FirebaseUI when the component is mounted', () => {
    it('renders a DOM element "#firebaseui-auth-container"', () => {
      expect(wrapper.find('#firebaseui-auth-container').exists()).toBe(true);
    });

    it('creates a FirebaseUI instance bound to the Firebase Auth instance', () => {
      expect(firebaseui.auth.AuthUI).toHaveBeenCalledWith(mockFirebaseAuth);
      expect(wrapper.vm.ui).toBe(mockUiInstance);
    });

    it('starts FirebaseUI', () => {
      expect(mockUiInstance.start).toHaveBeenCalledTimes(1);
      expect(mockUiInstance.start).toHaveBeenCalledWith(
        '#firebaseui-auth-container',
        wrapper.vm.uiConfig
      );
    });
  });

  it('starts FirebaseUI with the expected config', () => {
    expect(wrapper.vm.uiConfig).toEqual({
      signInOptions: [
        {
          provider: auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      callbacks: {
        signInSuccessWithAuthResult: wrapper.vm.signInSuccess,
      },
    });
  });

  describe('#signInSuccess', () => {
    it('emits a `signInSuccess` event containing an authResult object', () => {
      const authResult = {
        additionalUserInfo: {},
        credential: null,
        operationType: 'signIn',
        user: {},
      };
      wrapper.vm.signInSuccess(authResult);
      expect(wrapper.emitted().signInSuccess).toHaveLength(1);
      expect(wrapper.emitted().signInSuccess[0]).toEqual([authResult]);
    });

    // Returning false will stop FirebaseUI from performing a window.location redirect
    // This behaviour is documented here: https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
    it('returns false', () => {
      expect(wrapper.vm.signInSuccess()).toBe(false);
    });
  });

  it('destroys the FirebaseUI instance when the component is destroyed', () => {
    wrapper.destroy();
    expect(mockUiInstance.delete).toBeCalledTimes(1);
  });
});
