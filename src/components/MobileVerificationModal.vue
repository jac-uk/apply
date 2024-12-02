<script setup>
import { ref, onMounted } from 'vue';
import ActionButton from '@jac-uk/jac-kit/draftComponents/ActionButton.vue';
import TextField from '@/components/Form/TextField.vue';
import { httpsCallable } from '@firebase/functions';
import { functions } from '@/firebase';

const props = defineProps({
  title: {
    type: String,
    default: 'Verify your phone number',
  },
  open: {
    type: Boolean,
    default: false,
  },
  mobile: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['success', 'cancel']);

const code = ref('');

onMounted(() => {
  sendSmsCode();
});

const sendSmsCode = async () => {
  try {
    await httpsCallable(functions, 'sendSmsVerificationCode')({
      mobile: props.mobile,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const verifyCode = async () => {
  if (!code.value) return;

  let isSuccess = false;
  try {
    const result = await httpsCallable(functions, 'verifySmsVerificationCode')({ code: code.value });
    if (result.data) {
      isSuccess = true;
      emit('success', true);
    }
  } catch (error) {
    isSuccess = true;
  }

  code.value = '';
  return isSuccess;
};

const cancel = () => {
  emit('cancel', false);
};
</script>

<template>
  <div
    v-show="open"
    class="modal-mask"
  >
    <div class="modal">
      <div class="container">
        <div class="modal__title govuk-!-padding-2 govuk-heading-m">
          {{ title }}
        </div>
        <div class="modal__content govuk-!-padding-4">
          <p class="modal__message govuk-body">
            We’ve sent you a text message with a verification code. Please enter the code in the box below.
          </p>

          <TextField
            id="verification-code"
            v-model="code"
            required
            label="Verification code"
          />

          <div style="display: flex; justify-content: space-between">
            <ActionButton
              :disabled="!mobile"
              :action="sendSmsCode"
            >
              Resend
            </ActionButton>
            <div>
              <span>
                <button
                  class="govuk-button govuk-button--secondary govuk-!-margin-right-3"
                  @click="cancel"
                >
                  Cancel
                </button>
              </span>
              <ActionButton
                type="primary"
                :disabled="!code"
                :action="verifyCode"
              >
                Verify
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @mixin mobile-view {
    @media (max-width: 599px) { @content; }
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 30%;
    transform: translate(-50%, -50%);
    border: solid 2px #b1b4b6;
    background-color: #ffffff;
    @include mobile-view {
      width: 100%;
      min-height: 100%;
    }
  }

  .modal__title {
    text-align: center;
    vertical-align: middle;
    border: solid 2px #1d70b8;
    background-color: #1d70b8;
    color: white;
  }
  .modal__message {
    vertical-align: middle;
  }
  .deny {
    background-color: #f3f2f1;
  }
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    overflow: hidden;
  }
</style>
