import ReasonableLengthOfService from '@/views/Apply/QualificationsAndExperience/ReasonableLengthOfService';
import { createTestSubject } from '../../../helpers';

describe('views/Eligibility/ReasonableLengthOfService', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(ReasonableLengthOfService, {
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
