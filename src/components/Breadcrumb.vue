<template>
  <div class="breadcrumb govuk-breadcrumbs">
    <ol class="govuk-breadcrumbs__list">
        <li class="govuk-breadcrumbs__list-item">
            <span><router-link to="/" class="govuk-breadcrumbs__link">Home</router-link></span>
        </li>
    <li class="govuk-breadcrumbs__list-item"
      v-for="item in breadcrumbs"
      :key="item.href"
    >
      <span v-if="item.isLastItem">
        {{ item.title }}
      </span>
      <span v-else>
        <router-link :to="item.href" class="govuk-breadcrumbs__link">{{ item.title }}</router-link>
      </span>
    </li>
    </ol>
  </div>
</template>

<script>
import { capitalize } from '@/filters';

export default {
  name: 'Breadcrumb',
  computed: {
    breadcrumbs: function () {
      const items = [];
      this.$route.matched.forEach((item, index) => {
        const splitPath = item.path.split('/');
        let combinedPath = '';
        let breadcrumbName = '';
        let isLastItem = false;
        splitPath.forEach((itemPath, itemIndex) => {
          if (itemPath.charAt(0) === ':') {
            const paramName = itemPath.replace(':', '');
            splitPath[itemIndex] = this.$route.params[paramName];
          } else {
            breadcrumbName = capitalize(itemPath);
          }
          if (combinedPath ||  splitPath[itemIndex]) {
            combinedPath = `${combinedPath}/${splitPath[itemIndex]}`;
          }
        });
        if (this.$route.path === combinedPath && index === this.$route.matched.length - 1 || index === this.$route.matched.length - 1) {
          isLastItem = true;
        }
        items.push({
          href: combinedPath,
          title: item.meta.title ? item.meta.title : breadcrumbName,
          isLastItem: isLastItem,
        });
      });
      return items;
    },
  },
  methods: {
    capitalize,
  },
};
</script>

<style scoped>
  .breadcrumb {
    margin: 15px 0;
  }
  .govuk-breadcrumbs__link:hover {
    text-decoration-thickness: max(3px, .1875rem, .12em);
  }
</style>
