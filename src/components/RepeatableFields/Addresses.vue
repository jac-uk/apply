<template>
  <div>
    <AddressComponent
      id="previousAddress"
      v-model="row"
      label="Previous address"
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
import AddressComponent from '@/components/Form/Address';
import DateInput from '@/components/Form/DateInput';

export default {
  name: 'AddressesComponent',
  components: {
    AddressComponent,
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
