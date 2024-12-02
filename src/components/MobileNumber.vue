<script setup>
import { ref, computed, watch } from 'vue';
import parsePhoneNumber from 'libphonenumber-js';
import MobileVerificationModal from '@/components/MobileVerificationModal.vue';
import TextField from '@/components/Form/TextField.vue';
import { formatDate } from '@/helpers/date';
import { isValidUKMobile } from '@jac-uk/jac-kit/helpers/Form/validatePhone';

const emit = defineEmits(['update:mobile']);

const props = defineProps({
  defaultMobile: {
    type: String,
    default: null,
  },
  defaultMobileVerifiedAt: {
    type: Date,
    default: null,
  },
});

const mobile = defineModel('mobile', {
  type: String,
  default: null,
});
const mobileVerifiedAt = defineModel('mobileVerifiedAt', {
  type: Date,
  default: null,
});

const modelOpen = ref(false);

const isMobileChanged = computed(() => {
  return mobile.value !== props.defaultMobile;
});

const isValidMobile = computed(() => {
  if (!mobile.value) return false;
  return isValidUKMobile(mobile.value);
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

watch(() => isMobileChanged.value, (value) => {
  if (value) {
    mobileVerifiedAt.value = null;
  } else {
    mobileVerifiedAt.value = props.defaultMobileVerifiedAt;
  }
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
        v-if="!isMobileChanged && mobileVerifiedAt"
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
        :disabled="mobileVerifiedAt || !isValidMobile"
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
      @cancel="closeModal"
    />
  </div>
</template>
