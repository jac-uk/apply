import { createTestSubject } from '../../helpers';
import Modal from '@/components/Page/Modal';

describe('components/Form/Modal', () => {
  describe('props', () => {
    describe('cancelable', () => {
      let prop;
        beforeEach(() => {
          prop = Modal.props.cancelable;
        });
        it('is Boolean', () => {
            expect(prop.type()).toBeBoolean();
        });
        it('is true by default', () => {
            expect(prop.default).toBeTrue();
        });
      });
    describe('buttonText', () => {
      let prop;
      beforeEach(() => {
        prop = Modal.props.buttonText;
      });
      it('default is \'Accept\'', () => {
        expect(prop.default).toBe('Accept');
      });
      it('is a string', () => {
        expect(prop.type()).toBeString();
      });
    });
    describe('message', () => {
      let prop;
      beforeEach(() => {
        prop = Modal.props.message;
      });
      it('default is \'Accept\'', () => {
        expect(prop.default).toBe('Please Confirm');
      });
      it('is a string', () => {
          expect(prop.type()).toBeString();
      });
    });
  });
  describe('component instance', () => {
    let wrapper;
    beforeEach(()=>{
      wrapper = createTestSubject(Modal, {
        propsData: {
          buttonText: 'Start Now',
          cancelable: true,
          message: 'Are you sure you want to start your online test? The timer will begin if you do:',
        },
        stubs: [],
      });
    });
    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true);
    });
    it('close modal emit', () => {
      const emitted = wrapper.emitted();
      expect(emitted.closed).toBeFalsy;
      wrapper.vm.closeModal();
      expect(emitted.closed).toBeTruthy;
    });
    it('confirm modal emit', () => {
      const emitted = wrapper.emitted();
      expect(emitted.confirmed).toBeFalsy;
      wrapper.vm.confirmModal();
      expect(emitted.confirmed).toBeTruthy;
    });
  });
});
