import ResetPassword from '@/views/ResetPassword';
import TextField from '@/components/Form/TextField';
import { auth } from '@/firebase';
import { createTestSubject } from '../helpers';

const fullPath = 'fullPath';
const mockRouter = {
  resolve: jest.fn().mockReturnValue({
    route: {
      fullPath,
    },
  }),
};

jest.mock('@/firebase', () => {
  const sendPasswordResetEmail = jest.fn(() => Promise.resolve());
  const auth = () => ({ sendPasswordResetEmail });
  return { auth };
});

describe('views/ResetPassword', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(ResetPassword,{
      mocks: {
        $router: mockRouter,
      },
      propsData: {
      },
      stubs: [],
    });
  });

  describe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <form>', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('contains an email address field', () => {
      expect(wrapper.find(TextField).exists()).toBe(true);
    });

    it('contains a "Save and continue" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Send the link');
    });
  });

  describe('methods', () => {
    describe('resetPassword', () => {
      it('is a function', () => {
        expect(typeof wrapper.vm.resetPassword).toBe('function');
      });

      it('returns if no email provided', () => {
        wrapper.vm.resetPassword();
        expect(auth().sendPasswordResetEmail).not.toHaveBeenCalled();
      });

      it('calls auth().sendPasswordResetEmail with provided email', () => {
        const email = 'stuff';
        wrapper.vm.formData = { email };

        wrapper.vm.resetPassword();
        expect(auth().sendPasswordResetEmail).toHaveBeenCalledWith(
          email,
          expect.anything()
        );
      });
    });
  });
});
