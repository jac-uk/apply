import StatementOfEligibility from '@/views/Apply/Assessments/StatementOfEligibility';
import { createTestSubject } from '../../../helpers';

describe('views/Assessments/StatementOfEligibility', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(StatementOfEligibility, {
            mocks: {},
            stubs: [],
            propsData: {},
        });
    });
    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });
});

