import PersonalDetails from '@/views/PersonalDetails';
import { createTestSubject } from '../helpers';

describe('views/Vacancy', () => {  
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
}); 
