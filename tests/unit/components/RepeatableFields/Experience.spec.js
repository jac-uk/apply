// import { createTestSubject } from '../../helpers';

// import Experience from '@/components/RepeatableFields/Experience.vue';

// describe('@/components/RepeatableFields/Experience', () => {

//   describe('props', () => {

//     it('component name is "Experience"', () => {
//       expect(Experience.name).toBe('Experience');
//     });

//     describe('row', () => {
//       it('is required', () => {
//         const prop = Experience.props.row;
//         expect(prop.required).toBe(true);
//       });

//       it('has type object', () => {
//         const prop = Experience.props.row;
//         expect(prop.type()).toBeTypeOf('object');
//       });
//     });

//     describe('index', () => {
//       it('is required', () => {
//         const prop = Experience.props.index;
//         expect(prop.required).toBe(true);
//       });

//       it('has type number', () => {
//         const prop = Experience.props.index;
//         expect(prop.type()).toBeNumber();
//       });
//     });
//   });

//   describe('component methods', () => {
//     let wrapper;
//     beforeEach(() => {
//       wrapper = createTestSubject(Experience, {
//         mocks: {},
//         stubs: [],
//         propsData: {
//           row: {},
//           index: 0,
//         },
//       });
//     });

//     it('renders the component', () => {
//       expect(wrapper.exists()).toBe(true);
//     });

//   describe('computed properties', () => {
//     describe('experienceJobTitle', () => {
//       it('returns the value that is created using index', async () => {
//         await wrapper.setProps({ index: 4, row: {} });
//         expect(wrapper.vm.experienceJobTitle).toBe('experience_job_title_4');
//       });
//     });

//     describe('experienceOrgBusinessName', () => {
//       it('returns the value that is created using index', async () => {
//         await wrapper.setProps({ index: 5, row: {} });
//         expect(wrapper.vm.experienceOrgBusinessName).toBe('experience_org_business_name_5');
//       });
//     });

//     describe('experienceStartDate', () => {
//       it('returns the value that is created using index', async () => {
//         await wrapper.setProps({ index: 5, row: {} });
//         expect(wrapper.vm.experienceStartDate).toBe('experience_start_date_5');
//       });
//     });

//     describe('experienceEndDate', () => {
//       it('returns the value that is created using index', async () => {
//         await wrapper.setProps({ index: 5, row: {} });
//         expect(wrapper.vm.experienceEndDate).toBe('experience_end_date_5');
//       });
//     });

//     describe('experienceTasks', () => {
//       it('returns the value that is created using index', async () => {
//         await wrapper.setProps({ index: 5, row: {} });
//         expect(wrapper.vm.experienceTasks).toBe('experience_tasks_5');
//       });
//     });

//     describe('experienceOtherTasks', () => {
//       it('returns the value that is created using index', async () => {
//         await wrapper.setProps({ index: 5, row: {} });
//         expect(wrapper.vm.experienceOtherTasks).toBe('experience_other_tasks_5');
//       });
//     });
//   });

// describe('template', () => {
//   beforeEach(async () => {
//     await wrapper.setProps({ index: 1, row: {} });
//   });
//     it('renders DateInput', () => {
//       expect(wrapper.find('DateInput-stub').exists()).toBe(true);
//     });

//     it('renders TextField', () => {
//       expect(wrapper.find('TextField-stub').exists()).toBe(true);
//     });

//     it('renders LawRelatedTasks', () => {
//       expect(wrapper.find('LawRelatedTasks-stub').exists()).toBe(true);
//     });
//   });

// });
// });

it('empty suite', () => {

});
