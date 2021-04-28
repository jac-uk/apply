import { createTestSubject } from '../../helpers';

import Password from '@/components/Form/Password';

describe('components/Form/Password', () => {
  let prop;
  describe('props', () => {

      describe('inputClass', () => {
          beforeEach(() => {
              prop = Password.props.inputClass;
          });
          it('is a string', () => {
              expect(prop.type()).toBeString();
          });
          it('defaults as an empty string', () => {
              expect(prop.default).toBe('');
          });
      });

      describe('value', () => {
        beforeEach(() => {
            prop = Password.props.value;
        });
        it('is not required', () => {
            expect(prop.required).toBeFalsy();
        });
        it('is a string', () => {
            expect(prop.type()).toBeString();
        });
        it('defaults as an empty string', () => {
            expect(prop.default).toBe('');
        });
    });

    describe('type', () => {
      beforeEach(() => {
          prop = Password.props.type;
      });
      it('is not required', () => {
          expect(prop.required).toBeFalsy();
      });
      it('is a string', () => {
          expect(prop.type()).toBeString();
      });
      it('defaults as an empty \'current-password\'', () => {
          expect(prop.default).toBe('current-password');
      });
  });
  });
  describe('component instance', () => {

  let wrapper;
  const mockProps = {
    id: 'mockId',
    label: 'mock label',
  };

  beforeEach(() => {
    wrapper = createTestSubject(Password, {
      mocks: {},
      stubs: [],
      propsData: mockProps,
    });
  }); 

  it('renders the component', () => {
    expect(wrapper.exists()).toBeTrue();
  });

  describe('template', () => {
    describe('label', () => {
      it('sets the label to the value of the `label` prop', () => {
        wrapper.setProps({ label: 'My Form Label' });
        expect(wrapper.find('label').text()).toBe('My Form Label');
      });
    });

    describe('hint', () => {
      let hint;
      describe('when the prop is set', () => {
        beforeEach(() => {
          wrapper.setProps({ hint: 'my_hint' });
          hint = wrapper.find('.govuk-hint');
        });

        it('shows a hint', () => {
          expect(hint.exists()).toBe(true);
        });
        it('sets the hint to the value of the `hint` prop', () => {
          expect(hint.text()).toBe('my_hint');
        });
      });

      describe('when the prop is not set', () => {
        beforeEach(() => {
          hint = wrapper.find('.govuk-hint');
        });

        it('does not show hint', () => {
          expect(hint.exists()).toBe(false);
        });
      });
    });

    describe('id', () => {
      it('sets <label> `for` attribute', () => {
        wrapper.setProps({ id: 'my_unique_key' });
        expect(wrapper.find('label').attributes().for).toBe('my_unique_key');
      });

      it('sets <input> `id` attribute', () => {
        wrapper.setProps({ id: 'my_unique_key' });
        expect(wrapper.find('input').attributes().id).toBe('my_unique_key');
      });
    });

    describe('inputClass', () => {
      let input;
      beforeEach(() => {
        input = wrapper.find('input');
      });

      describe('when the prop is set', () => {
        beforeEach(() => {
          wrapper.setProps({ inputClass: 'my_styling' });
        });

        it('includes the added value in the <input> `class` attribute', () => {
          expect(input.is('.my_styling')).toBe(true);
        });

        it('has the <input> `class` govuk-input', () => {
          expect(input.is('.govuk-input')).toBe(true);
        });
      });

      describe('when the prop is not set', () => {
        it('has the <input> `class` govuk-input', () => {
          expect(input.is('.govuk-input')).toBe(true);
        });
      });
    });

    describe('type', () => {
      describe('when the prop is set', () => {
        it('sets `autocomplete` to provided type', () => {
          wrapper.setProps({ type: 'my_type' });
          expect(wrapper.find('input').attributes('autocomplete')).toBe('my_type');
        });
      });

      describe('when the prop is not set', () => {
        it('has the default `autocomplete` set to `current-password', () => {
          expect(wrapper.find('input').attributes('autocomplete')).toBe('current-password');
        });
      });
    });

    describe('elements', () => {
      describe('input element', () => {
        it('exists', () => {
          expect(wrapper.find('input').exists()).toBeTrue();
        });

        it('initially has type "password"', () => {
          expect(wrapper.find('input').attributes().type).toEqual('password');
        });

        it('has type "text" if `showPassword` is true', () => {
          wrapper.setData({ showPassword: true });
          expect(wrapper.find('input').attributes().type).toEqual('text');
        });
      });
      describe('visibility button', () => {
        it('exists', () => {
          expect(wrapper.find('button').exists()).toBeTrue();
        });

        it('initially has label set to "Show"', () => {
          expect(wrapper.find('button').text()).toEqual('Show');
        });

        it('label is set to "Hide" if `showPassword` is true', () => {
          wrapper.setData({ showPassword: true });
          expect(wrapper.find('button').text()).toEqual('Hide');
        });
      });
    });

  });

  describe('`v-model` interface', () => {
    describe('when text changes', () => {
      it('emits an input event with the new value', () => {
        wrapper.setData({ text: 'new-value' });
        expect(wrapper.emitted().input).toEqual([['new-value']]);
      });
    });

    describe('when value prop changes', () => {
      it('updates the `text` computed property', () => {
        wrapper.setProps({ value: 'my_value' });
        expect(wrapper.vm.text).toEqual('my_value');
      });
    });
  });

  describe('methods', () => {
    describe('toggleVisibility()', () => {
      it('should toggle `showPassword` when called', () => {
        const initialValue = wrapper.vm.showPassword;
        wrapper.vm.toggleVisibility();
        expect(wrapper.vm.showPassword).toEqual(!initialValue);
      });
    });

    describe('handleValidatePassword()', () => {
      beforeEach(() => {
        wrapper.vm.validatePassword = jest.fn().mockName('validatePassword');
      });

      it('should call validatePassword even if error already exists', () => {
        wrapper.setData({ errorMessage: 'mock error' });
        wrapper.vm.handleValidatePassword();
        expect(wrapper.vm.validatePassword).toHaveBeenCalled();
      });

      it('should call validatePassword() with value if no errors yet', () => {
        wrapper.setData({ errorMessage: null });
        wrapper.setProps({ value: 'mock value' });

        wrapper.vm.handleValidatePassword();
        expect(wrapper.vm.validatePassword).toHaveBeenCalledWith(wrapper.vm.value);
      });

      it('should call validatePassword() with value if no errors yet and called with event', () => {
        const mockEvent = {
          target: {
            value: 'mock event value',
          },
        };
        wrapper.setData({ errorMessage: null });

        wrapper.vm.handleValidatePassword(mockEvent);
        expect(wrapper.vm.validatePassword).toHaveBeenCalledWith(mockEvent.target.value);
      });
    });

    describe('validatePassword()', () => {
      beforeEach(() => {
        wrapper.vm.setError = jest.fn().mockName('setError');
      });

      describe('capital letters', () => {
        it('should set error if argument doesn\'t contain any', () => {
          wrapper.vm.validatePassword('password');
          expect(wrapper.vm.setError).toHaveBeenCalledWith(`${mockProps.label} must include at least one capital letter.`);
        });
        it('should not set error if argument contains at least one', () => {
          wrapper.vm.validatePassword('Password');
          expect(wrapper.vm.setError).not.toHaveBeenCalledWith(`${mockProps.label} must include at least one capital letter.`);
        });
      });

      describe('digits', () => {
        it('should set error if argument doesn\'t contain any', () => {
          wrapper.vm.validatePassword('password');
          expect(wrapper.vm.setError).toHaveBeenCalledWith(`${mockProps.label} must include at least one digit.`);
        });
        it('should not set error if argument contains at least one', () => {
          wrapper.vm.validatePassword('passw0rd');
          expect(wrapper.vm.setError).not.toHaveBeenCalledWith(`${mockProps.label} must include at least one digit.`);
        });
      });

      describe('special characters', () => {
        it('should set error if argument doesn\'t contain any', () => {
          wrapper.vm.validatePassword('password');
          expect(wrapper.vm.setError).toHaveBeenCalledWith(`${mockProps.label} must include at least one special character - for example £, #, @, !, %, -, &, *.`);
        });
        it('should not set error if argument contain at least one', () => {
          wrapper.vm.validatePassword('p@ssword');
          expect(wrapper.vm.setError).not.toHaveBeenCalledWith(`${mockProps.label} must include at least one special character - for example £, #, @, !, %, -, &, *.`);
        });
      });
      
      describe('length', () => {
        it('should set error if argument is not long enough', () => {
          wrapper.vm.validatePassword('p@sswor');
          expect(wrapper.vm.setError).toHaveBeenCalledWith(`${mockProps.label} should be 8 or more characters long`);
        });
        it('should not set error if argument is long enough', () => {
          wrapper.vm.validatePassword('p@ssword');
          expect(wrapper.vm.setError).not.toHaveBeenCalledWith(`${mockProps.label} should be 8 or more characters long`);
        });
      });

      describe('consecutive repeating characters', () => {
        it('should set error if argument contains more than 2', () => {
          wrapper.vm.validatePassword('passsword');
          expect(wrapper.vm.setError).toHaveBeenCalledWith(`${mockProps.label} must include no more than 2 consecutive repeating characters.`);
        });
        it('should not set error if argument doesn\'t contain any', () => {
          wrapper.vm.validatePassword('pas5word');
          expect(wrapper.vm.setError).not.toHaveBeenCalledWith(`${mockProps.label} must include no more than 2 consecutive repeating characters.`);
        });
        it('should not set error if argument contains exactly two', () => {
          wrapper.vm.validatePassword('password');
          expect(wrapper.vm.setError).not.toHaveBeenCalledWith(`${mockProps.label} must include no more than 2 consecutive repeating characters.`);
        });
      });
    });
  });
  });
});
