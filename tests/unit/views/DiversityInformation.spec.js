import DiversityInformation from '@/views/DiversityInformation';
import { createTestSubject } from '../helpers';

describe('views/DiversityInformation', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(DiversityInformation, {
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
