<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Welsh posts
        </h1>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <RadioGroup
          v-if="isWelshAdministrationRequired"
          id="applying-for-welsh-post"
          v-model="formData.applyingForWelshPost"
          required
          label="Are you applying for a post in Wales?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          v-if="isSpeakWelshRequired"
          id="speak-welsh"
          v-model="formData.canSpeakWelsh"
          required
          label="Can you speak Welsh?"
          hint="You will be tested on this later in the process."
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          v-if="isReadWriteWelshRequired"
          id="read-and-write-welsh"
          v-model="formData.canReadAndWriteWelsh"
          required
          label="Can you read and write in Welsh?"
          hint="You will be tested on this later in the process."
        >
          <RadioItem
            :value="false"
            label="No"
          />
          <RadioItem
            value="read"
            label="Read"
          />
          <RadioItem
            value="write"
            label="Write"
          />
          <RadioItem
            value="both"
            label="Both"
          />
        </RadioGroup>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--welsh-post--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import ApplyMixIn from '../ApplyMixIn';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      applyingForWelshPost: null,
      canSpeakWelsh: null,
      canReadAndWriteWelsh: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'welshPosts',
      formData: formData,
    };
  },
};
</script>
