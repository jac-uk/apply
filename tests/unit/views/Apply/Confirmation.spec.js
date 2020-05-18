// this suite gives a warning due to an change event in the mount

import Confirmation from '@/views/Apply/FinalCheck/Confirmation';
import { createTestSubject } from '../../helpers';

xdescribe('views/Confirmation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(Confirmation,{
      propsData: [],
      stubs:['RouterLink'],
    });
    // getting a warning due to formatDate filter failing 
    // appears we need to mock shortlistingoutcome 
    // something along the lines of below?
    // do we put it here or in the helper
    // wrapper.vm.$store.state.vacancy.record = { shortlistingOutcome: new Date };
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
