<template>
  <div 
    v-show="modalOpen"
    class="modal-mask"
  >
    <div
      class="modal"
    >
      <div class="container">
        <div class="modal__title govuk-!-padding-2 govuk-heading-m">
          {{ title }}
        </div>
        <div class="modal__content govuk-!-padding-4">
          <p class="modal__message govuk-body-l">
            {{ message }}
          </p>

          <span
            v-show="cancelable"
          >
            <button
              class="govuk-button govuk-button--secondary govuk-!-margin-right-3 deny info-btn--modal--cancel"
              @click="closeModal"
            >
              Cancel
            </button>
          </span>
          <button
            class="govuk-button govuk-button--success info-btn--modal--success"
            @click="confirmModal"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    cancelable: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: 'Are you sure?',
    },
    buttonText: {
      type: String,
      default: 'Accept',
    },
    message: {
      type: String,
      default: 'Please Confirm',
    },
  },
  data(){
    return {
      modalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
      document.body.style.overflow = 'hidden';
    },          
    closeModal() {
      this.modalOpen = false;
      this.$emit('closed');
      document.body.style.overflow = '';
    },          
    confirmModal() {
      this.modalOpen = false;
      this.$emit('confirmed');
      document.body.style.overflow = '';
    },          
  },
};
</script>

<style lang="scss" scoped>
  @mixin mobile-view {
    @media (max-width: 599px) { @content; }
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 30%;
    transform: translate(-50%, -50%);
    border: solid 2px #b1b4b6;
    background-color: #ffffff;
    @include mobile-view { 
      width: 100%;
      min-height: 100%;
    }
  }

  .modal__title {
    text-align: center;
    vertical-align: middle;
    border: solid 2px #1d70b8;
    background-color: #1d70b8;
    color: white;
  }
  .modal__message {
    vertical-align: middle;
  }
  .deny {
    background-color: #f3f2f1;
  }
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    overflow: hidden;
  }
</style>
