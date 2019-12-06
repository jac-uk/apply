<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Statement of leadership suitability
        </h1>

        <p class="govuk-body-l">
          ASC Intro text provided by team.
        </p>

        <RadioGroup
          id="meet-requirements"
          v-model="meetRequirements"
          label="Do you meet this requirement?"
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

        <p class="govuk-body">
          In 400 words tell us how you meet each skill and ability.
        </p>

        <p class="govuk-body">
          Come back to this page to upload your finished statements.
        </p>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Download leadership suitability template
          </h2>

          <a
            ref="templateDownloadLink"
            class="govuk-link govuk-body-m"
            href="#"
          >
            leadership-suitability-template.doc
          </a>
        </div>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Upload leadersip suitability assessment
          </h2>
          <input
            id="leadership-suitability-assessment-file"
            class="govuk-file-upload"
            type="file"
            @change="fileSelected"
          >
        </div>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Upload CV
          </h2>
          <input
            id="cv-file"
            class="govuk-file-upload"
            type="file"
            @change="fileSelected"
          >
        </div>

        <button class="govuk-button">
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import '@/mixins/uploadMixin';
import BackLink from '@/components/BackLink';

export default {
  components: {
    RadioGroup,
    RadioItem,
    BackLink,
  },
  data(){
    const defaults = {};
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
      files: {},
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.currentUser.uid;
    },
  },   
  methods: {
    async save() {
      // loop through this.files and upload them
      const files = Object.values(this.files);
      for (const file of files) {
        await this.upload(file);
      }

      this.application.progress.leadershipSuitability = true;
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
