// @FIXME@ *filters and mocked data*
// Filters are not working for mocked data

import Confirmation from '@/views/Apply/FinalCheck/Confirmation.vue';
import { createTestSubject } from '../../../helpers';

describe.skip('views/Confirmation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(Confirmation,{
      propsData: [],
      stubs: ['RouterLink'],
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
