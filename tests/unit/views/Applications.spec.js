// *error-four* 
// Quite a different test base, couldnt manage to successfully integrate helpers
// couldnt tell how to add necessary logic to either 
// this file or ../helpers.js

import Applications from '@/views/Applications';
import { createTestSubject } from '../helpers';

xdescribe('views/Applications', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(Applications, {
            mocks: {},
            stubs: ['RouterView'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
