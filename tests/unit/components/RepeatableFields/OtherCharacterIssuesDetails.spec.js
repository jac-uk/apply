import { createTestSubject } from '../../helpers';
import OtherCharIssueDetails from '@/components/RepeatableFields/OtherCharacterIssuesDetails';

describe('@/components/RepeatableFields/OtherCharIssueDetails', () => {
  describe('name', () => {
    it('component name is "InvolvedInProfessionalMisconductDetails"', () => {
      expect(OtherCharIssueDetails.name).toBe('InvolvedInProfessionalMisconductDetails');
    });
  });

  describe('props', () => {
    describe('row', () => {
      it('is required', () => {
        let prop = OtherCharIssueDetails.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        let prop = OtherCharIssueDetails.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        let prop = OtherCharIssueDetails.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        let prop = OtherCharIssueDetails.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });

describe('component methods', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(OtherCharIssueDetails, {
      mocks: {},
      stubs: [],
      propsData: {
        row: {},
        index: 0,
      },
    });
  });
  describe('computed properties', () => {

    describe('Date-Input', () => {
      it('has id which reflects index', () => {
        wrapper.setProps({ index: 5 });
        expect(wrapper.find('TextAreaInput-stub').attributes('id')).toBe('other_issues_details_5');
      });
    });

    describe('Text-area input', () => {
      it('has id which reflects index', () => {
        wrapper.setProps({ index: 5 });
        expect(wrapper.find('DateInput-stub').attributes('id')).toBe('other_issues_date_5');
      });
    });
    
  });
  
  describe('template', () => {
    beforeEach(() => {
      wrapper.setProps({ index: 1, row: {} });
    });
    it('renders DateInput', () => {
      expect(wrapper.find('DateInput-stub').exists()).toBe(true);
    });
    it('renders TextAreaInput', () => {
      expect(wrapper.find('TextAreaInput-stub').exists()).toBe(true);
    });
  });
});
});

