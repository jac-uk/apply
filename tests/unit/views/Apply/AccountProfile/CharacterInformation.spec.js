import CharacterInformation from '@/views/Apply/AccountProfile/CharacterInformation';
import { createTestSubject } from '../../../helpers';

describe('@/views/Apply/AccountProfile/CharacterInformation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(CharacterInformation, {
      propsData: {},
      stubs: ['RadioGroup','RadioItem'],
    });
  });
  
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('template', () => {
  
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
      expect(wrapper.find('RadioGroup-stub').exists()).toBe(true);
    });

    it('renders the RadioItem components', () => {
      expect(wrapper.find('RadioItem-stub').exists()).toBe(true);
    });
  });

});
