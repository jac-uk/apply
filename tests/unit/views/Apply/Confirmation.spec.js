import Confirmation from '@/views/Apply/Confirmation';
import { shallowMount } from '@vue/test-utils';

describe('views/Confirmation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Confirmation);
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
