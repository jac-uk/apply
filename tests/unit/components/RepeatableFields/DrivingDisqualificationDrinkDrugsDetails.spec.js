import { createTestSubject } from '../../helpers';

import DrivingDisqualificationDrinkDrugsDetails from '@/components/RepeatableFields/DrivingDisqualificationDrinkDrugsDetails';

describe('components/RepeatableFields/DrivingDisqualificationDrinkDrugsDetails', () => {

  describe('props', () => {

    it('component name is "DrivingDisqualificationDrinkDrugsDetails"', () => {
      expect(DrivingDisqualificationDrinkDrugsDetails.name).toBe('DrivingDisqualificationDrinkDrugsDetails');
    });

    describe('row', () => {
      it('is required', () => {
        let prop = DrivingDisqualificationDrinkDrugsDetails.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        let prop = DrivingDisqualificationDrinkDrugsDetails.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        let prop = DrivingDisqualificationDrinkDrugsDetails.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        let prop = DrivingDisqualificationDrinkDrugsDetails.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });
  
  describe('template', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(DrivingDisqualificationDrinkDrugsDetails, {
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
        expect(wrapper.find('DateInput-stub').attributes('id')).toBe('disqualification_offence_date_5');
      });
      it('renders DateInput', () => {
        expect(wrapper.find('DateInput-stub').exists()).toBe(true);
      });
    });

    describe('Textfield', () => {
        it('has id which reflects index', () => {
          expect(wrapper.find('TextField-stub').attributes('id')).toBe('disqualification_offence_title_5');
        });
        it('has label with correct text', () => {
            expect(wrapper.find('TextField-stub').attributes('label')).toBe('Disqualifications or convictions');
          });
        it('renders TextField', () => {
          expect(wrapper.find('TextField-stub').exists()).toBe(true);
        });
      });

    describe('TextareaInput', () => {
      it('has id which reflects index', () => {
        expect(wrapper.find('TextareaInput-stub').attributes('id')).toBe('offence_details_5');
      });
      it('renders TextareaInput', () => {
        expect(wrapper.find('TextareaInput-stub').exists()).toBe(true);
      });
    });
  });
});
