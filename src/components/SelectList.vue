<template>
  <div>
    <div
      v-for="(option, index) in inputOptions"
      :key="option.value"
      :class="divClass"
    >
      <!--
        Dynamic `type` attributes don't work in IE11, so here we conditionally show/hide a radio or checkbox
        depending on the value of the `type` computed property.

        Related to: https://github.com/vuejs/vue/issues/8379
      -->
      <input
        v-if="type === 'radio'"
        :id="id + '_' + index"
        v-model="inputValue"
        type="radio"
        class="custom-control-input"
        :value="option.value"
      >
      <input
        v-if="type === 'checkbox'"
        :id="id + '_' + index"
        v-model="inputValue"
        type="checkbox"
        class="custom-control-input"
        :value="option.value"
      >

      <label
        class="custom-control-label"
        :for="id + '_' + index"
      >
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectList',
  props: {
    id: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      validator: (value) => (value instanceof Array || typeof value === 'string' || value === null || value === undefined),
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    type() {
      return this.multiple ? 'checkbox' : 'radio';
    },
    divClass() {
      return [
        'custom-control',
        'custom-' + this.type,
      ];
    },
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    inputOptions() {
      return this.options.map(option => {
        if (typeof option === 'string') {
          return {
            value: option,
            label: option,
          };
        }
        return option;
      });
    },
    multiAndValue() {
      return [this.multiple, this.value];
    },
  },
  watch: {
    multiAndValue() {
      this.makeValueAnArrayIfMultiple();
    },
  },
  created() {
    this.makeValueAnArrayIfMultiple();
  },
  methods: {
    makeValueAnArrayIfMultiple() {
      if (this.multiple && !(this.value instanceof Array)) {
        this.inputValue = [];
      }
    },
  },
};
</script>
