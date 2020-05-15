import { createTestSubject } from '../helpers';
import LoadingMessage from '@/components/LoadingMessage';

describe('components/LoadingMessage', () => {
  let wrapper;
  describe('when `loadFailed` is equal to `false`', () => {
    let loadFailedValue = false;
    beforeEach(()=>{
      wrapper = createTestSubject(LoadingMessage, {
        propsData: {
          loadFailed: loadFailedValue,
        },
        stubs: [],
      });
    });
    it('shows the "Loading" message', () => {
      expect(wrapper.find({ ref: 'loadingMessage' }).isVisible()).toBe(true);
    });
    it('does not show the "Error" message', () => {
      expect(wrapper.find({ ref: 'errorMessage' }).exists()).toBe(false);
    });
    it('message text is  "Loading..."',() =>{
      expect(wrapper.find('div').text()).toBe('Loading...');
    });
  });

  describe('when `loadFailed` is equal to `true`', () => {
    let loadFailedValue = true;
    beforeEach(()=>{
      wrapper = createTestSubject(LoadingMessage, {
        propsData: {
          loadFailed: loadFailedValue,
        },
        stubs: [],
      });
    });
    it('shows the errorMessage', () => {
      expect(wrapper.find({ ref: 'errorMessage' }).isVisible()).toBe(true);
    });
    it('does not show the "Loading" message', () => {
      expect(wrapper.find({ ref: 'loadingMessage' }).exists()).toBe(false);
    });
    it('error heading text is  "Something went wrong"',() =>{
      expect(wrapper.find('div > h1').text()).toBe('Something went wrong');
    });
    it('error paragraph text is  "Reload the page and try again"',() =>{
      expect(wrapper.find('div > p').text()).toBe('Reload the page and try again');
    });
  });

});
