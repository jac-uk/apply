import { createTestSubject } from '../../helpers';
import ErrorSummary from '@/components/Form/ErrorSummary';

describe('components/ErrorSummary', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(ErrorSummary, {
      mocks: {},
      stubs: [],
      propsData: {
        errors: [],
      },
    });
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
  
  describe('template', () => {
    describe('with errors', () => {
      beforeEach(()=>{

      });
      it('template tests', () => {
      });
    });
    describe('with no errors', () => {
      it('list doesn\'nt exist', () =>{
        expect(wrapper.find('div#govuk-error-summary').exists()).toBe(false);
      });
    });
  });

  describe('props', () => {
    let props;
    beforeEach(() => {
      props = wrapper.vm.$options.props;
    });
    describe('errors', () => {
      it('is an array', () => {
        expect(props.errors.type()).toBeArray();
      });
      it('are required', () => {
        expect(props.errors.required).toBeTruthy();
      });
    });
  });

});
