<template>
  <ol class="tasklist govuk-list">
    <slot />
  </ol>
</template>

<script>
export default {
  name: 'TaskList',
};
</script>

<style>
.tasklist {
  list-style-type: auto;
}
</style>
