import { createTestSubject } from '../../helpers';

import CriminalOffenceDetails from '@/components/RepeatableFields/CriminalOffenceDetails';

describe('@/components/RepeatableFields/CriminalOffenceDetails', () => {
  describe('name', () => {
    it('component name is "Criminal Offence Details"', () => {
      expect(CriminalOffenceDetails.name).toBe('CriminalOffenceDetails');
    });
  });

  describe('props', () => {
    describe('row', () => {
      it('is required', () => {
        let prop = CriminalOffenceDetails.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        let prop = CriminalOffenceDetails.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        let prop = CriminalOffenceDetails.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        let prop = CriminalOffenceDetails.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });

  describe('component methods', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(CriminalOffenceDetails, {
        mocks: {},
        stubs: [],
        propsData: {
          row: {},
          index: 0,
        },
      });
    });
    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true);
    });
  describe('template', () => {
    beforeEach(() => {
      wrapper.setProps({ index: 5, row: {} });
    });
    
      describe('TextField', () => {
        it('renders TextField', () => {
          expect(wrapper.find('TextField-stub').exists()).toBe(true);
        });
        it('has id which reflects index', () => {
          expect(wrapper.find('TextField-stub').attributes('id')).toBe('offence_title_5');
        });
      });

      describe('TextareaInput', () => {
        it('renders TextareaInput', () => {
          expect(wrapper.find('TextareaInput-stub').exists()).toBe(true);
        });
        it('has id which reflects index', () => {
          expect(wrapper.find('TextAreaInput-stub').attributes('id')).toBe('offence_details_5');
        });
      });

      xit('renders remove slot', () => {
        expect(wrapper.find('slot').exists()).toBe(true);
      });
      
    });
  
});

});
