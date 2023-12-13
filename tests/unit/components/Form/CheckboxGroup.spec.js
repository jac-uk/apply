// import { createTestSubject } from '../../helpers';
// import CheckboxGroup from '@/components/Form/CheckboxGroup.vue';

// describe('components/Form/CheckboxGroup', () => {

//     it('component name is "CheckboxGroup"', () => {
//         expect(CheckboxGroup.name).toBe('CheckboxGroup');
//     });

//     describe('props', () => {
//         let prop;

//         describe('value', () => {
//             beforeEach(() => {
//                 prop = CheckboxGroup.props.value;
//             });

//             it('is required', () => {
//                 expect(prop.required).toBe(true);
//             });

//             const validTypes = [
//                 ['null', null],
//                 ['undefined', undefined],
//                 ['an Array', ['one', 2]],
//             ];

//             it.each(validTypes)('can be %s', (label, value) => {
//                 const valid = prop.validator(value);
//                 expect(valid).toBe(true);
//             });
//         });
//     });

//     describe('component instance', () => {
//         let wrapper;

//         let mockProps = {
//             label: 'Example question',
//             id: 'example',
//             value: ['selected-Checkbox-value'],
//         };

//         const mockSlots = ['CheckboxItem components'];

//         beforeEach(() => {
//             wrapper = createTestSubject(CheckboxGroup, {
//                 mocks: {},
//                 stubs: [],
//                 propsData: mockProps,
//                 slots: mockSlots,
//             });
//         });

//         describe('`v-model` interface', () => {
//             describe('when the `value` property changes', () => {
//                 it('updates computed property `inputValue`', async () => {
//                     const updateVal = ['some-other-value'];
//                     expect(wrapper.vm.inputValue[0]).toBe(mockProps.value[0]);
//                     await wrapper.setProps({
//                         value: updateVal,
//                     });
//                     expect(wrapper.vm.inputValue).toEqual(updateVal);
//                 });
//             });

//             describe('when computed property `inputValue` changes', () => {
//                 const updateVal = ['some-new-value'];

//                 it('emits an `input` event', async () => {
//                     await wrapper.setData({
//                         inputValue: updateVal,
//                     });
//                     const emitted = wrapper.emitted().input;
//                     expect(emitted).toBeArrayOfSize(1);
//                     expect(emitted[0][0]).toBe(updateVal);
//                 });
//             });
//         });

//         describe('template', () => {
//             it('the root element has the `id` attribute which was passed in as prop `id`', () => {
//                 expect(wrapper.is(`#${mockProps.id}`)).toBe(true);
//             });

//             describe('<legend> element', () => {
//                 describe('when the `label` prop is set', () => {
//                     const mockLabel = { label: 'my_label', required: true };
//                     it('displays the label in a <legend> element', async () => {
//                         await wrapper.setProps(mockLabel);
//                         const legend = wrapper.find('legend');
//                         expect(legend.exists()).toBe(true);
//                         expect(legend.text()).toBe(mockLabel.label);
//                         expect(legend.is('.govuk-fieldset__legend')).toBe(true);
//                     });
//                 });

//                 describe('when the `label` prop is empty', () => {
//                     it('does not render a <legend>', async () => {
//                         await wrapper.setProps({ label: '' });
//                         const legend = wrapper.find('legend');
//                         expect(legend.exists()).toBe(false);
//                     });
//                 });

//                 it('is wrapped in a <fieldset>', () => {
//                     const fieldset = wrapper.find('fieldset');
//                     expect(fieldset.contains('legend')).toBeTrue();
//                 });
//             });

//             describe('hint text', () => {
//                 describe('when the `hint` prop is set', () => {
//                     let hint;
//                     mockProps = {
//                         label: 'my_label',
//                         hint: 'my_hint',
//                         id: 'my_mock_id',
//                         value: ['new-value'],
//                     };

//                     beforeEach(async () => {
//                         await wrapper.setProps({
//                             mockProps,
//                         });
//                         hint = wrapper.find('span.govuk-hint');
//                     });

//                     it('displays the hint', () => {
//                         expect(hint.exists()).toBe(true);
//                         expect(hint.text()).toBe(mockProps.hint);
//                     });

//                     it('gives the hint element an `id` based on the main component `id`', () => {
//                         expect(hint.attributes('id')).toBe(`${mockProps.id}__hint`);
//                     });

//                     it('sets attribute `aria-describedby` on the <fieldset> to reference the hint element `id`', () => {
//                         const fieldset = wrapper.find('fieldset');
//                         expect(fieldset.attributes('aria-describedby')).toBe(`${mockProps.id}__hint`);
//                     });
//                 });

//             describe('when the `hint` prop is not set', () => {
//                 let hint;
//                 beforeEach(() => {
//                     wrapper = createTestSubject(CheckboxGroup,{
//                         propsData: {
//                         id: 'my_unique_id',
//                         value: ['my_value'],
//                         label: 'my_label',
//                         hint: undefined,
//                         },
//                         stubs: [],
//                     });
//                     hint = wrapper.find('span.govuk-hint');
//                 });

//                 it('does not render the hint element', () => {
//                     expect(hint.exists()).toBe(false);
//                 });
//             });
//         });

//         describe('`.govuk-checkboxes` slot container', () => {
//             let slotContainer;
//                 beforeEach(() => {
//                     slotContainer = wrapper.find('.govuk-checkboxes');
//                 });

//                 it('exists', () => {
//                     expect(slotContainer.exists()).toBe(true);
//                 });

//                 it('renders default slot content', () => {
//                     expect(slotContainer.text()).toBe(mockSlots[0]);
//                 });

//                 it('is inside the <fieldset>', () => {
//                     const fieldsets = wrapper.findAll('fieldset');
//                     expect(fieldsets.at(0).attributes('class')).toBe('govuk-fieldset');
//                 });
//             });
//         });
//     });
// });

it('empty suite', () => {

});
