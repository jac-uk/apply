import { createTestSubject } from '../../helpers';
import Currency from '@/components/Form/Currency';

describe('components/Form/Currency', () => {
  describe('props', () => {
    describe('value', () => {
      let prop;
      beforeEach(() => {
        prop = Currency.props.value;
      });
      it('is not required', () => {
        expect(prop.required).toBeFalsy();
      });
      it('defaults as null', () => {
        expect(prop.default).toBe(null);
      });
      it('is a string', () => {
        expect(prop.type).toBeString;
      });
    });
  });

  describe('component instance', () => {
    let wrapper;
    const mockProps = {
      id: 'mockId',
      label: 'mockFormLabel',
      hint: 'mockHint',
      errorMessage: 'mockError',
      key: 'mockKey',
      currencyInput: 'newVal',
    };
    beforeEach(() => {
      wrapper = createTestSubject(Currency, {
        propsData: mockProps,
        stubs: ['FormFieldError'],
      });
    });

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true);
    });

    describe('template', () => {

      describe('containing div', () => {
        describe('with errorMessage', () => {
          it('has gov-uk-form-group--error class', async () => {
            await wrapper.setData({ errorMessage: mockProps.errorMessage });
            expect(wrapper.find('div').attributes('class')).toContain('govuk-form-group--error');
          });
        });
        describe('without errorMessage', () => {
          it('doesn\'t have gov-uk-form-group--error class', async () => {
            await wrapper.setData({ errorMessage: null });
            expect(wrapper.find('div').attributes('class')).not.toContain('govuk-form-group--error');
          });
        });
      });

      describe('label', () => {
          it('sets the label to the value of the `label` prop', async () => {
            await wrapper.setProps({ label: mockProps.label });
            expect(wrapper.find('label').text()).toBe(mockProps.label);
          });
          it('id sets `for` attribute', () => {
            // wrapper.setProps({ id: mockProps.id });
            expect(wrapper.find('label').attributes().for).toBe(mockProps.id);
          });
          it('has govuk-heading-m govuk-!-margin-bottom-2 classes', () => {
            expect(wrapper.find('label').attributes('class')).toBe('govuk-heading-m govuk-!-margin-bottom-2');
          });
      });

      describe('hint span', () => {
        let hint;
        describe('when the prop is set', () => {
          beforeEach(() => {
            hint = wrapper.find('.govuk-hint');
          });
          it('shows a hint', () => {
            expect(hint.exists()).toBe(true);
          });
          it('sets the hint to the value of the `hint` prop', () => {
            expect(hint.text()).toBe(mockProps.hint);
          });
        });
        describe('when the prop is not set', () => {
          beforeEach(async () => {
            await wrapper.setProps({ hint: null });
            hint = wrapper.find('.govuk-hint');
          });
          it('does not show hint', () => {
            expect(hint.exists()).toBe(false);
          });
        });
      });

      describe('FormFieldError', () => {
        it('id sets `id` attribute', () => {
          expect(wrapper.find('formfielderror-stub').attributes().id).toBe(mockProps.id);
        });

        it('errorMessage sets `error-message` attribute', async () => {
          await wrapper.setData({ errorMessage: mockProps.errorMessage });
          expect(wrapper.find('formfielderror-stub').attributes().errormessage).toBe(mockProps.errorMessage);
        });
      });

      describe('input', () => {
        it('id sets `id` attribute', () => {
          expect(wrapper.find('input').attributes().id).toBe(mockProps.id);
        });
        it('has govuk-input moj-input__currency govuk-input--width-10 classes', () => {
          expect(wrapper.find('input').attributes('class')).toBe('govuk-input moj-input__currency govuk-input--width-10');
        });
        it('has input type of number', () => {
          expect(wrapper.find('input').attributes('type')).toBe('number');
        });
      });
      describe('currency label span', () => {
        it('contains \'£\' text', () => {
          expect(wrapper.findAll('span').at(1).text()).toBe('£');
        });
        it('has x class', () => {
          expect(wrapper.findAll('span').at(1).attributes('class')).toBe('moj-label__currency');
        });
      });
    });

    describe('computed', () => {
      describe('currencyInput', () => {
        beforeEach(async () => {
          await wrapper.setProps({ value: 'test123' });
        });

        it('returns value prop', () => {
          expect(wrapper.vm.currencyInput).toBe(wrapper.vm.value);
        });

        it('emits value (set) on change', async () => {
          await wrapper.setData({ currencyInput: mockProps.currencyInput });
          expect(wrapper.emitted().input[0][0]).toBe(mockProps.currencyInput);
        });
      });
    });
  });
});
