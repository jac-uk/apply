<template>
  <div class="moj-search">
    <form 
      autocomplete="off"
    >
      <div class="govuk-form-group">
        <input 
          id="search" 
          v-model="search"
          class="govuk-input moj-search__input " 
          name="search" 
          type="search" 
          aria-describedby="search-hint"
          :placeholder="placeholder"
        >
      </div>
    </form>
  </div> 
</template>

<script>
export default {
  name: 'Search',
  props: {
    placeholder: {
      type: String,
      default: 'Search candidate names',
    },
  },
  emits: ['search'],
  data() {
    return {
      search: '',
    };
  },
  watch: {
    search() {
      this.startSearch();
    },
  },
  methods: {
    startSearch() {
      this.$emit('search', this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
  .moj-search {
    margin-bottom: 30px;
  }
</style>
