import { createTestSubject } from '../../helpers';

import LateTaxReturnOrFinedDetails from '@/components/RepeatableFields/LateTaxReturnOrFinedDetails';

describe('components/RepeatableFields/LateTaxReturnOrFineddDetails', () => {

  describe('props', () => {

    it('component name is "LateTaxReturnOrFinedDetails"', () => {
      expect(LateTaxReturnOrFinedDetails.name).toBe('LateTaxReturnOrFinedDetails');
    });

    describe('row', () => {
      it('is required', () => {
        let prop = LateTaxReturnOrFinedDetails.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        let prop = LateTaxReturnOrFinedDetails.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        let prop = LateTaxReturnOrFinedDetails.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        let prop = LateTaxReturnOrFinedDetails.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });
  
  describe('template', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(LateTaxReturnOrFinedDetails, {
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

    describe('h2 header', () => {
      it('exists', () => {
        expect(wrapper.find('h2').exists()).toBe(true);
      });
          it('has correct text', () => {
        expect(wrapper.find('h2').text()).toBe('Add details of late tax returns or fines, including dates.');
      });
    });

    describe('DateInput', () => {
      it('has id which reflects index', () => {
        expect(wrapper.find('DateInput-stub').attributes('id')).toBe('endorsement_offence_date_5');
      });
      it('renders DateInput', () => {
        expect(wrapper.find('DateInput-stub').exists()).toBe(true);
      });
    });

    describe('TextareaInput', () => {
      it('has id which reflects index', () => {
        expect(wrapper.find('TextareaInput-stub').attributes('id')).toBe('endorsement_offence_details_5');
      });
      it('renders TextareaInput', () => {
        expect(wrapper.find('TextareaInput-stub').exists()).toBe(true);
      });
    });

  });
});
