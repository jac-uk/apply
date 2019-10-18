import Review from '@/views/Apply/FinalCheck/Review';
import { shallowMount } from '@vue/test-utils';

const createTestSubject = () => {
  return shallowMount(Review, {
    stubs: {
      'RouterLink': true,
    },
  });
};

describe('views/Apply/FinalCheck', () => {
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

    it('the <form> contains a "Send application" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Send application');
    });
  });
});
