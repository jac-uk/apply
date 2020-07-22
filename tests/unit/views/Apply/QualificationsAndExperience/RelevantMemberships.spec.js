// @FIXME@ *form/queryselector* this suite somehow interacts with the Form 
//  component and errors due to the queryselector

import RelevantMemberships from '@/views/Apply/QualificationsAndExperience/RelevantMemberships';
import { createTestSubject } from '../../../helpers';

xdescribe('@/views/Apply/QualificationsAndExperience/RelevantMemberships', () => {
    describe('template', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = createTestSubject(RelevantMemberships, {
                mocks: {},
                stubs: [],
                propsData: {},
            });
        });
        
        it('renders', () => {
            expect(wrapper.exists()).toBe(true);
        });
        
    });
});
