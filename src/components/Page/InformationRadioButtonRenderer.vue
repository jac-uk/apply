<template>
  <div>
    <div
      class="govuk-body"
    >
      {{ value | toYesNo }}
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
