<template>
  <article>
    <table class="table" v-if="answeredYes">
      <thead>
        <tr>
          <th colspan="10">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody v-for="record in visibleRecords" :key="record.id">
        <tr v-for="(value, key) in record" :key="value.id">
          <th class="text-capitalize offence_key">{{ key.replace('_', ' ') }}</th>
          <td v-if="value instanceof Date" class="offence_info">{{ value.toLocaleDateString("en-GB", { month: "numeric", year: "numeric" }) }}</td>
          <td v-else class="offence_info">{{ value }}</td>
        </tr>
        <tr>
          <td colspan="10">
            <RouterLink to="/apply/character" class="float-right">Change</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="table" v-else>
      <tbody>
        <tr>
          <th class="boolean_no">
            {{ title }}
          </th>
          <td class="p-3 text-right">
            No
          </td>
          <td class="p-3 text-right">
            <RouterLink to="/apply/character" class="float-right">Change</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
export default {
  props: {
    answeredYes: Boolean,
    records: Array,
    title: String
  },
  computed: {
    visibleRecords: function () {
      if(this.answeredYes) {
        return this.records
      } else {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.boolean_no { width: 75% !important }
.offence_key { width: 15% !important }
</style>
