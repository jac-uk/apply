import Confirmation from '@/views/Apply/FinalCheck/Confirmation';
import { createTestSubject } from '../../helpers';

describe('views/Confirmation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(Confirmation,{
      propsData: [],
      stubs:['RouterLink'],
    });
    // getting a warning due to formatDate filter failing, appears we need to mock shortlistingoutcome 
    // something along the lines of below?
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
