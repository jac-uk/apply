<template>
  <div>
    <div class="custom-control custom-radio custom-control-inline">
      <input class="custom-control-input" type="radio" :id="yesInputId" :value="true" v-model="inputValue">
      <label class="custom-control-label" :for="yesInputId">Yes</label>
    </div>
    <div class="custom-control custom-radio custom-control-inline">
      <input class="custom-control-input" type="radio" :id="noInputId" :value="false" v-model="inputValue">
      <label class="custom-control-label" :for="noInputId">No</label>
    </div>
  </div>
</template>

<script>
  let uid = 0;

  export default {
    name: 'BooleanInput',
    props: {
      value: {
        required: true,
      },
    },
    data() {
      return {
        yesInputId: `boolean_${uid}_yes`,
        noInputId: `boolean_${uid}_no`,
      };
    },
    computed: {
      inputValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      },
    },
    created() {
      uid++;
    }
  }
</script>
