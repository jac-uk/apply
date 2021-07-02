import { createTestSubject } from '../../../helpers';

const PostQualificationWorkExperience = 'remove me';
// import PostQualificationWorkExperience from '@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience';

xdescribe('@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(PostQualificationWorkExperience, {
      mocks: {},
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

    it('the <form> contains a "Continue" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Save and continue');
    });

    it('renders the RepeatableFields components', () => {
      expect(wrapper.find('RepeatableFields-stub').exists()).toBe(true);
    });
  });
});
