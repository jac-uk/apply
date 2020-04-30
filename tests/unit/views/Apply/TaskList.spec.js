import { createTestSubject } from '../../helpers';

import TaskList from '@/views/Apply/TaskList';

describe('views/TaskList', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(TaskList, {
      mocks: {},
      stubs: ['RouterLink','Countdown'],
      propsData: {},
    });
  });

  it('renders successfully', () => {
    expect(wrapper.exists()).toBeTrue();
  });

  describe('template', () => {
    describe('\'Apply for the role\' header', () => {
      it('exists', () => {
        expect(wrapper.contains('h1')).toBeTrue();
      });
      it('text is \'Apply for the role\'', () => {
        expect(wrapper.find('h1').text()).toEqual('Apply for the role');
      });
    });

    describe('back to applications link', () => {
      describe('with applications available', () => {
        beforeEach(() => {
          wrapper.vm.$store.state.applications.records = [
            { id: 'application1' },
            { id: 'application2' },
          ];
        });
        it('exists', () => {
          expect(wrapper.find('.govuk-back-link').exists()).toBeTrue();
        });
        it('contains text \'Applications\'', () => {
          expect(wrapper.find('.govuk-back-link').text()).toBe('Applications');
        });
        xit('goes to applications page', () => {
          // @TODO make test for :to prop of RouterLink
        });
        it('is a RouterLink', () => {    
        expect(wrapper.find('RouterLink-stub').exists()).toBeTrue();
        });
      });
      
      describe('without applications available', () => {
        beforeEach(() => {
          wrapper.vm.$store.state.applications.records = [];
        });
        it('does not exist', () => {
          expect(wrapper.find('.govuk-back-link').exists()).toBeFalse();
        });
      });
    });
            
    describe('countdown', () => {
      it('exists', () => {
        expect(wrapper.find('Countdown-stub').exists()).toBeTrue();
      });
    });

    describe('vacancy name and reference number', () => {
      it('exists', () => {
        expect(wrapper.find('div.govuk-grid-column-two-thirds > span').exists()).toBeTrue();
      });
    });

    xdescribe('when role is legal', () => {
      beforeEach(() => {
        wrapper = createTestSubject(TaskList, {
          mocks: {
            store: {
              state: {
                vacancy: {
                  record: {
                    typeOfExercise: 'legal',
                  },
                },
              },
            },
          },
          stubs: ['RouterLink','Countdown'],
          propsData: [],
        });
      });
      it('renders the 3rd block h2 as Qualifications', () => {
        wrapper.vm.$store.state.vacancy.record = { typeOfExercise: 'legal' };
        expect(wrapper.find('#qualifications-and-experience').exists()).toBeTrue();
       expect(wrapper.find('#qualifications-and-experience').text()).toBe('3. Qualifications and experience');
      });
    });

    xdescribe('when role is non-legal', () => {
      xit('renders the 3rd block h2 as Memberships and experience', () => {
    // let wrapper = shallowMount(TaskList, {
      // mocks: {
      //   $store: {
      //     state: {
      //       exercise: {
      //         record: { typeOfExercise: 'non-legal' },
      //       },
      //       candidate: {
      //         record: {},
      //       },
      //       application: {
      //         record: {},
      //       },
      //     },
      //   },
      // },
      expect(wrapper.find('#memberships-and-experience').exists()).toBeTrue();
      expect(wrapper.find('#memberships-and-experience').text()).toBe('3. Memberships and Experience');
    });
    });
    
  });
});
