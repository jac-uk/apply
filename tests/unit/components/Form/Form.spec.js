import { createTestSubject } from '../../helpers';

import Form from '@/components/Form/Form';
//@FIXME@ Testing this suite requires the ref 'formRef' to be mocked
xdescribe('components/Form/Form', () => {
    describe('component instance', () => {  
        let wrapper;
        beforeEach(() => {
        wrapper = createTestSubject(Form, {
            mocks: {},
            stubs: [],
            propsData: {},
            });
        });

        it('renders the component', () => {
            expect(wrapper.exists()).toBe(true);
        });
    });
});
