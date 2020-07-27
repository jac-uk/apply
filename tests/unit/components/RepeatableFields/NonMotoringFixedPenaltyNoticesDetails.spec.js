import { createTestSubject } from '../../helpers';

import NonMotoringFixedPenaltyNoticesDetails from '@/components/RepeatableFields/NonMotoringFixedPenaltyNoticesDetails';

describe('components/RepeatableFields/NonMotoringFixedPenaltyNoticesDetails', () => {

  describe('props', () => {

    it('component name is "NonMotoringFixedPenaltyNoticesDetails"', () => {
      expect(NonMotoringFixedPenaltyNoticesDetails.name).toBe('NonMotoringFixedPenaltyNoticesDetails');
    });

    describe('row', () => {
      it('is required', () => {
        const prop = NonMotoringFixedPenaltyNoticesDetails.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        const prop = NonMotoringFixedPenaltyNoticesDetails.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        const prop = NonMotoringFixedPenaltyNoticesDetails.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        const prop = NonMotoringFixedPenaltyNoticesDetails.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });
  
  describe('template', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(NonMotoringFixedPenaltyNoticesDetails, {
        stubs: [],
        mocks: [],
        propsData: {
          row: {},
          index: 5,
        },
      });
    });

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true);
    });

    describe('DateInput', () => {
      it('has id which reflects index', () => {
        expect(wrapper.find('DateInput-stub').attributes('id')).toBe('notice_date_5');
      });
      it('renders DateInput', () => {
        expect(wrapper.find('DateInput-stub').exists()).toBe(true);
      });
    });

    describe('Textfield', () => {
      it('has id which reflects index', () => {
        expect(wrapper.find('TextField-stub').attributes('id')).toBe('notice_title_5');
      });
      it('has label with correct text', () => {
          expect(wrapper.find('TextField-stub').attributes('label')).toBe('Sentence, penalty or fine');
        });
      it('renders TextField', () => {
        expect(wrapper.find('TextField-stub').exists()).toBe(true);
      });
    });

    describe('TextareaInput', () => {
      it('has id which reflects index', () => {
        expect(wrapper.find('TextareaInput-stub').attributes('id')).toBe('notice_details_5');
      });
      it('renders TextareaInput', () => {
        expect(wrapper.find('TextareaInput-stub').exists()).toBe(true);
      });
    });
  });
});
