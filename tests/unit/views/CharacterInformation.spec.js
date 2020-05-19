import CharacterInformation from '@/views/CharacterInformation';
import { createTestSubject } from '../helpers';

describe('views/CharacterInformation', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(CharacterInformation, {
            mocks: {},
            stubs: ['RouterLink'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
    describe('created hook', () => {
        it('calls $store.dispatch(\'applications\'', () => {
            expect(wrapper.vm.$store.dispatch).toHaveBeenCalled();
        });
    });
}); 
