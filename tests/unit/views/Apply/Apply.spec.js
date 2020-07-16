import Apply from '@/views/Apply/Apply';
import { createTestSubject } from '../../helpers';

describe('views/Eligibility/Apply', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(Apply, {
            mocks: {},
            stubs: ['RouterView'],
            propsData: {},
        });
    });
    
    describe('template', () => {
        it('renders', () => {
            expect(wrapper.exists()).toBe(true);
        });
    });
});
