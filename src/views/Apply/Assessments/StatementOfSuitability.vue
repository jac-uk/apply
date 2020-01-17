<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Statement of suitability
        </h1>

        <div v-if="vacancy.aSCApply && vacancy.selectionCriteria">
          <div
            v-for="(item, index) in application.selectionCriteriaAnswers"
            :key="index"
          >
            <p
              class="govuk-heading-m govuk-!-font-weight-bold"
            >
              {{ item.title }}
            </p>
            <p class="govuk-body">
              {{ item.text }}
            </p>

            <RadioGroup
              :id="`meet_requirements_${index}`"
              v-model="item.answer"
              label="Do you meet this requirement?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <TextareaInput
                  :id="`meet_requirements_details${index}`"
                  v-model="item.answerDetails"
                  label="In 250 words, tell us how."
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
        </div>

        <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

        <p class="govuk-body-l">
          Below is a blank template for the statement of suitability. Please save this document, fill it in,
          then re-upload it to this page.
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
            {{ downloadNameGenerator }}
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

        <div
          v-if="vacancy.assessmentOptions == 'statement-of-suitability-with-skills-and-abilities-and-cv'"
          class="govuk-form-group"
        >
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

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import uploadMixin from '@/mixins/uploadMixin';
import BackLink from '@/components/BackLink';

export default {
  components: {
    RadioGroup,
    RadioItem,
    TextareaInput,
    BackLink,
  },
  mixins: [uploadMixin],
  data(){
    const defaults = {
      selectionCriteriaAnswers: [],
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    const vacancy = this.$store.state.vacancy.record;
    if (vacancy && vacancy.aSCApply && vacancy.selectionCriteria) {
      for (let i = 0, len = vacancy.selectionCriteria.length; i < len; ++i) {
        application.selectionCriteriaAnswers.push({
          title: vacancy.selectionCriteria[i].title,
          text: vacancy.selectionCriteria[i].title,
          answer: null,
          answerDetail: null,
        });
      }
    }
    return {
      application: application,
      files: {},
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.currentUser.uid;
    },
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    downloadNameGenerator() {
      let outcome = null;
      if (this.vacancy.assessmentOptions == 'statement-of-suitability-with-competencies') {
        outcome = 'statement-of-suitability-with-competencies';
      } else if (
        this.vacancy.assessmentOptions == 'statement-of-suitability-with-skills-and-abilities' ||
        this.vacancy.assessmentOptions == 'statement-of-suitability-with-skills-and-abilities-and-cv'
      ) {
        outcome = 'statement-of-suitability-with-skills-and-abilities';
      }
      let fileName = this.vacancy.uploadedCandidateAssessmentFormTemplate;
      if (fileName) {
        outcome = outcome + '.' + fileName.split('.').pop();
      }
      return outcome;
    },
  },
  methods: {
    async save() {
      // loop through this.files and upload them
      const files = Object.values(this.files);
      for (const file of files) {
        await this.upload(file);
      }
      this.application.progress.statementOfSuitability = true;
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
