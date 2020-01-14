<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
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
          v-model="application.applyingForWelshPost"
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

          <p
            v-if="isApplyingForWelshPost"
            class="govuk-body"
          >
            During the process you may be asked questions about your
            knowledge of the administration of justice in Wales.
          </p>
        </RadioGroup>

        <RadioGroup
          v-if="isSpeakWelshRequired"
          id="speak-welsh"
          v-model="application.canSpeakWelsh"
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
          v-model="application.canReadAndWriteWelsh"
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

        <button class="govuk-button">
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
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
  data(){
    const defaults = {
      applyingForWelshPost: null,
      canSpeakWelsh: null,
      canReadAndWriteWelsh: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.exercise.record;
    },
    isWelshAdministrationRequired() {
      return this.vacancy.welshRequirementType.includes('welsh-administration-questions');
    },
    isSpeakWelshRequired() {
      return this.vacancy.welshRequirementType.includes('welsh-speaking');
    },
    isReadWriteWelshRequired() {
      return this.vacancy.welshRequirementType.includes('welsh-reading-writing');
    },
    isApplyingForWelshPost () {
      return this.vacancy.welshRequirement && this.application.applyingForWelshPost;
    },
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.application.progress.partTimeWorkingPreferences = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
