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

          <div
            v-if="urlProvided"
            class="modal__message govuk-body-l"
          >
            <a
              :href="`${url}`"
              target="_blank"
            >{{ url }}
            </a>
          </div>
          <button
            type="button"
            class="govuk-button govuk-button--success info-btn--modal--success"
            @click="closeModal"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Page/Modal.vue';

export default {
  name: 'InfoModal',
  extends: Modal,
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  data(){
    return {
      modalOpen: false,
    };
  },
  computed: {
    urlProvided() {
      return this.url.length > 0;
    },
  },
  methods: {
    openModal() {
      this.modalOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.modalOpen = false;
      document.body.style.overflow = '';
    },
  },
};
</script>
