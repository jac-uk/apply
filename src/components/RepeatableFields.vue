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
      >
        <template #removeButton>
          <button
            v-if="rows.length > 1"
            ref="removeFieldButton"
            type="button"
            class="govuk-button float-right govuk-button--warning govuk-!-padding-top-2"
            @click.prevent="removeRow(index)"
          >
            Remove
          </button>
          <hr class="govuk-!-margin-bottom-0">
        </template>
      </component>
      <div
        class="govuk-grid-row"
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
  </div>
</template>

<script>
export default {
  name: 'RepeatableFields',
  props: {
    value: {
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
  },
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
    if (this.value instanceof Array) {
      this.rows = this.value;
    } else {
      this.$emit('input', this.rows);
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
