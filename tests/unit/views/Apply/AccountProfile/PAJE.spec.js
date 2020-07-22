import PAJE from '@/views/Apply/AccountProfile/PAJE';
import { createTestSubject } from '../../../helpers';

describe('@/views/Apply/AccountProfile/PAJE', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = createTestSubject(PAJE, {
            propsData: {},
            stubs: [],
        });
    });
    describe('template', () => {
        it('renders correctly', () => {
            expect(wrapper.exists()).toBe(true);
        });
        it('has h1 tag', () => {
            expect(wrapper.contains('h1')).toBe(true);
        });
    });
  });
