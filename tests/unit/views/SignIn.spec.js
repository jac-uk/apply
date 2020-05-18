import SignIn from '@/views/SignIn';
import { createTestSubject } from '../helpers';

describe('views/SignIn', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(SignIn, {
            mocks: {},
            stubs: ['RouterLink'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
