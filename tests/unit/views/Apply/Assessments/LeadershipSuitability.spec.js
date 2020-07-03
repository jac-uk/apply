// @FIXME@ *event handlers* 
// this suite gives a warning due to an change event in the mount

import LeadershipSuitability from '@/views/Apply/Assessments/LeadershipSuitability';
import { createTestSubject } from '../../../helpers';

describe('views/Assessments/LeadershipSuitability', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(LeadershipSuitability, {
      mocks: {},
      stubs: [],
      propsData: {},
    });
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
      expect(wrapper.find('RadioGroup-stub').exists()).toBe(true);
    });

    it('renders the RadioItem component', () => {
      expect(wrapper.find('RadioItem-stub').exists()).toBe(true);
    });

    it('contains a govuk file upload', () => {
      expect(wrapper.contains('.govuk-file-upload')).toBe(true);
    });

    it('contains a link to download the competencies template document', () => {
      const link = wrapper.find({ ref: 'templateDownloadLink' });
      expect(link.is('a')).toBe(true);
      expect(link.attributes('href')).toBe('#');
      expect(link.text()).toBe('leadership-suitability-template.doc');
    });
  });
});
