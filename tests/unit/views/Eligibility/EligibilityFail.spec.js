import EligibilityFail from '@/views/Eligibility/EligibilityFail';
import { createTestSubject } from '../../helpers';

describe('views/Eligibility/EligibilityFail', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(EligibilityFail, {
      mocks: {},
      stubs: ['RouterLink'],
      propsData: {},
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

});
