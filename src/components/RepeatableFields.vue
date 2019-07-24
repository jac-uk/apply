<template>
  <div>
    <div
      v-for="(row, index) in rows"
      :key="index"
      class="card mb-3"
    >
      <component
        :is="component"
        class="card-body"
        :row="row"
        :index="index"
      >
        <template slot="removeButton">
          <button
            class="btn btn-secondary"
            type="button"
            @click.prevent="removeRow(index)"
          >
            Remove
          </button>
        </template>
      </component>
    </div>
    <div class="text-right">
      <button
        v-if="canAddRow"
        class="btn btn-primary"
        type="button"
        @click.prevent="addRow"
      >
        Add another
      </button>
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
