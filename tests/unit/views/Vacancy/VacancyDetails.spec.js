// *error-four* logic needs to be added to helper
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
