import PostQualificationWorkExperience from '@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience';
import { shallowMount } from '@vue/test-utils';
import RepeatableFields from '@/components/RepeatableFields';

const application = {};

const mockStore = {
  dispatch: jest.fn(),
  state: {
    application: {
      record: {},
    },
  },
  getters: {
    'application/data': () => application,
  },
};

const createTestSubject = () => {
  return shallowMount(PostQualificationWorkExperience, {
    mocks: {
      $store: mockStore,
    },
  });
};

xdescribe('@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject();
  });

  xdescribe('template', () => {
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
