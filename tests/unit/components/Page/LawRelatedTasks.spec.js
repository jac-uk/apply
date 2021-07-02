import { createTestSubject } from '../../helpers';
// import LawRelatedTasks from '@/components/Page/LawRelatedTasks';
const LawRelatedTasks = 'b';

xdescribe('components/Form/LawRelatedTasks', () => {
    describe('props', () => {
        describe('tasks', () => {
            let prop;
            beforeEach(() => {
                prop = LawRelatedTasks.props.tasks;   
            });
            it('is required', () => {
                expect(prop.required).toBeTruthy();
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
        describe('id', () => {
            let prop;
            beforeEach(() => {
                prop = LawRelatedTasks.props.id;   
            });
            it('is required', () => {
                expect(prop.required).toBeTruthy();
            });
            it('is a string', () => {
                expect(prop.type()).toBeString();
            });
            it('defaults as null', () => {
                expect(prop.default).toBe(null);
              });
        });
        describe('otherTasks', () => {
            let prop;
            beforeEach(() => {
                prop = LawRelatedTasks.props.otherTasks;   
            });
            it('is required', () => {
                expect(prop.required).toBeTruthy();
            });
            it('is a string', () => {
                expect(prop.type()).toBeString();
            });
            it('defaults as empty string', () => {
                expect(prop.default).toBe('');
              });
        });
    });
    describe('component instance', () => {
        let wrapper;
        beforeEach(()=>{
            wrapper = createTestSubject(LawRelatedTasks, {
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
