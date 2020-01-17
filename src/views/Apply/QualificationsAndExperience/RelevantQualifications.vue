<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1
          class="govuk-heading-xl"
        >
          Qualifications
        </h1>

        <RadioGroup
          v-if="vacancy.schedule2Apply && vacancy.appliedSchedule == 'schedule-2-d'"
          id="applying-under-schedule-2-d"
          v-model="application.applyingUnderSchedule2d"
          label="Are you applying under Schedule 2(d)?"
        >
          <span>
            <a
              class="govuk-link govuk-body"
              href="http://www.legislation.gov.uk/ukpga/2007/15/schedule/2"
              target="_blank"
            >
              http://www.legislation.gov.uk/ukpga/2007/15/schedule/2
            </a>
          </span>

          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="experience-under-schedule-2-d"
              v-model="application.experienceUnderSchedule2D"
              label="Explain how you've gained experience in law."
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          v-if="vacancy.schedule2Apply && vacancy.appliedSchedule == 'schedule-2-3'"
          id="applying-under-schedule-2-3"
          v-model="application.applyingUnderSchedule2Three"
          label="Are you applying under Schedule 2(3)?"
        >
          <span>
            <a
              class="govuk-link govuk-body"
              href="http://www.legislation.gov.uk/ukpga/2007/15/schedule/2"
              target="_blank"
            >
              http://www.legislation.gov.uk/ukpga/2007/15/schedule/2
            </a>
          </span>

          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="experience-under-schedule-2-3"
              v-model="application.experienceUnderSchedule2Three"
              label="Explain how you've gained experience in law."
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RepeatableFields
          v-model="application.qualifications"
          :component="repeatableFields.Qualification"
        />

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
import RepeatableFields from '@/components/RepeatableFields';
import Qualification from '@/components/RepeatableFields/Qualification';
import RadioItem from '@/components/Form/RadioItem';
import RadioGroup from '@/components/Form/RadioGroup';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';

export default {
  components: {
    RepeatableFields,
    RadioItem,
    RadioGroup,
    TextareaInput,
    BackLink,
  },
  data(){
    const defaults = {
      qualifications: null,
      applyingUnderSchedule2d: null,
      experienceUnderSchedule2D: null,
      applyingUnderSchedule2Three: null,
      experienceUnderSchedule2Three: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
      repeatableFields: {
        Qualification,
      },
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
  },
  methods: {
    async save() {
      this.application.progress.relevantQualifications = true;
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
