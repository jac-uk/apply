import { shallowMount } from '@vue/test-utils';
import Currency from '@/components/Form/Currency';

describe('components/Form/Currency', () => {
  let wrapper;
  const mockProps = {
    id: 'mockId',
    // label: 'mock label',
  };
  beforeEach(() => {
    wrapper = shallowMount(Currency, {
        props: mockProps,
    });
  });
  
  describe('template', () => {
    describe('label', () => {
        it('sets the label to the value of the `label` prop', () => {
          wrapper.setProps({ label: 'My Form Label' });
          expect(wrapper.find('label').text()).toBe('My Form Label');
        });
  });

  describe('components', () => {
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
      });
  });
  
  describe('extends', () => {

  });

  describe('props', () => {
    let props;
    beforeEach(() => {
      props = wrapper.vm.$options.props;
    });
    describe('value', () => {
        it('is not required', () => {
            expect(props.value.required).toBeFalsy();
        });
        it('defaults as null', () => {
            expect(props.value.default).toBe(null);
        });
        it('is a string', () => {
            expect(props.value.type).toBeString;
        });
    });
  });
  
  describe('computed', () => {
      describe('currencyInput', () => {
          beforeEach(() => {
              wrapper.setProps({ value: 'test123' });
          });

          it('get', () => {
            expect(wrapper.vm.currencyInput).toBe(wrapper.vm.value);
          });

          xit('set', () => {
              wrapper.vm.currencyInput.set('test123');
              expect(wrapper.vm.value).toBe('??');
          });
    });
  });    

  xdescribe('`v-model` interface', () => {
    describe('when `currencyInput` changes', () => {
      it('emits an input event with the new value', () => {
        wrapper.setData({ currencyInput: '25' });
        expect(wrapper.emitted().input).toEqual([['25']]);
      });
    });

    describe('when value prop changes', () => {
      it('updates the `currencyInput` computed property', () => {
        wrapper.setProps({ value: 25 });
        expect(wrapper.vm.currencyInput).toEqual(25);
      });
    });
  });

});

    xdescribe('hint', () => {
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

    it('tests for £ exists', () => {
      expect(wrapper.find('.moj-label__currency').text()).toBe('£');
     });
  });

  xdescribe('`v-model` interface', () => {
    describe('when `currencyInput` changes', () => {
      it('emits an input event with the new value', () => {
        // wrapper.setData({ currencyInput: '25' });
        // expect(wrapper.emitted().input).toEqual([['25']]);
      });
    });

    describe('when value prop changes', () => {
      it('updates the `currencyInput` computed property', () => {
        // wrapper.setProps({ value: 25 });
        // expect(wrapper.vm.currencyInput).toEqual(25);
      });
    });
  });
