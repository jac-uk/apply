import SignIn from '@/views/SignIn';
import { createTestSubject } from '../helpers';

describe('views/SignIn', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(SignIn, {
            stubs: ['RouterLink'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
    describe('computed', () => {
        it('exerciseID returns mockID', () => {
            wrapper.vm.$store.state.vacancy.record = {
                id: 'mockID',
            };
            expect(wrapper.vm.exerciseId).toBe('mockID');
        });
    });
}); 
