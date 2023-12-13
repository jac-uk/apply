// import { createTestSubject } from '../../helpers';
// import RadioItem from '@/components/Form/RadioItem.vue';
// import { vi } from 'vitest';

// describe('components/Form/RadioItem', () => {
//   it('component name is "RadioItem"', () => {
//     expect(RadioItem.name).toBe('RadioItem');
//   });

//   describe('props', () => {
//     let prop;

//     describe('label', () => {
//       beforeEach(() => {
//         prop = RadioItem.props.label;
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
//         prop = RadioItem.props.value;
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
//         prop = RadioItem.props.hint;
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
//     const RadioGroup = {
//       name: 'RadioGroup',
//       template: '<div/>',
//       computed: {
//         inputValue(){
//           return 'example-value';
//         },
//       },
//     };
//     let wrapper;

//     beforeEach(() => {
//       wrapper = createTestSubject(RadioItem,{
//         propsData: {
//           label: 'Example radio item',
//           value: 'example-value',
//           content: 'Conditional content',
//           hint: 'Label hint text',
//         },
//         stubs: [],
//         slots: ['<div/>'],
//         parent: RadioGroup,
//       });
//     });

//     it('throws an error if the parent component is not "RadioGroup"', () => {
//       const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
//       const BadParent = () => {
//         return createTestSubject(RadioItem, {
//           stubs: [],
//           propsData: {
//             label: 'Example radio item',
//             value: 'example-value',
//           },
//         });
//       };

//       expect(BadParent).toThrow('RadioItem component can only be used inside a RadioGroup component');
//       expect(consoleError).toHaveBeenCalled();
//       consoleError.mockRestore();
//     });
//     describe('data', () => {
//       describe('hasConditionalContent', () => {
//         it('is true when slot content was supplied', () => {
//           expect(wrapper.vm.hasConditionalContent).toBe(true);
//         });

//         it('is false when slot content was not supplied', () => {
//           wrapper = createTestSubject(RadioItem,{
//             propsData: {
//               label: 'Example radio item',
//               value: 'example-value',
//             },
//             stubs: [],
//             parent: RadioGroup,
//           });
//           expect(wrapper.vm.hasConditionalContent).toBe(false);
//         });
//       });
//     });

//   describe('template', () => {
//     it('renders a `.govuk-radios__item` element', () => {
//       const item = wrapper.find('.govuk-radios__item');
//       expect(item.exists()).toBe(true);
//     });

//     describe('radio input', () => {
//       let input;
//       beforeEach(() => {
//         input = wrapper.find('input[type=radio]');
//       });

//       it('renders a radio input', () => {
//         expect(input.exists()).toBe(true);
//       });

//       it('has class name `.govuk-radios__input`', () => {
//         expect(input.is('.govuk-radios__input')).toBe(true);
//       });
//     });

//     describe('label', () => {
//       let label;
//       beforeEach(() => {
//         label = wrapper.find('label');
//       });

//       it('renders a label', () => {
//         expect(label.exists()).toBe(true);
//       });

//       it('has class name `.govuk-radios__label`', () => {
//         expect(label.is('.govuk-radios__label')).toBe(true);
//       });

//       it('contains the label text', () => {
//         expect(label.text()).toBe('Example radio item');
//       });
//     });

//     it('label `for` and input `id` attributes match', () => {
//       const input = wrapper.find('input[type=radio]');
//       const label = wrapper.find('label');
//       expect(label.attributes('for')).toBe(input.attributes('id'));
//     });

//     describe('hint', () => {
//       let hint;
//       describe('when the `hint` prop is set', () => {
//         beforeEach(() => {
//           hint = wrapper.find('.govuk-radios__hint');
//         });

//         it('renders a `.govuk-radios__hint` element', () => {
//           expect(hint.exists()).toBe(true);
//         });

//         it('contains the hint text', () => {
//           expect(hint.text()).toBe('Label hint text');
//         });

//         it('sets attribute `aria-describedby` on the input to reference the hint element', () => {
//           const input = wrapper.find('input[type=radio]');
//           expect(input.attributes('aria-describedby')).toBe(hint.attributes('id'));
//         });
//       });

//       describe('when the `hint` prop is not set', () => {
//         beforeEach(() => {
//           wrapper = createTestSubject(RadioItem,{
//             propsData: {
//               label: 'Example radio item',
//               value: 'example-value',
//             },
//             stubs: [],
//             parent: RadioGroup,
//           });
//           hint = wrapper.find('.govuk-radios__hint');
//         });

//         it('does not render', () => {
//           expect(hint.exists()).toBe(false);
//         });

//         it('does not set attribute `aria-describedby` on the input', () => {
//           const input = wrapper.find('input[type=radio]');
//           expect(input.attributes()).not.toContainKey('aria-describedby');
//         });
//       });
//     });

//     describe('conditional content', () => {
//       describe('when the radio value is selected', () => {
//         describe('and conditional content was given', () => {
//           it('renders conditional content', () => {
//             const conditional = wrapper.find('.govuk-radios__conditional');
//             expect(conditional.exists()).toBe(true);
//           });
//         });

//         describe('and conditional content was not given', () => {
//           it('does not render conditional content', () => {
//             wrapper = createTestSubject(RadioItem,{
//               propsData: {
//                 label: 'Example radio item',
//                 value: 'example-value',
//                 hint: 'Label hint text',
//               },
//               stubs: [],
//               slots: [],
//               parent: RadioGroup,
//             });
//             const conditional = wrapper.find('.govuk-radios__conditional');
//             expect(conditional.exists()).toBe(false);
//           });
//         });
//       });

//       describe('when the radio value is not selected', () => {
//         it('does not render conditional content', () => {
//           wrapper = createTestSubject(RadioItem,{
//             propsData: {
//               label: 'Example radio item',
//               content: 'Conditional content',
//               value: null,
//               hint: 'Label hint text',
//             },
//             stubs: [],
//             slots: ['<div/>'],
//             parent: RadioGroup,
//           });
//           const conditional = wrapper.find('.govuk-radios__conditional');
//           expect(conditional.exists()).toBe(false);
//         });
//       });
//     });
//   });
// });
// });

it('empty suite', () => {

});
