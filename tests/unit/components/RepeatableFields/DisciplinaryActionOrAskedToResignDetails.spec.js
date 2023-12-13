// import { createTestSubject } from '../../helpers';

// import DiciplinaryActionOrAskedToResignDetails from '@/components/RepeatableFields/DiciplinaryActionOrAskedToResignDetails.vue';

// describe('components/RepeatableFields/NonMotoringFixedPenaltyNoticesDetails', () => {

//   describe('props', () => {

//     it('component name is "DisciplinaryActionOrAskedToResignDetails"', () => {
//       expect(DiciplinaryActionOrAskedToResignDetails.name).toBe('DiciplinaryActionOrAskedToResignDetails');
//     });

//     describe('row', () => {
//       it('is required', () => {
//         const prop = DiciplinaryActionOrAskedToResignDetails.props.row;
//         expect(prop.required).toBe(true);
//       });

//       it('has type object', () => {
//         const prop = DiciplinaryActionOrAskedToResignDetails.props.row;
//         expect(prop.type()).toBeTypeOf('object');
//       });
//     });

//     describe('index', () => {
//       it('is required', () => {
//         const prop = DiciplinaryActionOrAskedToResignDetails.props.index;
//         expect(prop.required).toBe(true);
//       });

//       it('has type number', () => {
//         const prop = DiciplinaryActionOrAskedToResignDetails.props.index;
//         expect(prop.type()).toBeNumber();
//       });
//     });
//   });

//   describe('template', () => {
//     let wrapper;
//     beforeEach(() => {
//       wrapper = createTestSubject(DiciplinaryActionOrAskedToResignDetails, {
//         stubs: [],
//         mocks: [],
//         propsData: {
//           row: {},
//           index: 5,
//         },
//       });
//     });

//     it('renders the component', () => {
//       expect(wrapper.exists()).toBe(true);
//     });

//     describe('h2 header', () => {
//         it('exists', () => {
//           expect(wrapper.find('h2').exists()).toBe(true);
//         });
//             it('has correct text', () => {
//           expect(wrapper.find('h2').text()).toBe('Add details of the complaint, findings or action taken against you, including dates.');
//         });
//       });

//     describe('DateInput', () => {
//       it('has id which reflects index', () => {
//         expect(wrapper.find('DateInput-stub').attributes('id')).toBe('diciplinary_date_5');
//       });
//       it('renders DateInput', () => {
//         expect(wrapper.find('DateInput-stub').exists()).toBe(true);
//       });
//     });

//     describe('Textfield', () => {
//         it('has id which reflects index', () => {
//           expect(wrapper.find('TextField-stub').attributes('id')).toBe('diciplinary_title_5');
//         });
//         it('has label with correct text', () => {
//             expect(wrapper.find('TextField-stub').attributes('label')).toBe('Findings or actions');
//           });
//         it('renders TextField', () => {
//           expect(wrapper.find('TextField-stub').exists()).toBe(true);
//         });
//       });

//     describe('TextareaInput', () => {
//       it('has id which reflects index', () => {
//         expect(wrapper.find('TextareaInput-stub').attributes('id')).toBe('diciplinary_details_5');
//       });
//       it('renders TextareaInput', () => {
//         expect(wrapper.find('TextareaInput-stub').exists()).toBe(true);
//       });
//     });
//   });
// });

it('empty suite', () => {

});
