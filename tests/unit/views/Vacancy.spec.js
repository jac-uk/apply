import Vacancy from '@/views/Vacancy';
import { createTestSubject } from '../helpers';

describe('views/Vacancy', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(Vacancy, {
            mocks: {},
            stubs: ['RouterView'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
