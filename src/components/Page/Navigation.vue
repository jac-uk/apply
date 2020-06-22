<template>
  <nav
    class="moj-side-navigation"
    aria-label="Side navigation"
  >
    <ul class="moj-side-navigation__list">
      <li class="moj-side-navigation__item">
        v-for="navItem in items"
        :key="navItem.name"
        >
        <RouterLink 
          class="nav-link"
          :to="{name: navItem.name}"
          :aria-current="isActive(navItem.name) ? 'moj-side-navigation__item--active' : false"
        >
          {{ navItem.page }} 
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      required: true,
      type: Array,
    },
    label: {
      required: false,
      default: 'navigation',
      type: String,
    },
  },
  methods: {
    isActive(name) {
      return name === this.$route.name;
    },
  },
};
</script>
