// @FIXME@ *form/queryselector* this suite somehow interacts with the Form
//  component and errors due to the queryselector

import WelshPosts from '@/views/Apply/WorkingPreferences/WelshPosts.vue';
import { createTestSubject } from '../../../helpers';

describe.skip('views/WorkingPreferences/WelshPosts', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(WelshPosts, {
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
