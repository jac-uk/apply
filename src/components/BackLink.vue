<template>
  <a
    class="govuk-back-link"
    @click="$router.back()"
  >
    {{ title }}
  </a>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Back',
    },
  },
};
</script>
<style scoped>
 .govuk-back-link {
   cursor: pointer;
 }
</style>
