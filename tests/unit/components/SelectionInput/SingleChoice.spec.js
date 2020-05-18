import { createTestSubject } from '../../helpers';
import SingleChoice from '@/components/SelectionInput/SingleChoice';
describe('component/SingleChoice', () => {
    describe('props', () => {
        describe('id', () => {
            let prop;
            beforeEach(() => {
                prop = SingleChoice.props.id;
            });
            it('is required', () => {
                expect(prop.required).toBeTruthy();
            });
            it('is a string', () => {
                expect(prop.type()).toBeString();
            });
        });
        describe('answers', () => {
            let prop;
            beforeEach(() => {
                prop = SingleChoice.props.answers;
            });
            it('should be required', () => {
                expect(prop.required).toBeTruthy();
            });
            it('should be array', () => {
                expect(prop.type()).toBeArray();    
            });
        });
        describe('value', () => {
            let prop;
            beforeEach(() => {
                prop = SingleChoice.props.value;
            });
            it('should be string', () => {
                expect(prop.type()).toBeString();    
            });
            it('defaults to null', () => {
                expect(prop.default).toBeNull();    
            });
        });
    });
        
    describe('component instance', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = createTestSubject(SingleChoice, {
                propsData: {
                    id: 'my_unique_key',
                    answers: [],
                },
                stubs: [],
            });
        });
        it('renders', () => {
            expect(wrapper.exists()).toBe(true);
        });
    describe('computed', () => {
        describe('selected', () => {
        beforeEach(() => {
            wrapper.vm.set('testError');
        });
        it('get', () => {
            
        });
        it('set', () => {
            const $root = { 
                $emit: jest.fn(),
            };
            const wrapper = createTestSubject(SingleChoice, {
                propsData: {},
                stubs: [],
            });
            wrapper.vm.$root = $root;
            wrapper.vm.$set();
            expect($root.$emit).toHaveBeenCalled();
        });    
    });
});
});
});
