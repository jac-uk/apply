import { createTestSubject } from '../../helpers';

import NonLegalEmploymentGaps from '@/components/RepeatableFields/NonLegalEmploymentGaps';

describe('components/RepeatableFields/NonLegalEmploymentGaps', () => {

  describe('props', () => {

    it('component name is "NonLegalEmploymentGaps"', () => {
      expect(NonLegalEmploymentGaps.name).toBe('EmploymentGaps');
    });

    describe('row', () => {
      it('is required', () => {
        let prop = NonLegalEmploymentGaps.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        let prop = NonLegalEmploymentGaps.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        let prop = NonLegalEmploymentGaps.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        let prop = NonLegalEmploymentGaps.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });
  
  describe('template', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(NonLegalEmploymentGaps, {
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

    describe('DateInput - start date', () => {
      it('has id which reflects index', () => {
        expect(wrapper.findAll('DateInput-stub').at(0).attributes('id')).toBe('start_date_5');
      });
      it('renders DateInput', () => {
        expect(wrapper.find('DateInput-stub').exists()).toBe(true);
      });
    });

    describe('DateInput - end date', () => {
        it('has id which reflects index', () => {
          expect(wrapper.findAll('DateInput-stub').at(1).attributes('id')).toBe('end_date_5');
        });
        it('renders DateInput', () => {
          expect(wrapper.find('DateInput-stub').exists()).toBe(true);
        });
      });

    describe('TextareaInput', () => {
      it('has id which reflects index', () => {
        expect(wrapper.find('TextareaInput-stub').attributes('id')).toBe('details_5');
      });
      it('renders TextareaInput', () => {
        expect(wrapper.find('TextareaInput-stub').exists()).toBe(true);
      });
    });
  });
});
