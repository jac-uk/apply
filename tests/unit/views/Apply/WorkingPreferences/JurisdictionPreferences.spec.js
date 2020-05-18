// *error-one* this suite extends the 
// Form component and gives warnings 

import JurisdictionPreferences from '@/views/Apply/WorkingPreferences/JurisdictionPreferences';
import { createTestSubject } from '../../../helpers';

xdescribe('views/WorkingPreferences/JurisdictionPreferences', () => {  
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
