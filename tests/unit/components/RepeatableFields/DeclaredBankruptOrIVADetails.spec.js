// import { createTestSubject } from '../../helpers';

// import DeclaredBankruptOrIvaDetails from '@/components/RepeatableFields/DeclaredBankruptOrIVADetails.vue';

// describe('components/RepeatableFields/', () => {

//   describe('props', () => {

//     it('component name is "DeclaredBankruptOrIvaDetails"', () => {
//       expect(DeclaredBankruptOrIvaDetails.name).toBe('DeclaredBankruptOrIVADetails');
//     });

//     describe('row', () => {
//       it('is required', () => {
//         const prop = DeclaredBankruptOrIvaDetails.props.row;
//         expect(prop.required).toBe(true);
//       });

//       it('has type object', () => {
//         const prop = DeclaredBankruptOrIvaDetails.props.row;
//         expect(prop.type()).toBeTypeOf('object');
//       });
//     });

//     describe('index', () => {
//       it('is required', () => {
//         const prop = DeclaredBankruptOrIvaDetails.props.index;
//         expect(prop.required).toBe(true);
//       });

//       it('has type number', () => {
//         const prop = DeclaredBankruptOrIvaDetails.props.index;
//         expect(prop.type()).toBeNumber();
//       });
//     });
//   });

//   describe('template', () => {
//     let wrapper;
//     beforeEach(() => {
//       wrapper = createTestSubject(DeclaredBankruptOrIvaDetails, {
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
//       it('exists', () => {
//         expect(wrapper.find('h2').exists()).toBe(true);
//       });
//           it('has correct text', () => {
//         expect(wrapper.find('h2').text()).toBe('Add details of bankruptcy or IVA, including dates.');
//       });
//     });

//     describe('DateInput', () => {
//       it('has id which reflects index', () => {
//         expect(wrapper.find('DateInput-stub').attributes('id')).toBe('bankrupt_or_iva_date_5');
//       });
//       it('renders DateInput', () => {
//         expect(wrapper.find('DateInput-stub').exists()).toBe(true);
//       });
//     });

//     describe('TextareaInput', () => {
//       it('has id which reflects index', () => {
//         expect(wrapper.find('TextareaInput-stub').attributes('id')).toBe('bankrupt_or_iva_details_5');
//       });
//       it('renders TextareaInput', () => {
//         expect(wrapper.find('TextareaInput-stub').exists()).toBe(true);
//       });
//     });

//   });

// });

it('empty suite', () => {

});
