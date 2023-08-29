<template>
  <div>
    <div
      class="govuk-body"
    >
      {{ $filters.toYesNo(value) }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'InformationRadioButtonRenderer',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: null,
    },
  },
};
</script>
