<template>
  <ol class="nav nav-pills flex-column">
    <li
      v-for="page in applyPages"
      :key="page.path"
      class="nav-item"
    >
      <RouterLink
        :to="page.path"
        class="nav-link"
        active-class="active"
        exact
      >
        {{ page.title }}
      </RouterLink>
    </li>
  </ol>
</template>

<script>
export default {
  data() {
    return {
      applyPages: this.$store.getters.applyPages,
    };
  },
};
</script>
