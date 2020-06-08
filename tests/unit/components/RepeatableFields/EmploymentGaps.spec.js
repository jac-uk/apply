import { createTestSubject } from '../../helpers';

import EmploymentGaps from '@/components/RepeatableFields/EmploymentGaps';

describe('components/RepeatableFields/EmploymentGaps', () => {

  describe('props', () => {

    it('component name is "EmploymentGaps"', () => {
      expect(EmploymentGaps.name).toBe('EmploymentGaps');
    });

    describe('row', () => {
      it('is required', () => {
        let prop = EmploymentGaps.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        let prop = EmploymentGaps.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        let prop = EmploymentGaps.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        let prop = EmploymentGaps.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });
  
  describe('template', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(EmploymentGaps, {
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
