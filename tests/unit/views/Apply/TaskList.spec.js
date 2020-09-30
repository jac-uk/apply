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
    wrapper.vm.$store.state.vacancy.record = { additionalWorkingPreferences: [] };
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

    describe('role type', () => {

        it('renders the 1st block h2 as Account profile', () => {
          expect(wrapper.findAll('h2').at(0).text()).toBe('1. Account profile');
        });

        describe('when role is legal', () => {
          beforeEach(() => {
            wrapper.vm.$store.state.vacancy.record = { typeOfExercise: 'legal', additionalWorkingPreferences: [] };
          });
          it('renders the 2nd block h2 as Assessments', () => {
            expect(wrapper.findAll('h2').at(1).text()).toBe('2. Qualifications and experience');
          });
        });

        describe('when role is non-legal', () => {
          beforeEach(() => {
            wrapper.vm.$store.state.vacancy.record = { typeOfExercise: 'non-legal' };
          });

          it('renders the 2nd block h2 as Memberships and experience', () => {
            expect(wrapper.findAll('h2').at(1).text()).toBe('2. Memberships and Experience');
          });
        });

        describe('when role is leadership-non-legal', () => {
          beforeEach(() => {
            wrapper.vm.$store.state.vacancy.record = { typeOfExercise: 'leadership-non-legal' };
          });
          it('renders the 2nd block h2 as Memberships and experience', () => {
            expect(wrapper.findAll('h2').at(1).text()).toBe('2. Memberships and Experience');
          });
        });

        describe('when role is leadership', () => {
          beforeEach(() => {
            wrapper.vm.$store.state.vacancy.record = { typeOfExercise: 'leadership' };
          });
          it('renders the 2nd block h2 as Memberships and experience', () => {
            expect(wrapper.findAll('h2').at(1).text()).toBe('2. Qualifications and experience');
          });
        });
    
      });
    });

});
