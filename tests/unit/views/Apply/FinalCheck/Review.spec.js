// @FIXME@ *error-two* more mocks need to be added in the helper file (?)

import Review from '@/views/Apply/FinalCheck/Review';
import { createTestSubject } from '../../../helpers';

xdescribe('views/Review', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(Review,{
            propsData: [],
            stubs:['RouterLink'],
        });
    });
    describe('template', () => {
        it('renders', () => {
            expect(wrapper.exists()).toBe(true);
        });
    });
});

