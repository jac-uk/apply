import VacancyMessage from '@/views/Vacancy/VacancyMessage';
import { createTestSubject } from '../../helpers';

describe('views/VacancyMessage', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(VacancyMessage, {
            mocks: {},
            stubs: ['RouterLink'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
