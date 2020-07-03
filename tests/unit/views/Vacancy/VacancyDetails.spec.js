import VacancyDetails from '@/views/Vacancy/VacancyDetails';
import { createTestSubject } from '../../helpers';

describe('views/VacancyDetails', () => {  
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
