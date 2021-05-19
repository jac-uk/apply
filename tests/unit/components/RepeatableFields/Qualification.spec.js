import { createTestSubject } from '../../helpers';
import Qualification from '@/components/RepeatableFields/Qualification';

describe('@/components/RepeatableFields/Qualification', () => {
  describe('name', () => {
    it('component name is "Qualification"', () => {
      expect(Qualification.name).toBe('Qualification');
    });
  });

  describe('props', () => {
    describe('row', () => {
      it('is required', () => {
        const prop = Qualification.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        const prop = Qualification.props.row;
        expect(prop.type()).toBeObject();
      });
    });

    describe('index', () => {
      it('is required', () => {
        const prop = Qualification.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        const prop = Qualification.props.index;
        expect(prop.type()).toBeNumber();
      });
    });
  });

describe('component methods', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(Qualification, {
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
      wrapper.setProps({ index: 1, row: {} });
    });
    it('renders DateInput', () => {
      expect(wrapper.find('DateInput-stub').exists()).toBe(true);
    });

    it('renders RadioGroup', () => {
      expect(wrapper.find('RadioGroup-stub').exists()).toBe(true);
    });

    it('renders RadioItem', () => {
      expect(wrapper.find('RadioItem-stub').exists()).toBe(true);
    });
  });
});
});

