<template>
  <div>
    <div :class="divClass" v-for="(option, index) in inputOptions" :key="option.value">
      <!--
        Dynamic `type` attributes don't work in IE11, so here we conditionally show/hide a radio or checkbox
        depending on the value of the `type` computed property.

        Related to: https://github.com/vuejs/vue/issues/8379
      -->
      <input v-if="type === 'radio'" type="radio" class="custom-control-input" :id="id + '_' + index" :value="option.value" v-model="inputValue">
      <input v-if="type === 'checkbox'" type="checkbox" class="custom-control-input" :id="id + '_' + index" :value="option.value" v-model="inputValue">

      <label class="custom-control-label" :for="id + '_' + index">
        {{option.label}}
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
        required: true,
      },
    },
    data() {
      return {};
    },
    methods: {
      makeValueAnArrayIfMultiple() {
        if (this.multiple && !(this.value instanceof Array)) {
          this.inputValue = [];
        }
      }
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
        }
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
    }
  }
</script>
