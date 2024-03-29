// import { createTestSubject } from '../../helpers';
// import TextareaInput from '@/components/Form/TextareaInput.vue';

// describe('components/Form/TextareaInput', () => {
//   describe('props', () => {
//     let prop;

//     describe('rows', () => {
//       beforeEach(() => {
//         prop = TextareaInput.props.rows;
//       });

//       it('must be a String', () => {
//         expect(prop.type()).toBeTypeOf('string');
//       });

//       it('defaults as \'5\'', () => {
//         expect(prop.default).toBe('5');
//       });

//     });

//     describe('value', () => {
//       beforeEach(() => {
//         prop = TextareaInput.props.value;
//       });

//       it('type is String', () => {
//         expect(prop.type()).toBeTypeOf('string');
//       });

//       it('defaults as \'\'', () => {
//         expect(prop.default).toBe('');
//       });

//     });

//   });

//   describe('component instance', () => {
//     let wrapper;
//     const mockProps = {
//       id: 'mockId',
//       label: 'mock label',
//     };

//     beforeEach(() => {
//       wrapper = createTestSubject(TextareaInput, {
//         mocks: {},
//         stubs: [],
//         propsData: mockProps,
//       });
//     });

//     it('renders the component', () => {
//       expect(wrapper.exists()).toBe(true);
//     });

//     describe('template', () => {
//       describe('label', () => {
//         it('sets the label to the value of the `label` prop', async () => {
//           await wrapper.setProps({ label: 'My Form Label' });
//           expect(wrapper.find('label').text()).toBe('My Form Label');
//         });
//       });

//       describe('hint', () => {
//         let hint;
//         describe('when the prop is set', () => {
//           beforeEach(async () => {
//             await wrapper.setProps({ hint: 'my_hint' });
//             hint = wrapper.find('.govuk-hint');
//           });

//           it('shows a hint', () => {
//             expect(hint.exists()).toBe(true);
//           });
//           it('sets the hint to the value of the `hint` prop', () => {
//             expect(wrapper.find('customhtml-stub').exists()).toBe(true);
//             expect(wrapper.find('customhtml-stub').attributes('value')).toBe('my_hint');
//           });
//         });

//         describe('when the prop is not set', () => {
//           beforeEach(() => {
//             hint = wrapper.find('.govuk-hint');
//           });

//           it('does not show hint', () => {
//             expect(hint.exists()).toBe(false);
//           });
//         });
//       });

//       describe('id', () => {
//         it('sets <label> `for` attribute', async () => {
//           await wrapper.setProps({ id: 'my_unique_key' });
//           expect(wrapper.find('label').attributes().for).toBe('my_unique_key');
//         });

//         it('sets <textarea> `id` attribute', async () => {
//           await wrapper.setProps({ id: 'my_unique_key' });
//           expect(wrapper.find('textarea').attributes().id).toBe('my_unique_key');
//         });
//       });

//       describe('rows', () => {
//         it('sets the rows prop to the default value of 5 when no value is set', () => {
//           expect(wrapper.find('textarea').attributes().rows).toBe('5');
//         });

//         it('sets the rows to the value of the `rows` prop', async () => {
//           await wrapper.setProps({ rows: '2' });
//           expect(wrapper.find('textarea').attributes().rows).toBe('2');
//         });
//       });
//     });

//     describe('`v-model` interface', () => {
//       describe('when text changes', () => {
//         it('emits an input event with the new value', async () => {
//           await wrapper.setData({ text: 'new-value' });
//           expect(wrapper.emitted().input).toEqual([['new-value']]);
//         });
//       });

//       describe('when value prop changes', () => {
//         it('updates the `text` computed property', async () => {
//           await wrapper.setProps({ value: 'my_value' });
//           expect(wrapper.vm.text).toEqual('my_value');
//         });
//       });
//     });

//     describe('word-count', () => {

//       beforeEach(async () => {
//         await wrapper.setProps({
//           label: '',
//           id: 'mockId',
//           wordLimit: 10,
//         });
//       });
//       it.skip('sets label based on wordLimit text', () => {
//           expect(wrapper.find('label').text()).toBe('In 10 words, tell us how.');
//       });
//       describe('counting words', () => {
//         it('splits words by any non alphabetical', async () => {
//           await wrapper.setProps({ value: 'one two\nthree+four0five_six!seven&eight' });
//           expect(wrapper.vm.words).toEqual(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']);
//         });
//         it('allows three hyphens per word counted', async () => {
//           await wrapper.setProps({ value: 'one-one-one-one-two-two-two-two-three-three-three-three' });
//           expect(wrapper.vm.words).toEqual(['one-one-one-one-','two-two-two-two-','three-three-three-three']);
//         });
//         it('allows for hyphens used like bullet points (not counted when on their own)', async () => {
//           await wrapper.setProps({ value: '- one-one-one-one\n- two-two-two-two\n- three-three-three-three\n' });
//           expect(wrapper.vm.words).toEqual(['one-one-one-one','two-two-two-two','three-three-three-three']);
//         });
//       });

//     });

//   });
// });

it('empty suite', () => {

});
