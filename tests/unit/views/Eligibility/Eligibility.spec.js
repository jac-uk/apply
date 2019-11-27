import Eligibility from '@/views/Eligibility/Eligibility';
import { shallowMount } from '@vue/test-utils';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';

const mockStore = {
  state: {
    exercise: {
      record: {},
    },
  },
};

const createTestSubject = () => {
  return shallowMount(Eligibility, { mocks: {
    $store: mockStore,
  } });
};

describe('views/Eligibility/Eligibility', () => {
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

    it('renders the RadioGroup components', () => {
      expect(wrapper.find(RadioGroup).exists()).toBe(true);
    });

    it('renders the RadioItem components', () => {
      expect(wrapper.find(RadioItem).exists()).toBe(true);
    });
  });
});
