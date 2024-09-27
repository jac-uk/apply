<template>
  <div>
    <div
      v-for="(row, index) in rows"
      :key="index"
      ref="repeatableField"
      class="repeatableField"
    >
      <component
        :is="component"
        :id="`${index}`"
        :row="row"
        :index="index"
        :url="url"
        :show-no-legal="showNoLegal"
        v-bind="componentProps"
      >
        <template #removeButton>
          <button
            v-if="rows.length > 1"
            ref="removeFieldButton"
            type="button"
            class="govuk-button govuk-button--warning float-right"
            @click.prevent="removeRow(index)"
          >
            Remove
          </button>
          <hr
            class="govuk-!-margin-bottom-4"
            style="clear: both;"
          >
        </template>
      </component>
    </div>
    <div
      class="govuk-grid-row govuk-!-margin-left-0 govuk-!-margin-top-4"
    >
      <button
        v-if="canAddRow"
        type="button"
        :class="`govuk-button govuk-button--secondary float-left`"
        @click.prevent="addRow"
      >
        Add another
      </button>
    </div>
  </div>
</template>

<script>
export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'RepeatableFields',
  props: {
    modelValue: {
      validator: (value) => (value instanceof Array || value === null || value === undefined),
      required: true,
    },
    component: {
      required: true,
      type: Object,
    },
    max: {
      required: false,
      default: false,
      type: [Number, Boolean],
    },
    url: {
      required: false,
      default: '',
      type: String,
    },
    showNoLegal: {
      default: false,
      required: false,
      type: Boolean,
    },
    componentProps: {
      required: false,
      default: () => ({}),
      type: Object,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      rows: [],
    };
  },
  computed: {
    canAddRow() {
      if (this.max) {
        return this.rows.length < this.max;
      } else {
        return true;
      }
    },
  },
  created() {
    if (this.modelValue instanceof Array) {
      this.rows = this.modelValue;
    } else {
      this.$emit('update:modelValue', this.rows);
    }

    if (this.rows.length === 0) {
      this.addRow();
    }
  },
  methods: {
    addRow() {
      if (this.canAddRow) {
        this.rows.push({});
      }
    },
    removeRow(index) {
      this.rows.splice(index, 1);
    },
  },
};
</script>
