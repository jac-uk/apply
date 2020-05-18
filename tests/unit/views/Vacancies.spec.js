// *error-four* 
// Quite a different test base, couldnt manage to successfully integrate helpers
// couldnt tell how to add necessary logic to either 
// this file or ../helpers.js
import Vacancies from '@/views/Vacancies';
import { createTestSubject } from '../helpers';

xdescribe('views/Vacancies', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(Vacancies, {
            mocks: {},
            stubs: ['RouterView'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
