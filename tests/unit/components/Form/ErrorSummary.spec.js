import { createTestSubject } from '../../helpers';
import ErrorSummary from '@/components/Form/ErrorSummary';

xdescribe('components/ErrorSummary', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = createTestSubject(ErrorSummary, {
            stubs: ['RouterLink'],
          });
        });
      
        describe('template', () => {
          it('renders', () => {
            expect(wrapper.exists()).toBe(true);
          });
    });
    describe('props', () => {
    });
});
