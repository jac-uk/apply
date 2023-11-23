<template>
  <div>
    Character checks view code goes here
  </div>
</template>

<script>
export default {
  name: 'CandidateFormViewCharacterChecks',
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
