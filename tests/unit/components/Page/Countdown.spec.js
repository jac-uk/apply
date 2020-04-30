import { shallowMount } from '@vue/test-utils';
import Countdown from '@/components/Page/Countdown';

describe('page/Countdown', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Countdown, {
      props: {
        closeTime: Date.now(),
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('template', () => {

  describe('when date is in future', () => {
    it('display the status in the <div> element', () => {
      wrapper.setProps({ closeTime: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10) });
      expect(wrapper.vm.$data.status).toBe('closed');
    });
  });
  describe('when date is in the past', () => {

    it('display the status in the <div> element', () => {
      wrapper.setProps({ closeTime: new Date(Date.now() - 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10) });
      expect(wrapper.vm.$data.status).toBe('closed');
    });
    xit('disables button', () => {
      wrapper.setProps({ closeTime: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10) });
    });
  });
});
});
