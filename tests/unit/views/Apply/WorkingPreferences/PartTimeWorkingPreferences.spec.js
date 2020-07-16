import PartTimeWorkingPreferences from '@/views/Apply/WorkingPreferences/PartTimeWorkingPreferences';
import { createTestSubject } from '../../../helpers';

describe('views/WorkingPreferences/PartTimeWorkingPreferences', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(PartTimeWorkingPreferences, {
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
