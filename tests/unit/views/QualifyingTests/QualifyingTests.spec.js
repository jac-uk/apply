import QualifyingTests from '@/views/QualifyingTests/QualifyingTests.vue';
import { createTestSubject } from '../helpers';

// jest.mock('vuex', () => {
//   return {
//     mapState: jest.fn(),
//   };
// });

describe('views/Applications', () => {  
    let wrapper;

    beforeEach(()=>{
        wrapper = createTestSubject(QualifyingTests, {
            // stubs: ['RouterView', 'RouterLink'],
        });
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
