<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Statement of suitability
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
            Download assessments template
          </h2>

          <a
            ref="templateDownloadLink"
            class="govuk-link govuk-body-m"
            href="#"
          >
            assessments-template.doc
          </a>
        </div>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Upload finished assessments
          </h2>
          <input
            id="file-upload-1"
            class="govuk-file-upload"
            type="file"
          >
        </div>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Upload CV
          </h2>
          <input
            id="file-upload-2"
            class="govuk-file-upload"
            type="file"
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
export default {
  components: {
    RadioGroup,
    RadioItem,
  },
  data(){
    return {
    };
  },
  methods: {
    save() {
      this.application.progress.leadershipSuitability = true;
    },
  },
};
</script>
