import { createTestSubject } from '../../helpers';

import Form from '@/components/Form/Form';

describe('components/Form/Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(Form, {
      mocks: {
      },
      stubs: [],
    });
  });
  
  xit('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  xdescribe('methods', () => {
      it('validates', () => {
          wrapper.setData({errors:[]})
          expect(wrapper.vm.isValid().toBe(false))
    });
  });
      
});
