import EligibilityFail from '@/views/EligibilityFail';
import { shallowMount } from '@vue/test-utils';

describe('views/EligibilityFail', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EligibilityFail);
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
