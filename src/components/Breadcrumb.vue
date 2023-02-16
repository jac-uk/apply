<template>
  <div class="breadcrumb govuk-breadcrumbs">
    <ol class="govuk-breadcrumbs__list">
      <li class="govuk-breadcrumbs__list-item">
        <span><router-link
          to="/"
          class="govuk-breadcrumbs__link"
        >Home</router-link></span>
      </li>
      <li
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="govuk-breadcrumbs__list-item"
      >
        <span v-if="item.isLastItem">
          {{ item.title }}
        </span>
        <span v-else>
          <router-link
            :to="item.href"
            class="govuk-breadcrumbs__link"
          >{{ item.title }}</router-link>
        </span>
      </li>
    </ol>
  </div>
</template>

<script>
import { capitalize } from '@/filters';
import { updateLangToTextNode } from '@/helpers/language';
import { LANGUAGES } from '@/helpers/constants';

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
        // set breadcrumbRoute within router.js to override the matched route
        if (item.meta.breadcrumbRoute) {
          combinedPath = this.$router.resolve({
            name: item.meta.breadcrumbRoute,
            params: this.$route.params,
          }).href;
        }

        items.push({
          href: combinedPath,
          title: item.meta.title ? item.meta.title : breadcrumbName,
          isLastItem: isLastItem,
        });

        const hash = this.$route.hash;
        if (combinedPath === '/vacancies' && hash) {
          items.push({
            href: `${combinedPath}#${hash}`,
            title: this.getVacanciesTitle(hash),
            isLastItem: true,
          });
        }
      });
      return items;
    },
  },
  updated: async function() {
    setTimeout(() => {
      // switch back to English if current route does not support multilanguage
      const lang = this.$route.meta.isMultilanguage ? this.language : LANGUAGES.ENGLISH;
      updateLangToTextNode(document.querySelector('#main-content'), lang);
    }, 0);
    
  },
  methods: {
    capitalize,
    getVacanciesTitle(hash) {
      let title = '';
      switch (hash) {
      case '#future':
        title = 'Future applications';
        break;
      case '#closed':
        title = 'Closed for applications';
        break;
      default:
        title = 'Open for applications';
      }
      return title;
    },
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
