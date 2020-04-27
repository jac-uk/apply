import { shallowMount } from '@vue/test-utils';
import BackLink from '@/components/BackLink';

describe('components/BackLink', () => {
  let wrapper;
  let link;
  const mockRouter = {
    back: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(BackLink, {
      mocks: {
        $router: mockRouter,
      },
    });
  });
  
  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  
  describe('link', () => {

    beforeEach(() => {
      link = wrapper.find('a');
    });
    
    it('calls $router.back() on click', () => {
      link.trigger('click');
      expect(mockRouter.back).toHaveBeenCalled();
    });
    
    it('text is \'back\'', ()  => {
      expect(link.text()).toBe('Back');
    });
    
    it('has class of \'govuk-back-link\'', () => {
      expect(link.is('.govuk-back-link')).toBe(true);
    });

  });

});
