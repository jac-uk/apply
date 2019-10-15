import SelfAssessmentCompetencies from '@/views/Apply/Assessments/SelfAssessmentCompetencies';
import { shallowMount } from '@vue/test-utils';

const createTestSubject = () => {
  return shallowMount(SelfAssessmentCompetencies);
};

describe('views/Assessments/SelfAssessmentCompetencies', () => {
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

    it('contains a govuk file upload', () => {
      expect(wrapper.contains('.govuk-file-upload')).toBe(true);
    });
  });
});
