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
          <label
            class="govuk-heading-m"
            for="file-upload-1"
          >
            Download assessments template
          </label>

          <a
            class="govuk-link govuk-body-m"
            href="#"
            download="assessments-template.doc"
          >
            assessments-template.doc
          </a>
        </div>

        <div class="govuk-form-group">
          <label
            class="govuk-heading-m"
            for="file-upload-2"
          >
            Upload finished assessments
          </label>
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
