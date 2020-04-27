import { shallowMount } from '@vue/test-utils';
import FormField from '@/components/Form/FormField';

describe('components/Form/FormField', () => {
  let wrapper;
  const mockProps = {
    id: 'mockId',
    label: 'mock label',
    bogus: 'bogus',
  };

  beforeEach(() => {
    wrapper = shallowMount(FormField, {
      propsData: mockProps,
    });
  });

  describe('props', () => {
    let props;
    beforeEach(() => {
      props = wrapper.vm.$options.props;
    });
    describe('id', () => {
      it('is required', () => {
        expect(props.id.required).toBeTruthy();
      });
      it('is a String', () => {
        expect(props.id.type).toBe(String);
      });
      it('defaults to an empty string', () => {
        expect(props.id.default).toBe('');
      });
    });
    describe('label', () => {
      it('is a String', () => {
        expect(props.label.type).toBe(String);
      });
    });
    describe('hint', () => {
      it('is a String', () => {
        expect(props.hint.type).toBe(String);
      });
    });
    describe('messages', () => {
      it('is an Object', () => {
        expect(props.messages.type).toBe(Object);
      });
    });
    describe('required', () => {
      it('is a Boolean', () => {
        expect(props.required.type).toBe(Boolean);
      });
    });
    describe('minLength', () => {
      it('is a Number', () => {
        expect(props.minLength.type).toBe(Number);
      });
    });
    describe('maxLength', () => {
      it('is a Number', () => {
        expect(props.maxLength.type).toBe(Number);
      });
    });
    describe('pattern', () => {
      it('is an Object', () => {
        expect(props.pattern.type).toBe(Object);
      });
    });
  });

  describe('computed', () => {
    describe('hasError', () => {
      it('returns true when there\'s an error', () => {
        wrapper.setData({ errorMessage: 'there is an error' });
        expect(wrapper.vm.hasError).toBeTrue();
      });
      it('returns false when there\'s no error', () => {
        wrapper.setData({ errorMessage: null });
        expect(wrapper.vm.hasError).toBeFalse();
      });
    });
  });

  /** 
   * @TODO check responds to 'validate' event
   * @TODO check cleans up after itself (i.e. removes event listener for 'validate')
   * @TODO lots of tests for methods, in particular validate() and setError()
   */

});
