<template>
  <div class="back-to-top-wrapper print-none">
    <button
      class="btn-back-to-top"
      @click="backToTop"
    >
      <svg
        class="svg-icon th-fill-current"
        width="24"
        height="24"
        aria-hidden="true"
        role="img"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  methods: {
    backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style scoped>
.back-to-top-wrapper {
  display: flex;
  justify-content: center;
  border-top: 5px solid #5c2b59;
  position: relative;
}
.btn-back-to-top {
  position: absolute;
  bottom: 100%;
  height: 25px;
  width: 40px;
  color: white;
  background-color: #5c2b59;
  border: none;
  border-radius: 2px 2px 0 0;
}
.btn-back-to-top:hover {
  cursor: pointer;
  background-color: #262727;
}
</style>
