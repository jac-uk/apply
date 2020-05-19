import JobAdvert from '@/views/JobAdvert';
import { createTestSubject } from '../helpers';

describe('views/JobAdvert', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(JobAdvert, {
      propsData: {},
      stubs: [],
    });
  });

  describe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <h1>', () => {
      expect(wrapper.contains('h1')).toBe(true);
    });
  });

  describe('computed', () => {
    it('timeline returns an array', () => {
      expect(wrapper.vm.timeline).toBeArray();
    });
  });

});
