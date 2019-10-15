import AssessorDetails from '@/views/Apply/Assessments/AssessorsDetails';
import { shallowMount } from '@vue/test-utils';
import TextField from '@/components/Form/TextField';

const createTestSubject = () => {
  return shallowMount(AssessorDetails);
};

describe('views/Assessments/AssessorDetails', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject();
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

    it('renders the TextField component', () => {
      expect(wrapper.find(TextField).exists()).toBe(true);
    });
  });
});
