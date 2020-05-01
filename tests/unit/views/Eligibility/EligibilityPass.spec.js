import EligibilityPass from '@/views/Eligibility/EligibilityPass';
import { createTestSubject } from '../../helpers';

describe('views/Eligibility/EligibilityPass', () => {
  describe('component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(EligibilityPass, {
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
});
