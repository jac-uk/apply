import JobAdvert from '@/views/JobAdvert';
import { shallowMount } from '@vue/test-utils';

describe('views/JobAdvert', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(JobAdvert);
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
