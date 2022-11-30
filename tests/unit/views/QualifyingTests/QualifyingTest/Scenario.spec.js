import Scenario from '@/views/QualifyingTests/QualifyingTest/Scenario.vue';
import { createTestSubject } from '../../../helpers';

xdescribe('views/QualifyingTests/QualifyingTest/Scenario', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper = createTestSubject(Scenario, {
      mocks: {},
      stubs: ['RouterView'],
    });
  });
  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
