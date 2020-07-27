// @FIXME@ *form/queryselector* this suite somehow interacts with the Form 
//  component and errors due to the queryselector

import Review from '@/views/Apply/FinalCheck/Review';
import { createTestSubject } from '../../../helpers';

xdescribe('views/Review', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(Review,{
            propsData: [],
            stubs: ['RouterLink'],
        });
    });
    describe('template', () => {
        it('renders', () => {
            expect(wrapper.exists()).toBe(true);
        });
    });
});

