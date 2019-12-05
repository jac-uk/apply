<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Statement of suitability
        </h1>

        <p class="govuk-body-l">
          Intro text provided by team.
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
          In 250 words tell us how.
        </p>

        <p class="govuk-body">
          Come back to this page to upload your statement of suitability.
        </p>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Download Statement Of Suitability template
          </h2>

          <a
            ref="templateDownloadLink"
            class="govuk-link govuk-body-m"
            href="#"
          >
            statement-of-suitability-template.doc
          </a>
        </div>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Upload Statement of Suitability
          </h2>
          <input
            id="suitability-statement-file"
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

export default {
  components: {
    RadioGroup,
    RadioItem,
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

      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
