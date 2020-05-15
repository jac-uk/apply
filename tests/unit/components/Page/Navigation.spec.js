import { createTestSubject } from '../../helpers';
import Navigation from '@/components/Page/Navigation';

const navPages = [
  { page: 'Test', name: 'nav-test-name1' },
  { page: 'Test2', name: 'nav-test-name2' },
];

describe('components/Page/Navigation', () => {
  describe('props', () => {
    let prop;
    describe('items', () => {
      beforeEach(() => {
        prop = Navigation.props.items;
      });

      it('is required', () => {
        expect(prop.required).toBe(true);
      });

      it('should be array', () => {
        expect(prop.type()).toBeArray();
      });
    });

    describe('label', () => {
      beforeEach(() => {
        prop = Navigation.props.label;
      });

      it('is optional', () => {
        expect(prop.required).toBeFalsy();
      });

      it('has default value', () => {
        expect(prop.default).toBe('navigation');
      });

      it('should be string', () => {
        expect(prop.type()).toBeString();
      });
    });
  });
  describe('component instance', () => {
    let wrapper;
    beforeEach(() => {
     wrapper = createTestSubject(Navigation, {
       propsData: {
        items: navPages,
       },
       stubs: ['RouterLink'],
      });
    });
    it('renders the component', () => {
     expect(wrapper.exists()).toBe(true);
    });
  describe('template', () => {
    it('renders items that is passed as prop', () => {
      expect(wrapper.findAll('li').length).toBe(2);
    });

    it('does not render if items array is empty', () => {
      wrapper.setProps({ items: [] });
      expect(wrapper.findAll('li').length).toBe(0);
    });

    it('sets aria-label with label prop', () => {
      wrapper.setProps({ label: 'MyTestLabel' });
      expect(wrapper.find('nav').attributes('aria-label')).toBe('MyTestLabel');
    });

    describe('aria-current attribute', () => {
      xit('is set for a link which is currently active', () => {
        let links = wrapper.findAll('.nav-link');
        expect(links.at(0).attributes()).toHaveProperty('aria-current');
        expect(links.at(1).attributes()).not.toHaveProperty('aria-current');
      });
    });
  });
  });
});
