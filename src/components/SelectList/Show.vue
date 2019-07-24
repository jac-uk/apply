<template>
  <article>
    <table class="table mb-3">
      <tr>
        <th colspan="2">
          {{ title }}
        </th>
      </tr>
      <tr v-if="singleResponse">
        <td>
          {{ singleResponse }}
        </td>
        <td
          v-if="singleResponse === 'Other'"
          class="float-right"
        >
          {{ other }}
        </td>
      </tr>
      <tr
        v-for="record in records"
        :key="record"
      >
        <td colspan="2">
          {{ record }}
        </td>
      </tr>
      <tr v-if="hasOther">
        <td colspan="2">
          Other:&nbsp;
          {{ other }}
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <RouterLink
            :to="changeLink"
            class="float-right"
          >
            Change
          </RouterLink>
        </td>
      </tr>
    </table>
  </article>
</template>

<script>
export default {
  props: {
    changeLink: {
      type: String,
      required: true,
    },
    hasOther: {
      type: Boolean,
      required: true,
    },
    other: {
      type: String,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
    singleResponse: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
