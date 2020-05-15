import RelevantQualifications from '@/views/Apply/QualificationsAndExperience/RelevantQualifications';
import { createTestSubject } from '../../../helpers';

describe('@/views/Apply/QualificationsAndExperience/RelevantQualifications', () => {
  describe('template', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(RelevantQualifications, {
        mocks: {},
        stubs: [],
        propsData: {
        },
      });
    });

    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    describe('h1', () => {
      let h1;
      beforeEach( () => {
        h1 = wrapper.find('h1');
      });
      it('contains a <h1>', () => {
        expect(wrapper.contains('h1')).toBe(true);
      });

      it('renders the h1 as `Qualifications` if the role is legal', () => {
        wrapper.setProps({ unknownVariable: 'legal' });
          expect(h1.text()).toBe('Qualifications');
      });

      it('renders the h1 as `Qualifications` if the role is leadership', () => {
        // wrapper.setProps({ unknownVariable: 'leadership' });
          expect(h1.text()).toBe('Qualifications');
      });

      it('renders the h1 as `Qualifications` if the role is senior', () => {
        // wrapper.setProps({ unknownVariable: 'senior' });
          expect(h1.text()).toBe('Qualifications');
      });

      xit('renders the h1 as `Memberships` if the role is non-legal', () => {
        // wrapper.setProps({ unknownVariable: 'non-legal' });
          expect(h1.text()).toBe('Memberships');
      });
    });
    
    describe('Form', () => {
      it('contains a <form>', () => {
        expect(wrapper.find('form').exists()).toBe(true);
      });
    
      it('the <form> contains a "Continue" submit button', () => {
        const button = wrapper.find('form button');
        expect(button.element.type).toBe('submit');
        expect(button.text()).toBe('Save and continue');
      });
    });

    describe('Qualifications - RepeatableFields', () => {
      
      it('renders the RepeatableFields component', () => {
        wrapper.setProps({ unknownVariable: 'legal' });
        expect(wrapper.find('RepeatableFields-stub').exists()).toBe(true);
      });

      it('renders the RepeatableFields component if the role is leadership', () => {
        wrapper.setProps({ unknownVariable: 'leadership' });
        expect(wrapper.find('RepeatableFields-stub').exists()).toBe(true);
      });

      it('renders the RepeatableFields component if the role is senior', () => {
        wrapper.setProps({ unknownVariable: 'senior' });
        expect(wrapper.find('RepeatableFields-stub').exists()).toBe(true);
      });

      xit('does not render the RepeatableFields component if the role is non-legal', () => {
        wrapper.setProps({ unknownVariable: 'non-legal' });
        expect(wrapper.find('RepeatableFields-stub').exists()).toBe(false);
      });
    });

    describe('What professional memberships do you have?', () => {

      xit('renders the question if the role is non-legal', () => {
        wrapper.setProps({ unknownVariable: 'non-legal' });
        expect(wrapper.find('RadioGroup-stub').exists()).toBe(true);
      });

      it('does not render the question if the role is legal', () => {
        wrapper.setProps({ unknownVariable: 'legal' });
        expect(wrapper.find('RadioGroup-stub').exists()).toBe(false);
      });

      it('does not render the question if the role is leadership', () => {
        wrapper.setProps({ unknownVariable: 'leadership' });
        expect(wrapper.find('RadioGroup-stub').exists()).toBe(false);
      });

      it('does not render the question if the role is senior', () => {
        wrapper.setProps({ unknownVariable: 'senior' });
        expect(wrapper.find('RadioGroup-stub').exists()).toBe(false);
      });
    });
  });

});
