<template>
  <div>
    <Address
      id="previousAddress"
      :model-value="row"
      label="Previous address"
      @update:model-value="row = $event"
    />

    <DateInput
      :id="`start_date_${index}`"
      v-model="row.startDate"
      label="Start date"
      type="month"
    />
    <DateInput
      :id="`end_date_${index}`"
      v-model="row.endDate"
      label="End date"
      type="month"
      class="govuk-!-margin-bottom-5"
    />

    <slot name="removeButton" />
  </div>
</template>

<script>
import Address from '@/components/Form/Address.vue';
import DateInput from '@/components/Form/DateInput.vue';

export default {
  name: 'Addresses',
  components: {
    Address,
    DateInput,
  },
  props: {
    row: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
  },
};
</script>
