import Vacancies from '@/views/Vacancies';
import { createTestSubject } from '../helpers';

jest.mock('vuex', () => {
    return {
        mapGetters: jest.fn(),
    };
});

xdescribe('views/Vacancies', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(Vacancies, {
            stubs: ['RouterView'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
