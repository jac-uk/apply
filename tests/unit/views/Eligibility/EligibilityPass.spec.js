import EligibilityPass from '@/views/Eligibility/EligibilityPass';
import { shallowMount } from '@vue/test-utils';

const mockStore = {
  state: {
    exercise: {
      record: {},
    },
  },
  getters: {
    'auth/isSignedIn': () => {},
  },
};

xdescribe('views/Eligibility/EligibilityPass', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EligibilityPass, { mocks: {
      $store: mockStore,
    } });
  });

  xdescribe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <h1>', () => {
      expect(wrapper.contains('h1')).toBe(true);
    });
  });

});
