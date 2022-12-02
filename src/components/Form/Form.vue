<template>
  <div />
</template>

<script>
export default {
  name: 'FormComponent',
  data() {
    return {
      errorObject: {},
      errors: [],
    };
  },
  mounted: function () {
    this.$root.$on('handle-error', this.handleError);
    // Disable HTML5 validation
    if (this.$refs.formRef) {
      this.$refs.formRef.setAttribute('novalidate', true);
    }
  },
  beforeDestroy: function() {
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
    },
    isValid() {
      return this.errors.length === 0;
    },
  },
};
</script>
