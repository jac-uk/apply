// import { createTestSubject } from '../../helpers';
// import CheckboxItem from '@/components/Form/CheckboxItem.vue';
// import { vi } from 'vitest';

// const mockProps = {
//   label: 'Example checkbox item',
//   value: 'example-value',
//   content: 'Conditional content',
//   hint: 'Label hint text',
// };

// describe('components/Form/CheckboxItem', () => {

//   it('component name is "CheckboxItem"', () => {
//     expect(CheckboxItem.name).toBe('CheckboxItem');
//   });

//   describe('props', () => {
//     let prop;
//     describe('label', () => {
//       beforeEach(() => {
//         prop = CheckboxItem.props.label;
//       });

//       it('is required', () => {
//         expect(prop.required).toBe(true);
//       });

//       it('must be a String', () => {
//         expect(prop.type()).toBeTypeOf('string');
//       });
//     });

//     describe('value', () => {
//       beforeEach(() => {
//         prop = CheckboxItem.props.value;
//       });

//       it('is required', () => {
//         expect(prop.required).toBe(true);
//       });

//       const validTypes = [
//         ['null', null],
//         ['undefined', undefined],
//         ['a String', 'hello'],
//         ['an empty String', ''],
//         ['a Number', 5],
//         ['an Array', ['one', 2]],
//         ['an Object', { one: 1, two: 2 }],
//         ['a Date object', new Date()],
//         ['Boolean true', true],
//         ['Boolean false', false],
//       ];

//       it.each(validTypes)('can be %s', (label, value) => {
//         const valid = prop.validator(value);
//         expect(valid).toBe(true);
//       });
//     });

//     describe('hint', () => {
//       beforeEach(() => {
//         prop = CheckboxItem.props.hint;
//       });

//       it('is optional', () => {
//         expect(prop.required).not.toBe(true);
//       });

//       it('must be a String', () => {
//         expect(prop.type()).toBeTypeOf('string');
//       });
//     });
//   });

//   describe('component instance', () => {
//     const CheckboxGroup = {
//       name: 'CheckboxGroup',
//       template: '<div/>',
//       computed: {
//         inputValue(){
//           return ['example-value','one-value', 'two-value'];
//         },
//       },
//     };
//     let wrapper;

//     beforeEach(() => {
//       wrapper = createTestSubject(CheckboxItem,{
//         propsData: mockProps,
//         stubs: [],
//         slots: ['<div/>'],
//         parent: CheckboxGroup,
//       });
//     });

//     it('throws an error if the parent component is not "CheckboxGroup"', () => {
//       const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
//       const BadParent = () => {
//         return createTestSubject(CheckboxItem, {
//           stubs: [],
//           propsData: mockProps,
//         });
//       };
//       expect(BadParent).toThrow('CheckboxItem component can only be used inside a CheckboxGroup component');
//       expect(consoleError).toHaveBeenCalled();
//       consoleError.mockRestore();
//     });

//     it('renders the component', () => {
//       expect(wrapper.exists()).toBeTrue();
//       expect(wrapper.vm.$parent.$options.name).toEqual(CheckboxGroup.name);
//     });

//     describe('data', () => {
//       describe('hasConditionalContent', () => {
//         it('is true when slot content was supplied', () => {
//           expect(wrapper.vm.hasConditionalContent).toBe(true);
//         });

//         it('is false when slot content was not supplied', () => {
//           wrapper = createTestSubject(CheckboxItem,{
//             propsData: mockProps,
//             stubs: [],
//             parent: CheckboxGroup,
//           });
//           expect(wrapper.vm.hasConditionalContent).toBe(false);
//         });
//       });
//     });

//     describe('template', () => {
//       it('renders a `.govuk-checkboxes__item` element', () => {
//         const item = wrapper.find('.govuk-checkboxes__item');
//         expect(item.exists()).toBe(true);
//       });

//       describe('checkbox input', () => {
//         let input;
//         beforeEach(() => {
//           input = wrapper.find('input[type=checkbox]');
//         });

//         it('renders a checkbox input', () => {
//           expect(input.exists()).toBe(true);
//         });

//         it('has class name `.govuk-checkboxes__input`', () => {
//           expect(input.is('.govuk-checkboxes__input')).toBe(true);
//         });
//       });

//       describe('label', () => {
//         let label;
//         beforeEach(() => {
//           label = wrapper.find('label');
//         });

//         it('renders a label', () => {
//           expect(label.exists()).toBe(true);
//         });

//         it('has class name `.govuk-checkboxes__label`', () => {
//           expect(label.is('.govuk-checkboxes__label')).toBe(true);
//         });

//         it('contains the label text', () => {
//           expect(label.text()).toBe(mockProps.label);
//         });
//       });

//       it('label `for` and input `id` attributes match', () => {
//         const input = wrapper.find('input[type=checkbox]');
//         const label = wrapper.find('label');
//         expect(label.attributes('for')).toBe(input.attributes('id'));
//       });

//       describe('hint', () => {
//         let hint;
//         describe('when the `hint` prop is set', () => {
//           beforeEach(() => {
//             hint = wrapper.find('.govuk-checkboxes__hint');
//           });

//           it('renders a `.govuk-checkboxes__hint` element', () => {
//             expect(hint.exists()).toBe(true);
//           });

//           it('contains the hint text', () => {
//             expect(hint.text()).toBe(mockProps.hint);
//           });

//           it('sets attribute `aria-describedby` on the input to reference the hint element', () => {
//             const input = wrapper.find('input[type=checkbox]');
//             expect(input.attributes('aria-describedby')).toBe(hint.attributes('id'));
//           });
//         });

//         describe('when the `hint` prop is not set', () => {
//           beforeEach(async () => {
//             await wrapper.setProps({ hint: null });
//             hint = wrapper.find('.govuk-checkboxes__hint');
//           });

//           it('does not render', () => {
//             expect(hint.exists()).toBe(false);
//           });

//           it('does not set attribute `aria-describedby` on the input', () => {
//             const input = wrapper.find('input[type=checkbox]');
//             expect(input.attributes()).not.toContainKey('aria-describedby');
//           });
//         });
//       });

//       describe('conditional content', () => {
//         describe('when the checkbox is selected', () => {
//           describe('and conditional content was given', () => {
//             it('renders conditional content', () => {
//               const conditional = wrapper.find('.govuk-checkboxes__conditional');
//               expect(conditional.exists()).toBe(true);
//             });
//           });

//           describe('and conditional content was not given', () => {
//             it('does not render conditional content', () => {
//               wrapper = createTestSubject(CheckboxItem,{
//                 propsData: mockProps,
//                 stubs: [],
//                 parent: CheckboxGroup,
//               });
//               const conditional = wrapper.find('.govuk-checkboxes__conditional');
//               expect(conditional.exists()).toBe(false);
//             });
//           });
//         });

//         describe('when the checkbox value is not selected', () => {
//           it('does not render conditional content', () => {
//               wrapper = createTestSubject(CheckboxItem, {
//                 propsData: mockProps,
//                 stubs: [],
//                 parent: CheckboxGroup,
//               });
//             const conditional = wrapper.find('.govuk-checkboxes__conditional');
//             expect(conditional.exists()).toBe(false);
//           });
//         });
//       });
//     });
//   });

// });

it('empty suite', () => {

});
