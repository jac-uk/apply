// @FIXME@ *error-four* 
// Quite a different test base, couldnt manage to successfully integrate helpers
// couldnt tell how to add necessary logic to either 
// this file or ../helpers.js

import VacancyDetails from '@/views/Vacancy/VacancyDetails';
import { createTestSubject } from '../../helpers';

xdescribe('views/VacancyDetails', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(VacancyDetails, {
            mocks: {},
            stubs: [],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
