import RelevantQualifications from '@/views/Apply/QualificationsAndExperience/RelevantQualifications';
import { shallowMount } from '@vue/test-utils';
import RepeatableFields from '@/components/RepeatableFields';
import RadioGroup from '@/components/Form/RadioGroup';

const application = {};

const mockStore = {
  dispatch: jest.fn(),
  state: {
    application: {
      record: {},
    },
  },
  getters: {
    'application/data': () => application,
  },
};

const createTestSubject = () => {
  return shallowMount(RelevantQualifications, {
    mocks: {
      $store: mockStore,
    },
  });
};

describe('@/views/Apply/QualificationsAndExperience/RelevantQualifications', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject();
  });

  describe('template', () => {
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
        wrapper.setData({ unknownVariable: 'legal' });
          expect(h1.text()).toBe('Qualifications');
      });

      it('renders the h1 as `Qualifications` if the role is leadership', () => {
        wrapper.setData({ unknownVariable: 'leadership' });
          expect(h1.text()).toBe('Qualifications');
      });

      it('renders the h1 as `Qualifications` if the role is senior', () => {
        wrapper.setData({ unknownVariable: 'senior' });
          expect(h1.text()).toBe('Qualifications');
      });

      // it('renders the h1 as `Memberships` if the role is non-legal', () => {
      //   wrapper.setData({ unknownVariable: 'non-legal' });
      //     expect(h1.text()).toBe('Memberships');
      // });
    });

    it('contains a <form>', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('the <form> contains a "Continue" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Continue');
    });

    describe('Qualifications - RepeatableFields', () => {

      it('renders the RepeatableFields component', () => {
        wrapper.setData({ unknownVariable: 'legal' });
        expect(wrapper.find(RepeatableFields).exists()).toBe(true);
      });

      it('renders the RepeatableFields component if the role is leadership', () => {
        wrapper.setData({ unknownVariable: 'leadership' });
        expect(wrapper.find(RepeatableFields).exists()).toBe(true);
      });

      it('renders the RepeatableFields component if the role is senior', () => {
        wrapper.setData({ unknownVariable: 'senior' });
        expect(wrapper.find(RepeatableFields).exists()).toBe(true);
      });

      // it('does not render the RepeatableFields component if the role is non-legal', () => {
      //   wrapper.setData({ unknownVariable: 'non-legal' });
      //   expect(wrapper.find(RepeatableFields).exists()).toBe(false);
      // });
    });

    describe('What professional memberships do you have?', () => {

      // it('renders the question if the role is non-legal', () => {
      //   wrapper.setData({ unknownVariable: 'non-legal' });
      //   expect(wrapper.find(RadioGroup).exists()).toBe(true);
      // });

      it('does not render the question if the role is legal', () => {
        wrapper.setData({ unknownVariable: 'legal' });
        expect(wrapper.find(RadioGroup).exists()).toBe(false);
      });

      it('does not render the question if the role is leadership', () => {
        wrapper.setData({ unknownVariable: 'leadership' });
        expect(wrapper.find(RadioGroup).exists()).toBe(false);
      });

      it('does not render the question if the role is senior', () => {
        wrapper.setData({ unknownVariable: 'senior' });
        expect(wrapper.find(RadioGroup).exists()).toBe(false);
      });
    });
  });
});
