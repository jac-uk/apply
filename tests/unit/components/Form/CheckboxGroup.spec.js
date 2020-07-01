import { createTestSubject } from '../../helpers';
import CheckboxGroup from '@/components/Form/CheckboxGroup';

describe('components/Form/CheckboxGroup', () => {

    it('component name is "CheckboxGroup"', () => {
        expect(CheckboxGroup.name).toBe('CheckboxGroup');
    });

    describe('props', () => {
        let prop;

        describe('value', () => {
            beforeEach(() => {
                prop = CheckboxGroup.props.value;
            });
                
            it('is required', () => {
                expect(prop.required).toBe(true);
            });
            
            const validTypes = [
                ['null', null],
                ['undefined', undefined],
                ['an Array', ['one', 2]],
            ];
            
            it.each(validTypes)('can be %s', (label, value) => {
                const valid = prop.validator(value);
                expect(valid).toBe(true);
            });
        });
    });

    describe('component instance', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = createTestSubject(CheckboxGroup, {
                mocks: {},
                stubs: [],
                propsData: {
                    label: 'Example question',
                    id: 'example',
                    value: ['selected-Checkbox-value'],
                },
                slots: ['CheckboxItem components'],
            });
        });
    describe('`v-model` interface', () => {
        describe('when the `value` property changes', () => {
            it('updates computed property `inputValue`', () => {
                expect(wrapper.vm.inputValue[0]).toBe('selected-Checkbox-value');
                    wrapper.setProps({
                        value: ['some-other-value'],
                    });
                expect(wrapper.vm.inputValue).toEqual(['some-other-value']);
            });
        });

        describe('when computed property `inputValue` changes', () => {
            it('emits an `input` event', () => {
                wrapper.setData({
                    inputValue: ['some-new-value'],
                });

                const emitted = wrapper.emitted().input;
                expect(emitted).toBeArrayOfSize(1);
                expect(emitted[0][0][0]).toBe('some-new-value');
            });
        });
    });

    describe('template', () => {
        it('the root element has the `id` attribute which was passed in as prop `id`', () => {
            expect(wrapper.is('#example')).toBe(true);
        });

        describe('<legend> element', () => {
            describe('when the `label` prop is set', () => {
                it('displays the label in a <legend> element', () => {
                    wrapper.setProps({ label: 'my_label' });
                    const legend = wrapper.find('legend');
                    expect(legend.exists()).toBe(true);
                    expect(legend.text()).toBe('my_label');
                    expect(legend.is('.govuk-fieldset__legend')).toBe(true);
                });
            });

            describe('when the `label` prop is empty', () => {
                it('does not render a <legend>', () => {
                    wrapper.setProps({ label: '' });
                    const legend = wrapper.find('legend');
                    expect(legend.exists()).toBe(false);
                });
            });

            it('is wrapped in a <fieldset>', () => {
                const fieldset = wrapper.find('fieldset');
                expect(fieldset.exists()).toBe(true);
                expect(fieldset.is('.govuk-fieldset')).toBe(true);
                const legend = fieldset.find('legend');
                expect(legend.exists()).toBe(true);
            });
        });

        describe('hint text', () => {
            describe('when the `hint` prop is set', () => {
                let hint;
                beforeEach(() => {
                    wrapper.setProps({
                        label: 'my_label',
                        hint: "my_hint",
                        id: 'my_mock_id',
                    });
                    hint = wrapper.find('span.govuk-hint');
                });

                it('displays the hint', () => {
                    expect(hint.exists()).toBe(true);
                    expect(hint.text()).toBe("my_hint");
                });

                it('gives the hint element an `id` based on the main component `id`', () => {
                expect(hint.attributes('id')).toBe('my_mock_id__hint');
                });

                it('sets attribute `aria-describedby` on the <fieldset> to reference the hint element `id`', () => {
                    const fieldset = wrapper.find('fieldset');
                    expect(fieldset.attributes('aria-describedby')).toBe('my_mock_id__hint');
                });
            });

            describe('when the `hint` prop is not set', () => {
                let hint;
                beforeEach(() => {
                    wrapper = createTestSubject(CheckboxGroup,{
                        propsData: {
                        id: 'my_unique_id',
                        value: ['my_value'],
                        label: 'my_label',
                        hint: undefined,
                        },
                        stubs: [],
                    });
                    hint = wrapper.find('span.govuk-hint');
                });

                it('does not render the hint element', () => {
                    expect(hint.exists()).toBe(false);
                });
            });
        });

        describe('`.govuk-checkboxes` slot container', () => {
            let slotContainer;
                beforeEach(() => {
                    slotContainer = wrapper.find('.govuk-checkboxes');
                });

                it('exists', () => {
                    expect(slotContainer.exists()).toBe(true);
                });

                it('renders default slot content', () => {
                    expect(slotContainer.text()).toBe('CheckboxItem components');
                });

                it('is inside the <fieldset>', () => {
                    const fieldsets = wrapper.findAll('fieldset');
                    expect(fieldsets.at(0).attributes('class')).toBe('govuk-fieldset');
                });
            });
        });
    });     
});
