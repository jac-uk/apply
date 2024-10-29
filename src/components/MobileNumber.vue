<script setup>
import { ref, computed } from 'vue';
import parsePhoneNumber from 'libphonenumber-js';
import MobileVerificationModal from '@/components/MobileVerificationModal.vue';
import TextField from '@/components/Form/TextField.vue';
import { formatDate } from '@/helpers/date';

const emit = defineEmits(['update:mobile']);

const mobile = defineModel('mobile', {
  type: String,
  default: '',
});
const mobileVerifiedAt = defineModel('mobileVerifiedAt', {
  type: Date,
  default: null,
});

const modelOpen = ref(false);

const isValidMobile = computed(() => {
  if (!mobile.value) return false;
  const phoneNumber = parsePhoneNumber(mobile.value, 'GB');
  return phoneNumber && phoneNumber.isValid();
});

const nationalMobile = computed(() => {
  if (!isValidMobile.value) return null;
  const phoneNumber = parsePhoneNumber(mobile.value, 'GB');
  return `0${phoneNumber.nationalNumber}`;
});

const internationalMobile = computed(() => {
  if (!isValidMobile.value) return null;
  const phoneNumber = parsePhoneNumber(mobile.value, 'GB');
  return phoneNumber.number;
});

const openModal = () => {
  modelOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modelOpen.value = false;
  document.body.style.overflow = '';
};

const startVerification = async () => {
  if (!isValidMobile.value) return;
  emit('update:mobile', nationalMobile.value);
  openModal();
};

const onVerificationSuccess = () => {
  mobileVerifiedAt.value = new Date();
  closeModal();
};
</script>

<template>
  <div class="govuk-form-group">
    <TextField
      id="mobile"
      v-model="mobile"
      label="UK Mobile phone number"
      hint="Please input your UK Mobile phone number in the format 0xxxxxxxxxx. This number will be verified and used for Two-factor authentication."
      type="mobile"
      style="margin-bottom: 15px"
      required
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
        v-if="mobileVerifiedAt"
        class="govuk-hint govuk-!-margin-bottom-0"
      >
        Verified at {{ formatDate(mobileVerifiedAt) }}
      </span>
      <span
        v-else
        class="govuk-hint govuk-!-margin-bottom-0"
      >
        Unverified
      </span>

      <button
        type="button"
        class="govuk-button govuk-!-margin-bottom-0"
        :disabled="!isValidMobile"
        @click="startVerification"
      >
        Start verification
      </button>
    </div>

    <MobileVerificationModal
      v-if="isValidMobile && modelOpen"
      :open="modelOpen"
      :mobile="internationalMobile"
      @success="onVerificationSuccess"
      @close="closeModal"
    />
  </div>
</template>
