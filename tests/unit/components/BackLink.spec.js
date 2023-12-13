// import { createTestSubject } from '../helpers';
// import { mount } from '@vue/test-utils';
// import BackLink from '@/components/BackLink.vue';
// import { vi } from 'vitest';

// describe('components/BackLink', () => {
//   let wrapper;
//   let link;
//   const mockRouter = {
//     back: vi.fn(),
//   };

//   // beforeEach(() => {
//   //   wrapper = createTestSubject(BackLink, {
//   //     mocks: {
//   //       $router: mockRouter,
//   //     },
//   //     stubs: [],
//   //   });
//   // });
//   beforeEach(() => {
//     window.scrollTo = () => {};
//     wrapper = createTestSubject(BackLink, {
//       shallow: true,
//       props: {},
//       stubs: ['RouterView'],
//     });
//   });

//   it('renders the component', () => {
//     expect(wrapper.exists()).toBe(true);
//   });

//   describe('link', () => {

//     beforeEach(() => {
//       link = wrapper.find('a');
//     });

//     it('calls $router.back() on click', () => {
//       link.trigger('click');
//       expect(mockRouter.back).toHaveBeenCalled();
//     });

//     it('text is \'back\'', ()  => {
//       expect(link.text()).toBe('Back');
//     });

//     it('has class of \'govuk-back-link\'', () => {
//       expect(link.is('.govuk-back-link')).toBe(true);
//     });

//   });

// });

it('empty suite', () => {

});
