<script setup>
import TextField from '@/components/Form/TextField.vue';
import { formatDate } from '@/helpers/date';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  verifiedAt: {
    type: Date,
    default: null,
  },
  showResendButton: {
    type: Boolean,
    default: false,
  },
});

const resend = () => {
  // TODO: Implement
};
</script>

<template>
  <div class="govuk-form-group">
    <TextField
      id="mobile"
      :model-value="props.modelValue"
      label="UK Mobile phone number"
      hint="Please input your UK Mobile phone number in the format 0xxxxxxxxxx. This number will be verified and used for Two-factor authentication."
      type="mobile"
      style="margin-bottom: 15px"
      required
      @update:model-value="emit('update:modelValue', $event)"
    >
      <template
        v-if="$slots['editable-once']"
        #editable-once
      >
        <slot name="editable-once" />
      </template>
    </TextField>

    <div
      v-if="!$slots['editable-once']"
      class="text-right"
      style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;"
    >
      <span
        v-if="verifiedAt"
        class="govuk-hint govuk-!-margin-bottom-0"
      >
        Verified at {{ formatDate(verifiedAt) }}
      </span>
      <span
        v-else
        class="govuk-hint govuk-!-margin-bottom-0"
      >
        Unverified
      </span>

      <button
        v-if="showResendButton"
        type="button"
        class="govuk-button govuk-!-margin-bottom-0"
        @click="resend"
      >
        Resend verification
      </button>
    </div>
  </div>
</template>
