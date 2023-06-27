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

        <p class="govuk-body-l">
          Please enter at least one qualification.
        </p>

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

        <template v-if="notCompletedPupillage">
          <h2>As you did not complete pupillage, please provide a copy of your exemption and or practicing certificate</h2>

          <FileUpload
            id="exemption-certificate-upload"
            ref="exemption-certificate"
            v-model="formData.uploadedExemptionCertificate"
            name="exemption-certificate"
            :path="uploadPath"
            label="Exemption certificate"
            required
          />

          <FileUpload
            id="practicing-certificate-upload"
            ref="practicing-certificate"
            v-model="formData.uploadedPracticingCertificate"
            name="practicing-certificate"
            :path="uploadPath"
            label="Practicing certificate"
            required
          />

          <FormFieldError
            id="practicing-certificate-upload"
            :error-message="errorMessage"
          />
        </template>

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
import FileUpload from '@/components/Form/FileUpload';
import FormFieldError from '@/components/Form/FormFieldError';
import _has from 'lodash/has';

export default {
  name: 'RelevantQualifications',
  components: {
    ErrorSummary,
    RepeatableFields,
    RadioItem,
    RadioGroup,
    TextareaInput,
    BackLink,
    FileUpload,
    FormFieldError,
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
      uploadedExemptionCertificate: null,
      uploadedPracticingCertificate: null,
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
      errorMessage: '',
    };
  },
  computed: {
    appliedSchedule() {
      return filters.lookup(this.vacancy.appliedSchedule);
    },
    notCompletedPupillage() {
      if (_has(this.formData, 'qualifications') && Array.isArray(this.formData.qualifications)) {
        const matches = this.formData.qualifications.filter(qualification => {
          return qualification.type === 'barrister'
            && 'completedPupillage' in qualification
            && qualification.completedPupillage === false;
        });
        return matches.length > 0;
      }
      return null;
    },
  },
  methods: {
    validate() {
      if (this.notCompletedPupillage) {
        if (this.formData.uploadedExemptionCertificate === null && this.formData.uploadedPracticingCertificate === null) {
          this.$refs['practicing-certificate'].setError('Please provide a copy of your practicing and/or exemption certificate');
          this.$refs['exemption-certificate'].setError('Please provide a copy of your exemption and/or practicing certificate');
        }
        else {
          this.$refs['practicing-certificate'].setError('');
          this.$refs['exemption-certificate'].setError('');
        }
      }
    },
  },
};
</script>
