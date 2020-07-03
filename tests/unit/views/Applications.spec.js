import Applications from '@/views/Applications';
import { createTestSubject } from '../helpers';

describe('views/Applications', () => {  
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
