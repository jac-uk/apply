<template>
  <div>
    <Review :is-page="false" />
  </div>
</template>

<script>
import Review from '@/views/Apply/Forms/Parts/CharacterChecks/Review.vue';

export default {
  name: 'CandidateFormViewCharacterChecks',
  components: {
    Review,
  },
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
