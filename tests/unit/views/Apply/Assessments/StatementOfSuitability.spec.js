import StatementOfSuitability from '@/views/Apply/Assessments/StatementOfSuitability';
import { shallowMount } from '@vue/test-utils';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';

const createTestSubject = () => {
  return shallowMount(StatementOfSuitability);
};

xdescribe('views/Assessments/StatementOfSuitability', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject();
  });

  xdescribe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <h1>', () => {
      expect(wrapper.contains('h1')).toBe(true);
    });

    it('contains a <form>', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('the <form> contains a "Save and continue" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Save and continue');
    });

    it('renders the RadioGroup component', () => {
      expect(wrapper.find(RadioGroup).exists()).toBe(true);
    });

    it('renders the RadioItem component', () => {
      expect(wrapper.find(RadioItem).exists()).toBe(true);
    });

    it('contains a govuk file upload', () => {
     expect(wrapper.contains('.govuk-file-upload')).toBe(true);
   });

   it('contains a link to download the competencies template document', () => {
     const link = wrapper.find({ ref: 'templateDownloadLink' });
     expect(link.is('a')).toBe(true);
     expect(link.attributes('href')).toBe('#');
     expect(link.text()).toBe('assessments-template.doc');
   });
  });
});
