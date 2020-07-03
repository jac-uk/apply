// @FIXME@ error issues with mapGetters, see Applications.spec

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
