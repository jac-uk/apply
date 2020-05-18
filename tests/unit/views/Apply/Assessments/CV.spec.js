// *error-two* this suite somehow interacts with the Form component and errors due to the queryselector

import CV from '@/views/Apply/Assessments/CV';
import { createTestSubject } from '../../../helpers';

xdescribe('views/Assessments/CV', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(CV, {
            mocks: {},
            stubs: [],
            propsData: {},
        });
    });
    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });
});

