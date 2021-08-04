import Countdown from '@/components/QualifyingTest/Countdown.vue';
import { createTestSubject } from '../../helpers';

describe('src/components/QualifyingTest/Countdown', () => {  
  let wrapper;

  beforeEach(() => {
    wrapper = createTestSubject(Countdown, {
      mocks: {},
      stubs: [],
      propsData: {
        startTime: new Date('Jan 01 2020 09:00:00 GMT+0000'),
        endTime: new Date('Jan 01 2020 21:00:00 GMT+0000'),
      },
    });
  });
  
  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  
}); 
