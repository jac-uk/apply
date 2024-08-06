<template>
  <div />
</template>

<script>
import { updateLangToTextNode } from '@/helpers/language';

export default {
  name: 'Form',
  data() {
    return {
      errorObject: {},
      errors: [],
      warningObject: null,
    };
  },
  computed: {
    language() {
      return this.$store.state.application.language;
    },
  },
  mounted: function () {
    this.emitter.on('handle-error', this.handleError);
    this.emitter.on('handle-warning', this.handleWarning);
    // Disable HTML5 validation
    if (this.$refs.formRef) {
      this.$refs.formRef.setAttribute('novalidate', true);
    }
  },
  beforeUnmount: function() {
    this.emitter.off('handle-error', this.handleError);
    this.emitter.off('handle-warning', this.handleWarning);
  },
  methods: {
    async validate() {
      this.emitter.emit('validate');
      this.update();
      if (!this.isValid()) {
        // scroll to error summary if there are errors
        this.scrollToErrorSummary();
      }
    },
    handleError(payload) {
      this.errorObject[payload.id] = payload.message;
      this.errors = []; // re-populate errors
      for (const item in this.errorObject) {
        if (this.errorObject[item]) {
          this.errors.push({ id: item, message: this.errorObject[item] });
        }
      }

      if (!this.isValid()) {
        this.update();
      }
    },
    handleWarning(payload) {
      this.warningObject = { id: payload.id, message: payload.message };
      if (payload.message) {
        this.update();
      }
    },
    update() {
      this.$nextTick(() => {
        updateLangToTextNode(document.querySelector('#main-content'), this.language);
      });
    },
    scrollToErrorSummary(){
      //This is just scrolling to top of page
      window.setTimeout(() => {
        this.$el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    },
    isValid() {
      return this.errors.length === 0;
    },
  },
};
</script>
