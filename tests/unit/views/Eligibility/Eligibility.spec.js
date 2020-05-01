import Eligibility from '@/views/Eligibility/Eligibility';
import { createTestSubject } from '../../helpers';

describe('views/Eligibility/Eligibility', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(Eligibility, {
      mocks: {},
      stubs: ['RouterView'],
      propsData: {},
    });
  });

  describe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });
  });
});
