import { createTestSubject } from '../../helpers';

import InvolvedInProfessionalMisconductDetails from '@/components/RepeatableFields/InvolvedInProfessionalMisconductDetails';

describe('components/RepeatableFields/InvolvedInProfessionalMisconductDetails', () => {

  describe('props', () => {

    it('component name is "InvolvedInProfessionalMisconductDetails"', () => {
      expect(InvolvedInProfessionalMisconductDetails.name).toBe('InvolvedInProfessionalMisconductDetails');
    });

    describe('row', () => {
      it('is required', () => {
        let prop = InvolvedInProfessionalMisconductDetails.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        let prop = InvolvedInProfessionalMisconductDetails.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        let prop = InvolvedInProfessionalMisconductDetails.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        let prop = InvolvedInProfessionalMisconductDetails.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });
  
  describe('template', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(InvolvedInProfessionalMisconductDetails, {
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
          expect(wrapper.find('h2').text()).toBe('Add details of the complaint, findings or action taken against you, including dates.');
        });
      });

    describe('DateInput', () => {
      it('has id which reflects index', () => {
        expect(wrapper.find('DateInput-stub').attributes('id')).toBe('misconduct_date_5');
      });
      it('renders DateInput', () => {
        expect(wrapper.find('DateInput-stub').exists()).toBe(true);
      });
    });

    describe('TextareaInput', () => {
      it('has id which reflects index', () => {
        expect(wrapper.find('TextareaInput-stub').attributes('id')).toBe('misconduct_details_5');
      });
      it('renders TextareaInput', () => {
        expect(wrapper.find('TextareaInput-stub').exists()).toBe(true);
      });
    });
  });
});
