import MultipleChoice from '@/components/SelectionInput/MultipleChoice';
import { createTestSubject } from '../../helpers';

describe('views/MultipleChoice', () => {  
    describe('props', () => {
        describe('id', () => {
        let prop;
        beforeEach(() => {
            prop = MultipleChoice.props.id;
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
            prop = MultipleChoice.props.answers;
        });
        it('is required', () => {
            expect(prop.required).toBeTruthy();
        });
        it('is an array', () => {
            expect(prop.type()).toBeArray();
        });
    });
    describe('value', () => {
        let prop;
        beforeEach(() => {
            prop = MultipleChoice.props.value;
        });
        it('is required', () => {
            expect(prop.required).toBeFalsy();
        });
        it('is an array', () => {
            expect(prop.type()).toBeArray();
        });
        it('defaults to empty array', () => {
            expect(prop.default()).toEqual([]);
        });
    });
    });
    describe('mounted component', () => {
        let wrapper;  
        beforeEach(()=>{
            wrapper = createTestSubject(MultipleChoice, {
                propsData: {
                    id: 'unique_id',
                    answers: [],
                },
                stubs: ['RouterLink'],
            });
        });
        it('renders the component', () => {
            expect(wrapper.exists()).toBe(true);
        });
    }); 
});
