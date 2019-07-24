<template>
  <article>
    <table
      v-if="answeredYes"
      class="table"
    >
      <tbody>
        <tr>
          <th>
            {{ title }}
          </th>
          <td class="p-3 text-right">
            Yes
          </td>
        </tr>
        <tr>
          <th colspan="2">
            {{ subtitle }}
          </th>
        </tr>
        <tr
          v-for="record in records"
          :key="record"
        >
          <td colspan="2">
            {{ record }}
          </td>
        </tr>
        <tr v-if="other">
          <th v-if="otherCaption">
            {{ otherCaption }}
          </th>
          <td v-if="other">
            {{ other }}
          </td>
        </tr>
        <tr>
          <td colspan="10">
            <RouterLink
              :to="changeLink"
              class="float-right"
            >
              Change
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

    <table
      v-else
      class="table"
    >
      <tbody>
        <tr>
          <th class="boolean_no">
            {{ title }}
          </th>
          <td class="p-3 text-right">
            No
          </td>
          <td class="p-3 text-right">
            <RouterLink
              :to="changeLink"
              class="float-right"
            >
              Change
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
export default {
  props: {
    answeredYes: {
      type: Boolean,
      required: true,
    },
    changeLink: {
      type: String,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    otherCaption: {
      type: String,
      required: true,
    },
    other: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.boolean_no { width: 75% !important }
</style>
