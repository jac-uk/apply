// import { createTestSubject } from '../../helpers';
// import Navigation from '@/components/Page/Navigation.vue';

// const navPages = [
//   { page: 'Test', name: 'name-of-current-route' },
//   { page: 'Test2', name: 'nav-test-name2' },
// ];

// describe('components/Page/Navigation', () => {
//   describe('props', () => {
//     let prop;
//     describe('items', () => {
//       beforeEach(() => {
//         prop = Navigation.props.items;
//       });

//       it('is required', () => {
//         expect(prop.required).toBe(true);
//       });

//       it('should be array', () => {
//         expect(prop.type()).toBeTypeOf('array);
//       });
//     });

//     describe('label', () => {
//       beforeEach(() => {
//         prop = Navigation.props.label;
//       });

//       it('is optional', () => {
//         expect(prop.required).toBeFalsy();
//       });

//       it('has default value', () => {
//         expect(prop.default).toBe('navigation');
//       });

//       it('should be string', () => {
//         expect(prop.type()).toBeTypeOf('string');
//       });
//     });
//   });

//   describe('component instance', () => {
//     let wrapper;
//     beforeEach(() => {
//       wrapper = createTestSubject(Navigation, {
//         propsData: {
//           items: navPages,
//         },
//         stubs: ['RouterLink'],
//       });
//     });

//     it('renders the component', () => {
//       expect(wrapper.exists()).toBe(true);
//     });
//     describe('template', () => {
//       it('renders items that is passed as prop', () => {
//         expect(wrapper.findAll('li').length).toBe(2);
//       });

//       it('does not render if items array is empty', async () => {
//         await wrapper.setProps({ items: [] });
//         expect(wrapper.findAll('li').length).toBe(0);
//       });

//       it('sets aria-label with label prop', async () => {
//         await wrapper.setProps({ label: 'MyTestLabel' });
//         expect(wrapper.find('nav').attributes('aria-label')).toBe('Side navigation');
//       });

//       describe('aria-current attribute', () => {
//         it('is set for a link which is currently active', () => {
//           const links = wrapper.findAll('.nav-link');
//           expect(links.at(0).attributes()).toHaveProperty('aria-current');
//           expect(links.at(1).attributes()).not.toHaveProperty('aria-current');
//         });
//       });
//     });
//   });
// });

it('empty suite', () => {

});
