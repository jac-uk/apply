<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1
          class="govuk-heading-xl"
        >
          Qualifications
        </h1>

        <ErrorSummary :errors="errors" />

        <div
          v-if="vacancy.schedule2Apply"
        >
          <RadioGroup
            v-if="vacancy.appliedSchedule == 'schedule-2-d'"
            :id="`applying-under-${vacancy.appliedSchedule}`"
            v-model="formData.applyingUnderSchedule2d"
            :label="`Are you applying under ${appliedSchedule}?`"
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
                :id="`experience-under-${vacancy.appliedSchedule}`"
                v-model="formData.experienceUnderSchedule2D"
                label="Explain how you've gained experience in law."
              />
            </RadioItem>

            <RadioItem
              :value="false"
              label="No"
            />
          </RadioGroup>
          <RadioGroup
            v-else-if="vacancy.appliedSchedule == 'schedule-2-3'"
            :id="`applying-under-${vacancy.appliedSchedule}`"
            v-model="formData.applyingUnderSchedule2Three"
            :label="`Are you applying under ${appliedSchedule}?`"
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
                :id="`experience-under-${vacancy.appliedSchedule}`"
                v-model="formData.experienceUnderSchedule2Three"
                label="Explain how you've gained experience in law."
              />
            </RadioItem>

            <RadioItem
              :value="false"
              label="No"
            />
          </RadioGroup>
        </div>

        <RepeatableFields
          v-model="formData.qualifications"
          :component="repeatableFields.Qualification"
        />
        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--relevant-qualifications--save-and-continue"
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
import RepeatableFields from '@/components/RepeatableFields';
import Qualification from '@/components/RepeatableFields/Qualification';
import RadioItem from '@/components/Form/RadioItem';
import RadioGroup from '@/components/Form/RadioGroup';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';
import * as filters from '@/filters';

export default {
  components: {
    ErrorSummary,
    RepeatableFields,
    RadioItem,
    RadioGroup,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      qualifications: null,
      applyingUnderSchedule2d: null,
      experienceUnderSchedule2D: null,
      applyingUnderSchedule2Three: null,
      experienceUnderSchedule2Three: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'relevantQualifications',
      formData: formData,
      repeatableFields: {
        Qualification,
      },
    };
  },
  computed: {
    appliedSchedule() {
      return filters.lookup(this.vacancy.appliedSchedule);
    },
  },
};
</script>
