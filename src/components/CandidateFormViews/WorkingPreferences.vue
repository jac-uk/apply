<template>
  <div>
    Working preferences view code goes here
  </div>
</template>

<script>
export default {
  name: 'CandidateFormViewWorkingPreferences',
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
