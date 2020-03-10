import EligibilityFail from '@/views/Eligibility/EligibilityFail';
import { shallowMount } from '@vue/test-utils';

const mockStore = {
  state: {
    exercise: {
      record: {},
    },
  },
  getters: {
    'auth/isSignedIn': () => { },
  },
};

xdescribe('views/Eligibility/EligibilityFail', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EligibilityFail, { mocks: {
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
