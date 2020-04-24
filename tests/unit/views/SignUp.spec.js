import { createTestSubject, mocks } from '../helpers';
import SignUp from '@/views/SignUp';

import '@/firebase';
import firebase from '@firebase/app';

const mockCreateUserWithEmailAndPassword = jest.fn();
jest.mock('@/firebase', () => {
  return {
    auth: () => ({
      createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    }),
  };
});

jest.mock('@firebase/app', () => {
  return {
    firestore: {
      FieldValue: {
        serverTimestamp: jest.fn(),
      },
    },
  };
});

describe('views/SignUp', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(SignUp, {
      stubs: ['RouterLink'],
    });
  });

  describe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <form>', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('contains expected fields', () => {
      expect(wrapper.find('#fullName').exists()).toBe(true);
      expect(wrapper.find('#email').exists()).toBe(true);
      expect(wrapper.find('#password').exists()).toBe(true);
      expect(wrapper.find('#date-of-birth').exists()).toBe(true);
      expect(wrapper.find('#national-insurance-number').exists()).toBe(true);
    });

    it('contains a "Continue" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Continue');
    });
  });

  describe('methods', () => {

    describe('scrollToTop()', () => {
      it('is a function', () => {
        expect(typeof wrapper.vm.scrollToTop).toBe('function');
      });

      it('scrolls to top', () => {
        wrapper.vm.$el.scrollIntoView = jest.fn();
        wrapper.vm.scrollToTop();
        expect(wrapper.vm.$el.scrollIntoView).toHaveBeenCalled();
      });
    });

    describe('onSubmit()', () => {
      beforeEach(() => {
        wrapper.vm.validate = jest.fn();
        wrapper.vm.scrollToTop = jest.fn();
      });

      it('is a function', () => {
        expect(typeof wrapper.vm.onSubmit).toBe('function');
      });

      it('calls validate()', () => {
        wrapper.vm.onSubmit();
        expect(wrapper.vm.validate).toHaveBeenCalled();
      });

      it('if validate() passed, calls signUp()', () => {
        wrapper.vm.isValid = jest.fn().mockReturnValue(true);
        wrapper.vm.signUp = jest.fn();

        wrapper.vm.onSubmit();
        expect(wrapper.vm.signUp).toHaveBeenCalled();

      });

      it('if signUp failed, sets error and calls scrollToTop()', async () => {
        wrapper.vm.isValid = jest.fn().mockReturnValue(true);
        wrapper.vm.signUp = jest.fn().mockRejectedValue(new Error('Mock error'));

        await wrapper.vm.onSubmit();

        expect(wrapper.vm.errors).toBeArrayOfSize(1);
        expect(wrapper.vm.scrollToTop).toHaveBeenCalled();
      });
    });

    describe('signUp()', () => {
      const mockFormData = {
        email: 'mock email',
        password: 'mock password',
      };

      it('is a function', () => {
        expect(typeof wrapper.vm.signUp).toBe('function');
      });

      it('calls auth().createUserWithEmailAndPassword with formData', () => {
        wrapper.setData({
          formData: mockFormData,
        });
        wrapper.vm.signUp();
        expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(mockFormData.email, mockFormData.password);
      });

      it('calls createCandidate() if createUserWithEmailAndPassword succeeded', async () => {
        const mockUserCredentials = 'mock user credentials';
        mockCreateUserWithEmailAndPassword.mockResolvedValue(mockUserCredentials);
        wrapper.vm.createCandidate = jest.fn();

        await wrapper.vm.signUp();

        expect(wrapper.vm.createCandidate).toHaveBeenCalledWith(mockUserCredentials);
      });

      it('redirects to vacancy if createCandidate succeeded', async () => {
        wrapper.vm.createCandidate = jest.fn().mockReturnValue(true);
        mocks.store.getters['vacancy/id'] = null;

        await wrapper.vm.signUp();

        expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'applications' });
      });

      it('redirects to vacancy if createCandidate succeeded and got vacancy id', async () => {
        const mockVacancyId = 'mock vacancy id';

        wrapper.vm.createCandidate = jest.fn().mockReturnValue(true);
        mocks.store.getters['vacancy/id'] = mockVacancyId;

        await wrapper.vm.signUp();

        expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ path: `/apply/${mockVacancyId}` });
      });

    });

    describe('createCandidate()', () => {
      const mockUserCredentials = {
        user: 'mockUser',
      };
      it('is a function', () => {
        expect(typeof wrapper.vm.createCandidate).toBe('function');
      });

      it('sets current user', async () => {
        await wrapper.vm.createCandidate(mockUserCredentials);
        expect(mocks.store.dispatch).toHaveBeenCalledWith('auth/setCurrentUser', mockUserCredentials.user);
      });

      it('creates candidate document', async () => {
        const mockTimestamp = 'mock timestamp';
        firebase.firestore.FieldValue.serverTimestamp.mockReturnValue(mockTimestamp);

        await wrapper.vm.createCandidate(mockUserCredentials);
        expect(mocks.store.dispatch).toHaveBeenCalledWith('candidate/create', {
          created: mockTimestamp,
        });
      });

      it('saves formdata to candidate personal details', async () => {
        const mockFormData = {
          fullName: 'mock name',
          email: 'mock email',
          dateOfBirth: new Date(),
          nationalInsuranceNumber: 'mock NIN',
        };

        wrapper.setData({
          formData: mockFormData,
        });

        await wrapper.vm.createCandidate(mockUserCredentials);
        expect(mocks.store.dispatch).toHaveBeenCalledWith('candidate/savePersonalDetails', mockFormData);
      });
    });
  });
});
