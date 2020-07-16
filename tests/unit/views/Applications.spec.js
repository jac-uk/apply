import Applications from '@/views/Applications';
import { createTestSubject } from '../helpers';

jest.mock('vuex', () => {
  return {
    mapState: jest.fn(),
  };
});

describe('views/Applications', () => {  
    let wrapper;

    beforeEach(()=>{
        wrapper = createTestSubject(Applications, {
            stubs: ['RouterView', 'RouterLink'],
        });
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
