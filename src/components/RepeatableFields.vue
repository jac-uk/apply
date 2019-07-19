<template>
  <div>
    <div class="card mb-3" v-for="(row, index) in rows" :key="index">
      <component class="card-body" :row="row" :index="index" :is="component">
        <template slot="removeButton">
          <button @click.prevent="removeRow(index)" class="btn btn-secondary" type="button">
            Remove
          </button>
        </template>
      </component>
    </div>
    <div class="text-right">
      <button @click.prevent="addRow" class="btn btn-primary" type="button" v-if="canAddRow">
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
  };
</script>
