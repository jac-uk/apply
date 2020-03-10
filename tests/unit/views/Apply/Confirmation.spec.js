import Confirmation from '@/views/Apply/FinalCheck/Confirmation';
import { shallowMount } from '@vue/test-utils';

xdescribe('views/Confirmation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Confirmation);
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
