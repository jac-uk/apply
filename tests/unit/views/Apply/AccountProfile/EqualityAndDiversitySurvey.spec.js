import EqualityAndDiversitySurvey from '@/views/Apply/AccountProfile/EqualityAndDiversitySurvey';
import { shallowMount } from '@vue/test-utils';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextField from '@/components/Form/TextField';
import TextareaInput from '@/components/Form/TextareaInput';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import CheckboxItem from '@/components/Form/CheckboxItem';

const createTestSubject = () => {
  return shallowMount(EqualityAndDiversitySurvey);
};

describe('@/views/Apply/AccountProfile/EqualityAndDiversitySurvey', () => {
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

    it('renders the RadioGroup components', () => {
      expect(wrapper.find(RadioGroup).exists()).toBe(true);
    });

    it('renders the RadioItem components', () => {
      expect(wrapper.find(RadioItem).exists()).toBe(true);
    });

    it('renders the CheckboxGroup components', () => {
      expect(wrapper.find(CheckboxGroup).exists()).toBe(true);
    });

    it('renders the CheckboxItem components', () => {
      expect(wrapper.find(CheckboxItem).exists()).toBe(true);
    });

    it('renders the TextField components', () => {
      expect(wrapper.find(TextField).exists()).toBe(true);
    });

    it('renders the TextareaInput components', () => {
      expect(wrapper.find(TextareaInput).exists()).toBe(true);
    });
  });
});
