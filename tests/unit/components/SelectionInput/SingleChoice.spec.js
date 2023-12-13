// import { createTestSubject } from '../../helpers';
// import SingleChoice from '@/components/SelectionInput/SingleChoice.vue';

// describe('components/SelectionInput/SingleChoice', () => {

//     describe('props', () => {

//         describe('id', () => {
//             let prop;
//             beforeEach(() => {
//                 prop = SingleChoice.props.id;
//             });
//             it('is required', () => {
//                 expect(prop.required).toBeTruthy();
//             });
//             it('is a string', () => {
//                 expect(prop.type()).toBeTypeOf('string');
//             });
//         });

//         describe('answers', () => {
//             let prop;
//             beforeEach(() => {
//                 prop = SingleChoice.props.answers;
//             });
//             it('should be required', () => {
//                 expect(prop.required).toBeTruthy();
//             });
//             it('should be array', () => {
//                 expect(prop.type()).toBeTypeOf('array);
//             });
//         });

//         describe('value', () => {
//             let prop;
//             beforeEach(() => {
//                 prop = SingleChoice.props.value;
//             });
//             it('should be string', () => {
//                 expect(prop.type()).toBeTypeOf('string');
//             });
//             it('defaults to null', () => {
//                 expect(prop.default).toBeNull();
//             });
//         });

//     });

//     describe('component instance', () => {
//         let wrapper;
//             const mockProps = {
//                 id: 'mockId',
//                 label: 'mock label',
//                 answers: ['selectedVal','secondVal','thirdVal'],
//                 value: 'selectedVal',
//             };

//         beforeEach(() => {
//             wrapper = createTestSubject(SingleChoice, {
//                 mocks: {
//                     // $emit: $emit,
//                 },
//                 stubs: [],
//                 propsData: mockProps,
//             });
//         });

//         it('renders the component', () => {
//             expect(wrapper.exists()).toBe(true);
//         });

//         describe('computed', () => {
//             describe('selected', () => {
//                 it('returns value (get)', () => {
//                     expect(wrapper.vm.selected).toBe('selectedVal');
//                 });
//                 it('emits value (set) on change', () => {
//                     wrapper.setData({ selected: 'secondVal' });
//                     expect(wrapper.emitted().input[0][0]).toBe('secondVal');
//                 });
//             });
//         });
//     });
// });

it('empty suite', () => {

});
