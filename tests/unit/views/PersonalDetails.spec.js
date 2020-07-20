import PersonalDetails from '@/views/PersonalDetails';
import { createTestSubject } from '../helpers';

describe('views/Vacancy', () => {  
    describe('component instance', () => {
        let wrapper;  
        beforeEach(()=>{
            wrapper = createTestSubject(PersonalDetails, {
                mocks: {},
                stubs: ['RouterLink'],
            });
        });
        it('renders the component', () => {
            expect(wrapper.exists()).toBe(true);
        });
        describe('created hook', () => {
            it('calls $store.dispatch(\'applications\'', () => {
                expect(wrapper.vm.$store.dispatch).toHaveBeenCalled();
            });
        });
    }); 
}); 
