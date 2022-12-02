<template>
  <div>
    <TextField
      :id="`VATNumber_${index}`"
      v-model="row.VATNumber"
      required
      label="VAT registration number"
      hint="For example, ‘123456789’."
      class="govuk-!-margin-bottom-5"
    />

    <slot name="removeButton" />
  </div>
</template>

<script>
import TextField from '@/components/Form/TextField';

export default {
  name: 'VATNumbers',
  components: {
    TextField,
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
