import EligibilityPass from '@/views/Eligibility/EligibilityPass';
import { shallowMount } from '@vue/test-utils';

const mockStore = {
  state: {
    exercise: {
      record: {},
    },
  },
};

describe('views/Eligibility/EligibilityPass', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EligibilityPass, { mocks: {
      $store: mockStore,
    } });
  });

  describe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <h1>', () => {
      expect(wrapper.contains('h1')).toBe(true);
    });
  });

});
