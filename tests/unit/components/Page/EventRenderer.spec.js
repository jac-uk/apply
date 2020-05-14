import { createTestSubject } from '../../helpers';
import EventRenderer from '@/components/Page/EventRenderer';

describe('components/Form/EventRenderer', () => {
    describe('props', () => {
    let prop;
    beforeEach(() => {
        prop = EventRenderer.props.events;
    });
    it('is required', () => {
        expect(prop.required).toBeTruthy();
    });
    it('is an array', () => {
        expect(prop.type()).toBeArray();
    });
    it('defaults to empty array', () => {
        expect(prop.default).toEqual([]);
    });
    });
    describe('component instance', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = createTestSubject(EventRenderer, {
                propsData: {
                    tasks: [],
                    id: 'my_unique_id',
                    otherTasks: 'other_task_string',
                },
                stubs: [],
            });
        });
        it('renders the component', () => {
            expect(wrapper.exists()).toBe(true);
        });
    });
});
