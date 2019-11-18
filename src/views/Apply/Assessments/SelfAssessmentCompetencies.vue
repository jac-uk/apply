<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Self-assessment competencies
        </h1>

        <p class="govuk-body-l">
          Download the template on this page to complete your self-assessment
          competency statements. It details the specific skills and experience
          you'll need to demonstrate for this role.
        </p>

        <p class="govuk-body-l">
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

export default {

  data(){
    return {

    };
  },
  methods: {
    save() {

    },
  },
};
</script>
