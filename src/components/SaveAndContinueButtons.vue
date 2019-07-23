<template>
  <div class="form-actions">
    <button
      class="btn btn-outline-secondary mr-2"
      :disabled="isSaving"
      type="submit"
    >
      Save
    </button>
    <button
      class="btn btn-primary mr-2"
      type="button"
      :disabled="isSaving"
      @click.prevent="$emit('saveAndContinue')"
    >
      Save and continue
    </button>
    <span
      v-if="isSaving"
      class="spinner-border spinner-border-sm text-secondary"
    />
  </div>
</template>

<script>
export default {
  props: {
    isSaving: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
  button[disabled] {
    cursor: progress;
  }
</style>
