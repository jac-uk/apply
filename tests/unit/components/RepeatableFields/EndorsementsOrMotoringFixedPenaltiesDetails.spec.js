import { createTestSubject } from '../../helpers';

import EndorsementsOrMotoringFixedPenaltiesDetails from '@/components/RepeatableFields/EndorsementsOrMotoringFixedPenaltiesDetails';

describe('components/RepeatableFields/EndorsementsOrMotoringFixedPenaltiesDetails', () => {

  describe('props', () => {

    it('component name is "EndorsementsOrMotoringFixedPenaltiesDetails"', () => {
      expect(EndorsementsOrMotoringFixedPenaltiesDetails.name).toBe('EndorsementsOrMotoringFixedPenaltiesDetails');
    });

    describe('row', () => {
      it('is required', () => {
        const prop = EndorsementsOrMotoringFixedPenaltiesDetails.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        const prop = EndorsementsOrMotoringFixedPenaltiesDetails.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        const prop = EndorsementsOrMotoringFixedPenaltiesDetails.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        const prop = EndorsementsOrMotoringFixedPenaltiesDetails.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });
  
  describe('template', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(EndorsementsOrMotoringFixedPenaltiesDetails, {
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
        expect(wrapper.findAll('DateInput-stub').at(0).attributes('id')).toBe('endorsement_offence_date_5');
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
