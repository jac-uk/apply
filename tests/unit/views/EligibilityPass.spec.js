import EligibilityPass from '@/views/EligibilityPass';
import { shallowMount } from '@vue/test-utils';

describe('views/EligibilityPass', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EligibilityPass);
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
