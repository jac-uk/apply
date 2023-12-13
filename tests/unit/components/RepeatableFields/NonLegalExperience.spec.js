// import { createTestSubject } from '../../helpers';

// import NonLegalExperience from '@/components/RepeatableFields/NonLegalExperience.vue';

// describe('components/RepeatableFields/NonLegalExperience', () => {

//   describe('props', () => {

//     it('component name is "Experience"', () => {
//       expect(NonLegalExperience.name).toBe('Experience');
//     });

//     describe('row', () => {
//       it('is required', () => {
//         const prop = NonLegalExperience.props.row;
//         expect(prop.required).toBe(true);
//       });

//       it('has type object', () => {
//         const prop = NonLegalExperience.props.row;
//         expect(prop.type()).toBeTypeOf('object');
//       });
//     });

//     describe('index', () => {
//       it('is required', () => {
//         const prop = NonLegalExperience.props.index;
//         expect(prop.required).toBe(true);
//       });

//       it('has type number', () => {
//         const prop = NonLegalExperience.props.index;
//         expect(prop.type()).toBeNumber();
//       });
//     });
//   });

//   describe('template', () => {
//     let wrapper;
//     beforeEach(() => {
//       wrapper = createTestSubject(NonLegalExperience, {
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

//     describe('DateInput - start date', () => {
//       it('has id which reflects index', () => {
//         expect(wrapper.findAll('DateInput-stub').at(0).attributes('id')).toBe('experience_start_date_5');
//       });
//       it('renders DateInput', () => {
//         expect(wrapper.findAll('DateInput-stub').at(0).exists()).toBe(true);
//       });
//     });

//     describe('DateInput - end date', () => {
//         it('has id which reflects index', () => {
//           expect(wrapper.findAll('DateInput-stub').at(1).attributes('id')).toBe('experience_end_date_5');
//         });
//         it('renders DateInput', () => {
//           expect(wrapper.findAll('DateInput-stub').at(1).exists()).toBe(true);
//         });
//       });
//   });
// });

it('empty suite', () => {

});
