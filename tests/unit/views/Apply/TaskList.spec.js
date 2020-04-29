import { createTestSubject } from '../../helpers';

import TaskList from '@/views/Apply/TaskList';

describe('views/TaskList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(TaskList, {
      stubs: ['router-link', 'Countdown'],
    });
  });

  it('renders successfully', () => {
    expect(wrapper.exists()).toBeTrue();
  });

  describe('template has', () => {
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
        // @TODO make test for :to prop of router-link
        xit('goes to applications page', () => {
        });
        it('is a router-link', () => {    
        expect(wrapper.find('router-link-stub').exists()).toBeTrue();
        });
      });
      
      describe('without applications', () => {
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

    describe.only('vacancy name and reference number', () => {
      it('exists', () => {
        // console.log(wrapper.find('div.govuk-grid-column-two-thirds > span').html());
        // console.log(wrapper.html());
        expect(wrapper.find('div.govuk-grid-column-two-thirds > span').exists()).toBeTrue();
      });
      // @TODO provide and test for innertext
    });

      // describe('Experience h2', () => {
      //   beforeEach(() => {
      //   });
      //   describe('if the role is legal', () => {
      //     it('does not exist', () => {
      //       expect(wrapper.find('.govuk-back-link').exists()).toBeFalse();
      //     });
        //      let wrapper = shallowMount(TaskList, {
    //        mocks: {
    //          $store: {
    //            state: {
    //              exercise: {
    //                record: { typeOfExercise: 'legal'},
    //              },
    //              candidate: {
    //                record: {},
    //              },
    //              application: {
    //                record: {},
    //              },
    //            }
    //          },
    //          $route: mockRoute,
    //          $router: mockRouter,
    //        }
    //       });
    //       expect(wrapper.find('#qualifications-and-experience').exists()).toBeTrue();
    //       expect(wrapper.find('#qualifications-and-experience').text()).toBe('3. Qualifications and experience');
    //     });
    //     it('renders the 3rd block h2 as Memberships and experience if the role is non-legal', () => {
    //       let wrapper = shallowMount(TaskList, {
    //         mocks: {
    //           $store: {
    //             state: {
    //               exercise: {
    //                 record: { typeOfExercise: 'non-legal'},
    //               },
    //               candidate: {
    //                 record: {},
    //               },
    //               application: {
    //                 record: {},
    //               },
    //             }
    //           }
    //         }
    //        });
    //        expect(wrapper.find('#memberships-and-experience').exists()).toBeTrue();
    //        expect(wrapper.find('#memberships-and-experience').text()).toBe('3. Memberships and Experience');
         });
        });
