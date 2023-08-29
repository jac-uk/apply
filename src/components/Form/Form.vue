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
    };
  },
  computed: {
    language() {
      return this.$store.state.application.language;
    },
  },
  mounted: function () {
    this.$root.$on('handle-error', this.handleError);
    // Disable HTML5 validation
    if (this.$refs.formRef) {
      this.$refs.formRef.setAttribute('novalidate', true);
    }
  },
  beforeUnmount: function() {
    this.$root.$off('handle-error', this.handleError);
  },
  methods: {
    async validate() {
      this.$root.$emit('validate');
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
        this.scrollToErrorSummary();
        setTimeout(() => {
          updateLangToTextNode(document.querySelector('#main-content'), this.language);
        }, 0);
      }
    },
    scrollToErrorSummary(){
      //This is just scrolling to top of page
      this.$root.$el.scrollIntoView();
    },
    isValid() {
      return this.errors.length === 0;
    },
  },
};
</script>
