<template>
  <div>
    Panel conflicts view code goes here
  </div>
</template>

<script>
export default {
  name: 'CandidateFormViewPanelConflicts',
  props: {
    application: {
      type: Object,
      required: false,
      default: () => {},
    },
    localData: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
};
</script>
