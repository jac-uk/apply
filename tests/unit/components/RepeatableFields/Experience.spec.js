import { shallowMount } from '@vue/test-utils';
import Experience from '@/components/RepeatableFields/Experience';
import DateInput from '@/components/Form/DateInput';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import CheckboxItem from '@/components/Form/CheckboxItem';
import TextField from '@/components/Form/TextField';
import TextareaInput from '@/components/Form/TextareaInput';

const createTestSubject = (props) => {
  return shallowMount(Experience, {
    propsData: {
      ...props,
    },
  });
};

describe('@/components/RepeatableFields/Experience', () => {
  describe('name', () => {
    it('component name is "Experience"', () => {
      expect(Experience.name).toBe('Experience');
    });
  });

  describe('props', () => {
    describe('row', () => {
      it('is required', () => {
        let prop = Experience.props.row;
        expect(prop.required).toBe(true);
      });

      it('has type object', () => {
        let prop = Experience.props.row;
        expect(prop.type).toBe(Object);
      });
    });

    describe('index', () => {
      it('is required', () => {
        let prop = Experience.props.index;
        expect(prop.required).toBe(true);
      });

      it('has type number', () => {
        let prop = Experience.props.index;
        expect(prop.type).toBe(Number);
      });
    });
  });

  describe('computed properties', () => {
    describe('experienceJobTitle', () => {
      it('returns the value that is created using index', () => {
        let wrapper = createTestSubject({ index: 4, row: {} });
        expect(wrapper.vm.experienceJobTitle).toBe('experience_job_title_4');
      });
    });

    describe('experienceOrgBusinessName', () => {
      it('returns the value that is created using index', () => {
        let wrapper = createTestSubject({ index: 5, row: {} });
        expect(wrapper.vm.experienceOrgBusinessName).toBe('experience_org_business_name_5');
      });
    });

    describe('experienceStartDate', () => {
      it('returns the value that is created using index', () => {
        let wrapper = createTestSubject({ index: 5, row: {} });
        expect(wrapper.vm.experienceStartDate).toBe('experience_start_date_5');
      });
    });

    describe('experienceEndDate', () => {
      it('returns the value that is created using index', () => {
        let wrapper = createTestSubject({ index: 5, row: {} });
        expect(wrapper.vm.experienceEndDate).toBe('experience_end_date_5');
      });
    });

    describe('experienceTasks', () => {
      it('returns the value that is created using index', () => {
        let wrapper = createTestSubject({ index: 5, row: {} });
        expect(wrapper.vm.experienceTasks).toBe('experience_tasks_5');
      });
    });

    describe('experienceOtherTasks', () => {
      it('returns the value that is created using index', () => {
        let wrapper = createTestSubject({ index: 5, row: {} });
        expect(wrapper.vm.experienceOtherTasks).toBe('experience_other_tasks_5');
      });
    });
  });

  describe('template', () => {
    it('renders DateInput', () => {
      let wrapper = createTestSubject({ index: 1, row: {} });
      expect(wrapper.find(DateInput).exists()).toBe(true);
    });

    it('renders CheckboxGroup', () => {
      let wrapper = createTestSubject({ index: 1, row: {} });
      expect(wrapper.find(CheckboxGroup).exists()).toBe(true);
    });

    it('renders CheckboxItem', () => {
      let wrapper = createTestSubject({ index: 1, row: {} });
      expect(wrapper.find(CheckboxItem).exists()).toBe(true);
    });

    it('renders TextField', () => {
      let wrapper = createTestSubject({ index: 1, row: {} });
      expect(wrapper.find(TextField).exists()).toBe(true);
    });

    it('renders TextareaInput', () => {
      let wrapper = createTestSubject({ index: 1, row: {} });
      expect(wrapper.find(TextareaInput).exists()).toBe(true);
    });
  });
});
