<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Welsh Posts
      </h1>

      <p class="govuk-body-m govuk-!-margin-top-0">
        Please update this section to take into account any changes since you submitted your application
      </p>

      <form
        ref="formRef"
        @submit.prevent="save"
      >
        <ErrorSummary
          :errors="errors"
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

        <div v-if="formData.applyingForWelshPost">
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
        </div>

        <button
          class="govuk-button info-btn--candidate-availability--save-and-continue"
        >
          Save and continue
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { APPLICATION_FORM_PARTS } from '@/helpers/constants';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';

import {
  isWelshAdministrationRequired,
  isSpeakWelshRequired,
  isReadWriteWelshRequired,
  isApplyingForWelshPost
} from '@/helpers/exerciseHelper';

export default {
  name: 'CandidateFormWelshPosts',
  components: {
    RadioGroup,
    RadioItem,
  },
  mixins: [CandidateFormsMixIn],
  data() {
    const application = this.$store.getters['application/data']();
    const formData = {
      canReadAndWriteWelsh: application.canReadAndWriteWelsh,
      canSpeakWelsh: application.canSpeakWelsh,
      applyingForWelshPost: application.applyingForWelshPost,
    };
    return {
      formData,
    };
  },
  created() {
    this.setupPart(APPLICATION_FORM_PARTS.WELSH_POSTS);
  },
  methods: {
    isWelshAdministrationRequired() {
      return isWelshAdministrationRequired(this.vacancy);
    },
    isSpeakWelshRequired() {
      return isSpeakWelshRequired(this.vacancy);
    },
    isReadWriteWelshRequired() {
      return isReadWriteWelshRequired(this.vacancy);
    },
    isApplyingForWelshPost() {
      return isApplyingForWelshPost(this.vacancy, this.application);
    },
    async save(){
      const saveData = {
        canReadAndWriteWelsh: this.formData.canReadAndWriteWelsh,
        canSpeakWelsh: this.formData.canSpeakWelsh,
        applyingForWelshPost: this.formData.applyingForWelshPost,
      };
      await this.$store.dispatch('application/save', saveData);
      await this.savePart(true);
    },
  },
};
</script>
