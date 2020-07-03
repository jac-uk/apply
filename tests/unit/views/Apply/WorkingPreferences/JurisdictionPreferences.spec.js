import JurisdictionPreferences from '@/views/Apply/WorkingPreferences/JurisdictionPreferences';
import { createTestSubject } from '../../../helpers';

describe('views/WorkingPreferences/JurisdictionPreferences', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(JurisdictionPreferences, {
            mocks: {},
            stubs: ['RouterLink'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
