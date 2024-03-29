// import { createTestSubject } from '../helpers';
// import RepeatableFields from '@/components/RepeatableFields.vue';

// const TextField = {
//   name: 'TextField',
//   template: '<div/>',
// };

// let array = [1, 2, 3];

// describe('components/RepeatableFields', () => {
//   describe('props', () => {
//     let prop;

//     describe('component', () => {
//       beforeEach(() => {
//         prop = RepeatableFields.props.component;
//       });

//       it('is required', () => {
//         expect(prop.required).toBe(true);
//       });

//       it('has type Object', () => {
//         expect(prop.type()).toBeTypeOf('object');
//       });
//     });

//     describe('max', () => {
//       beforeEach(() => {
//         prop = RepeatableFields.props.max;
//       });

//       it('is optional', () => {
//         expect(prop.required).toBe(false);
//       });

//       it('has a default value false',() => {
//         expect(prop.default).toBe(false);
//       });

//       it('must be a Number or Boolean', () => {
//         expect(prop.type).toEqual([Number, Boolean]);
//         expect(prop.type).toEqual(expect.not.arrayContaining([String, Object, Array, Function]));
//       });
//     });

//     describe('value', () => {
//       beforeEach(() => {
//         prop = RepeatableFields.props.value;
//       });

//       it('is required', () => {
//         expect(prop.required).toBe(true);
//       });

//       const validTypes = [
//         ['null', null],
//         ['undefined', undefined],
//         ['an Array', ['one', 2]],
//       ];

//       it.each(validTypes)('can be %s', (label, value) => {
//         const valid = prop.validator(value);
//         expect(valid).toBe(true);
//       });

//       const invalidTypes = [
//         ['a String', 'hello'],
//         ['an empty String', ''],
//         ['a Number', 5],
//         ['an Object', { one: 1, two: 2 }],
//         ['a Date object', new Date()],
//         ['Boolean true', true],
//         ['Boolean false', false],
//       ];

//       it.each(invalidTypes)('can not be %s', (label, value) => {
//         const valid = prop.validator(value);
//         expect(valid).not.toBe(true);
//       });
//     });

//   });

//   describe('component instance', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = createTestSubject(RepeatableFields, {
//       mocks: {},
//       stubs: [],
//       propsData: {
//         value: null,
//         component: TextField,
//       },
//     });
//   });

//   it('renders successfully', () => {
//     expect(wrapper.exists()).toBeTrue();
//   });

//   it('component name is "RepeatableFields"', () => {
//     expect(RepeatableFields.name).toBe('RepeatableFields');
//   });

//   describe('template', () => {
//     it('renders single child component by default', () => {
//       expect(wrapper.find(TextField).exists()).toBe(true);
//     });

//     describe('number of repeatable components', () => {
//       describe('when value is not an instance of an array', () => {
//         it('renders one component', () => {
//           expect(wrapper.findAll(TextField)).toHaveLength(1);
//         });
//       });

//       describe('when value is an instance of an array', () => {
//         it('renders number of components equal to the length of the array', () => {
//           wrapper = createTestSubject(RepeatableFields, {
//             mocks: {},
//             stubs: [],
//             propsData: {
//               value: array,
//               component: TextField,
//             },
//           });
//           expect(wrapper.findAll(TextField)).toHaveLength(3);
//         });
//       });
//     });
//   });

//     describe('canAddRow', () => {
//       it('when max is not set', () => {
//         expect(wrapper.vm.canAddRow).toBe(true);
//       });

//       describe("when max is set and it's greater than number of rows", () => {
//         it('sets canAddRow value to true', () => {
//           wrapper = createTestSubject(RepeatableFields, {
//             mocks: {},
//             stubs: [],
//             propsData: {
//               value: array,
//               max: 5,
//               component: TextField,
//             },
//           });
//           expect(wrapper.vm.canAddRow).toBe(true);
//         });
//       });

//       describe("when max is set and it's less than number of rows", () => {
//         it('sets canAddRow value to false', () => {
//           wrapper = createTestSubject(RepeatableFields, {
//             mocks: {},
//             stubs: [],
//             propsData: {
//               value: array,
//               max: 2,
//               component: TextField,
//             },
//           });
//           expect(wrapper.vm.canAddRow).toBe(false);
//         });
//       });

//       describe("when max is set and it's equal to number of rows", () => {
//         it('sets canAddRow value to true', () => {
//           wrapper = createTestSubject(RepeatableFields, {
//             mocks: {},
//             stubs: [],
//             propsData: {
//               value: array,
//               max: 3,
//               component: TextField,
//             },
//           });
//           expect(wrapper.vm.canAddRow).toBe(false);
//       });
//     });
//   });

//   describe('created hook', () => {
//     describe('if value is an array', () => {
//       it('updates the value of rows and does not call emit', ()=> {
//         wrapper = createTestSubject(RepeatableFields, {
//           mocks: {},
//           stubs: [],
//           propsData: {
//             value: array,
//             max: 3,
//             component: TextField,
//           },
//         });
//         expect(wrapper.vm.rows).toBe(array);
//         expect(wrapper.emitted().input).not.toBeTruthy();
//       });
//     });

//     describe('if value is not an array', () => {
//       it('emits the initial rows value', async ()=> {
//         await wrapper.setProps({ value: undefined });
//         expect(wrapper.emitted().input).toBeTruthy();
//       });
//     });

//     describe('if rows array is empty', () => {
//       it('pushes an object to rows', async ()=> {
//         await wrapper.setProps({ value: undefined });
//         expect(wrapper.vm.rows).toContainEqual({});
//       });
//     });
//   });

//   describe('methods', () => {
//     describe('addRow', () => {
//       it('increases numbers of rows and renders another instance of a component', () => {
//         wrapper = createTestSubject(RepeatableFields, {
//           mocks: {},
//           stubs: [],
//           propsData: {
//             value: array,
//             max: undefined,
//             component: TextField,
//           },
//         });

//         expect(wrapper.vm.rows.length).toBe(3);

//         wrapper.vm.addRow();
//         expect(wrapper.vm.rows.length).toBe(4);
//       });
//     });

//     describe('removeRow', () => {
//       it('removes an item at the index', () => {
//         array = [1, 2, 3, 4];

//         wrapper = createTestSubject(RepeatableFields, {
//           mocks: {},
//           stubs: [],
//           propsData: {
//             value: array,
//             component: TextField,
//           },
//         });

//         wrapper.vm.removeRow(2);
//         expect(wrapper.vm.rows[0]).toBe(1);
//         expect(wrapper.vm.rows[1]).toBe(2);
//         expect(wrapper.vm.rows[2]).toBe(4);
//       });
//     });
//   });

//   });
// });

it('empty suite', () => {

});
