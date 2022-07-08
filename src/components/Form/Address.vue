<template>
  <div
    class="govuk-form-group"
  >
    <label
      :for="id"
      class="govuk-heading-m govuk-!-margin-bottom-2"
    >
      {{ label }}
    </label>

    <span
      v-if="hint"
      class="govuk-hint"
    >
      {{ hint }}
    </span>

    <TextField
      :id="`${id}--street`"
      v-model="value.street"
      required
      label="Building and street"
    />
    <TextField
      :id="`${id}--street2`"
      v-model="value.street2"
      label="Building and street line 2"
      label-hidden
    />
    <TextField
      :id="`${id}--town`"
      v-model="value.town"
      required
      label="Town or city"
    />
    <TextField
      :id="`${id}--county`"
      v-model="value.county"
      label="County"
    />
    <TextField
      :id="`${id}--postcode`"
      v-model="value.postcode"
      required
      label="Postcode"
      type="postcode"
    />
  </div>
</template>
<script>
import FormField from '@/components/Form/FormField';
import TextField from '@/components/Form/TextField';

export default {
  name: 'Address',
  components: {
    TextField,
  },
  extends: FormField,
  props: {
    value: {
      required: true,
      type: Object,
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
};
</script>
