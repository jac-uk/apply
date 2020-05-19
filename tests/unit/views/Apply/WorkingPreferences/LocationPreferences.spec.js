// @FIXME@ *error-one* this suite extends the 
// Form component and gives warnings 

import LocationPreferences from '@/views/Apply/WorkingPreferences/LocationPreferences';
import { createTestSubject } from '../../../helpers';

xdescribe('views/WorkingPreferences/LocationPreferences', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(LocationPreferences, {
            mocks: {},
            stubs: [],
            propsData: {},
        });
    });
    
    describe('template', () => {
        it('renders', () => {
            expect(wrapper.exists()).toBe(true);
        });
    });

});
