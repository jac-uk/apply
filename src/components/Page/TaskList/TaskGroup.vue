<template>
  <li
    v-if="hasContent"
    class="taskgroup"
  >
    <h2 class="govuk-heading-m">
      {{ title }}
    </h2>
    <ul class="govuk-list govuk-!-margin-bottom-9">
      <slot />
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hasContent: false,
    };
  },
  beforeUpdate() {
    this.hasContent = this.checkForSlotContent();
  },
  created() {
    this.hasContent = this.checkForSlotContent();
  },
  methods: {
    checkForSlotContent() {
      const checkForContent = (hasContent, node) => {
        return hasContent || node.tag || (node.text && node.text.trim());
      };
      return this.$slots.default && this.$slots.default.reduce(checkForContent, false);
    },
  },
  // watch: {
  //   '$slots.default'() {
  //     console.log('slots', this.$slots.default);
  //   },
  // },
  // computed: {
  //   hasContent() {
  //     // console.log('has content', this.$slots.default && this.$slots.default.length);
  //     const checkForContent = (hasContent, node) => {
  //       return hasContent || node.tag || (node.text && node.text.trim());
  //     };
  //     console.log('has content', this.$slots.default && this.$slots.default.reduce(checkForContent, false));

  //     return this.$slots.default && this.$slots.default[0];
  //   },
  // },
};
</script>

<style>

.taskgroup > ul > li:first-child {
  border-top: 1px solid #b1b4b6
}

</style>
