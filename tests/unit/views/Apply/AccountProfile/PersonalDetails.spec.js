// @FIXME@ *form/queryselector* this suite somehow interacts with the Form 
//  component and errors due to the queryselector

import PersonalDetails from '@/views/Apply/AccountProfile/PersonalDetails';
import { createTestSubject } from '../../../helpers';

import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';

xdescribe('@/views/Apply/AccountProfile/PersonalDetails', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(PersonalDetails, {
      mocks: [],
      stubs: [],
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

    it('contains a <form>', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('the <form> contains a "Save and continue" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Save and continue');
    });

    it('renders the TextField components', () => {
      expect(wrapper.find(TextField).exists()).toBe(true);
    });

    it('renders the DateInput components', () => {
      expect(wrapper.find(DateInput).exists()).toBe(true);
    });
  });
});
