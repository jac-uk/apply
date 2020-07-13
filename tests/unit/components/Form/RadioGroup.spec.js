import { createTestSubject } from '../../helpers';

import RadioGroup from '@/components/Form/RadioGroup';

const mockProps = {
    label: 'myLabel',
    id: 'myID',
    value: 'selected-radio-value',
    hint: 'myHint',
};

describe('components/Form/RadioGroup', () => {
    it('component name is "RadioGroup"', () => {
        expect(RadioGroup.name).toBe('RadioGroup');
    });

    describe('props', () => {
        let prop;

        describe('value', () => {
            beforeEach(() => {
                prop = RadioGroup.props.value;
            });
                
            it('is required', () => {
                expect(prop.required).toBe(true);
            });
            
            const validTypes = [
                ['null', null],
                ['undefined', undefined],
                ['a String', 'hello'],
                ['an empty String', ''],
                ['a Number', 5],
                ['an Array', ['one', 2]],
                ['an Object', { one: 1, two: 2 }],
                ['a Date object', new Date()],
                ['Boolean true', true],
                ['Boolean false', false],
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
            wrapper = createTestSubject(RadioGroup, {
                mocks: {},
                stubs: [],
                propsData: mockProps,
                slots: ['RadioItem components'],
            });
        });
        describe('`v-model` interface', () => {
            describe('when the `value` property changes', () => {
                it('updates computed property `inputValue`', () => {
                    expect(wrapper.vm.inputValue).toBe(mockProps.value);
                    wrapper.setProps({
                        value: 'some-other-value',
                    });
                    expect(wrapper.vm.inputValue).toBe('some-other-value');
                });
            });

        describe('when computed property `inputValue` changes', () => {
            let updatedVal = 'some-new-value';
            it('emits an `input` event', () => {
                wrapper.setData({
                    inputValue: updatedVal,
                });

                const emitted = wrapper.emitted().input;

                expect(emitted).toBeArrayOfSize(1);
                expect(emitted[0][0]).toBe(updatedVal);
            });
        });
    });

    describe('template', () => {
        it('the root element has the `id` attribute which was passed in as prop `id`', () => {
            expect(wrapper.is(`#${mockProps.id}`)).toBe(true);
        });

        describe('<legend> element', () => {
            describe('when the `label` prop is set', () => {
                it('displays the label in a <legend> element', () => {
                    const legend = wrapper.find('legend');
                    expect(legend.exists()).toBe(true);
                    expect(legend.text()).toBe(mockProps.label);
                    expect(legend.is('.govuk-fieldset__legend')).toBe(true);
                });
            });

            describe('when the `label` prop is empty', () => {
                it('does not render a <legend>', () => {
                    wrapper.setProps({ label: null });
                    const legend = wrapper.find('legend');
                    expect(legend.exists()).toBe(false);
                });
            });

            it('is wrapped in a <fieldset>', () => {
                const fieldset = wrapper.find('fieldset');
                expect(fieldset.contains('legend')).toBeTrue();
            });
        }); 

        describe('hint text', () => {
            describe('when the `hint` prop is set', () => {
                let hint;
                beforeEach(() => {
                    hint = wrapper.find('span.govuk-hint');
                });

                it('displays the hint', () => {
                    expect(hint.exists()).toBe(true);
                    expect(hint.text()).toBe(mockProps.hint);
                });

                it('gives the hint element an `id` based on the main component `id`', () => {
                expect(hint.attributes('id')).toBe(`${mockProps.id}__hint`);
                });

                it('sets attribute `aria-describedby` on the <fieldset> to reference the hint element `id`', () => {
                    const fieldset = wrapper.find('fieldset');
                    expect(fieldset.attributes('aria-describedby')).toBe(`${mockProps.id}__hint`);
                });
            });

            describe('when the `hint` prop is not set', () => {
                let hint;
                beforeEach(() => {
                    wrapper.setProps({ hint: null });
                    hint = wrapper.find('span.govuk-hint');
                });

                it('does not render the hint element', () => {
                    expect(hint.exists()).toBe(false);
                });
            });
        });

        describe('`.govuk-radios` slot container', () => {
            let slotContainer;
                beforeEach(() => {
                    slotContainer = wrapper.find('.govuk-radios');
                });

                it('exists', () => {
                    expect(slotContainer.exists()).toBe(true);
                });

                it('renders default slot content', () => {
                    expect(slotContainer.text()).toBe('RadioItem components');
                });

                it('is inside the <fieldset>', () => {
                    const fieldset = wrapper.find('fieldset');
                    expect(fieldset.find('.govuk-radios').exists()).toBe(true);
                });
            });
        });
    });     
});
