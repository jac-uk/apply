import RankedChoice from '@/components/SelectionInput/RankedChoice';
import { createTestSubject } from '../../helpers';

describe('views/RankedChoice', () => {  
    let wrapper;  
    beforeEach(()=>{
        wrapper = createTestSubject(RankedChoice, {
            propsData: {
                id: 'unique_id',
                answers: [],
            },
            stubs: ['RouterLink'],
        });
    });
    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });
}); 
