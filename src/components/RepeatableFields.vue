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
        <template v-slot:removeButton>
          <button
            v-if="rows.length > 1"
            ref="removeFieldButton"
            type="button"
            class="govuk-button govuk-button--warning govuk-!-margin-bottom-2"
            @click.prevent="removeRow(index)"
          >
            Remove
          </button>
        </template>
      </component>
    </div>
    <button
      v-if="canAddRow"
      type="button"
      :class="`govuk-button govuk-button--secondary govuk-!-margin-bottom-6 info-btn--${$route.name}--repeatable-field--add-another`"
      @click.prevent="addRow"
    >
      Add another
    </button>
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
