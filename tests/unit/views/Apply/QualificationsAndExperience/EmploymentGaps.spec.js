import { createTestSubject } from '../../../helpers';
import EmploymentGaps from '@/views/Apply/QualificationsAndExperience/EmploymentGaps';

describe('@/views/Apply/QualificationsAndExperience/EmploymentGaps', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(EmploymentGaps, {
            mocks: {},
            stubs: [],
            propsData: {},
        });
    });
    
    describe('template', () => {
        it('renders', () => {
            expect(wrapper.exists()).toBe(true);
        });
    });
});
