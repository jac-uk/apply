import PostQualificationWorkExperience from '@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience';
import { shallowMount } from '@vue/test-utils';
import RepeatableFields from '@/components/RepeatableFields';

const createTestSubject = () => {
  return shallowMount(PostQualificationWorkExperience);
};

describe('@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience', () => {
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

    it('the <form> contains a "Continue" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Continue');
    });

    it('renders the RepeatableFields components', () => {
      expect(wrapper.find(RepeatableFields).exists()).toBe(true);
    });
  });
});
