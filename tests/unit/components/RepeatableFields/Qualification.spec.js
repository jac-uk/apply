import { shallowMount } from '@vue/test-utils';
import Qualification from '@/components/RepeatableFields/Qualification';
import DateInput from '@/components/Form/DateInput';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';

const createTestSubject = (props) => {
  return shallowMount(Qualification, {
    propsData: {
      ...props,
    },
  });
};

describe('@/components/RepeatableFields/Qualification', () => {
  describe('name', () => {
    it('component name is "Qualification"', () => {
      expect(Qualification.name).toBe('Qualification');
    });
  });

  describe('props', () => {
    describe('row', () => {
      it('is required', () => {
        let prop = Qualification.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        let prop = Qualification.props.row;
        expect(prop.type).toBe(Object);
      });
    });

    describe('index', () => {
      it('is required', () => {
        let prop = Qualification.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        let prop = Qualification.props.index;
        expect(prop.type).toBe(Number);
      });
    });
  });

  describe('computed properties', () => {
    describe('qualificationType', () => {
      it('returns the value that is created using index', () => {
        let wrapper = createTestSubject({ index: 4, row: {} });
        expect(wrapper.vm.qualificationType).toBe('qualification_type_4');
      });
    });

    describe('qualificationLocation', () => {
      it('returns the value that is created using index', () => {
        let wrapper = createTestSubject({ index: 5, row: {} });
        expect(wrapper.vm.qualificationLocation).toBe('qualification_location_5');
      });
    });

    describe('qualificationDate', () => {
      it('returns the value that is created using index', () => {
        let wrapper = createTestSubject({ index: 5, row: {} });
        expect(wrapper.vm.qualificationDate).toBe('qualification_date_5');
      });
    });
  });

  describe('template', () => {
    it('renders DateInput', () => {
      let wrapper = createTestSubject({ index: 1, row: {} });
      expect(wrapper.find(DateInput).exists()).toBe(true);
    });

    it('renders RadioGroup', () => {
      let wrapper = createTestSubject({ index: 1, row: {} });
      expect(wrapper.find(RadioGroup).exists()).toBe(true);
    });

    it('renders RadioItem', () => {
      let wrapper = createTestSubject({ index: 1, row: {} });
      expect(wrapper.find(RadioItem).exists()).toBe(true);
    });
  });
});
