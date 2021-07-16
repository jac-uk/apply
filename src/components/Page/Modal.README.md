example usage:
<template>
  <div>
    <button
      @click="openModal"
    >
      openModal
    </button>

    <Modal
      ref="modalRef"
      button-text="Start Now"
      :cancelable="false"
      :message="'Are you sure you want to start your online test? The timer will begin if you do:'"
      @confirmed="btnConfirmed"
      @closed="btnClosed"
    />
  </div>
</template>
<script>
import Modal from '@/components/Page/Modal';
import { auth } from '@/firebase';

export default {
  name: 'App',
  components: {
    Modal,
  },
  methods: {
    openModal(){
      this.$refs.modalRef.openModal();
    };
  },
}
</script>

#Props
  cancelable:
  A boolean for showing or hiding a secondary button to dismiss the modal, intended to allow using the modal both in circumstances where the user will be forced to progress and times when the modal can be used as a confirmation and the user can revert/cancel the action which triggered the modal. (eg. countdown at 0).
  true by default so cancel button will appear.

  title:
  String for modal title
  'Are you sure?' by default.

  buttonText:
  String for confirmation button text as this changes from 'start test' to 'confirm' in various uses.
  'Accept' by default.

  message:
  String for modal message content text as this changes in each use.
  'Please confirm' by default.

  #data
  modalOpen:
  Boolean flag for toggling modal state, open or closed.

  #methods
  openModal:
    To trigger the modal.
    Component is self contained so the suggested use is as in example at top of page.
    Also adds an overflow block to the document body, which stops scrolling, and shows the modalMask layer which prevents clicking page objects.
  closeModal:
    To close or cancel the modal, removes above blocking elements and styling, emits a 'closed' event which can be listen in parent to trigger behaviour following a modal being dismissed/declined.
    Linked to the _optional_ secondary button togglable with the _cancelable_ prop.
  confirmModal:
    Success event, used for when the confirmaton/accept button is clicked. Emits 'confirmed' event for progressing with postive flow from modal.
    Clears CSS blockers.

    @TODO Various styling updates needed
