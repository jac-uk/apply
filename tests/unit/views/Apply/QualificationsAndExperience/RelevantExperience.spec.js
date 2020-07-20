import RelevantExperience from '@/views/Apply/QualificationsAndExperience/RelevantExperience';
import { createTestSubject } from '../../../helpers';

describe('views/Eligibility/RelevantExperience', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(RelevantExperience, {
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
