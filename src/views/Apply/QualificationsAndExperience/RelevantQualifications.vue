<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="saveAndValidate"
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
            required
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
                required
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
            required
          >
            <span>
              <a
                class="govuk-link govuk-body"
                href="https://www.legislation.gov.uk/ukpga/2007/15/schedule/3"
                target="_blank"
              >
                https://www.legislation.gov.uk/ukpga/2007/15/schedule/3
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
                required
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
          :show-no-legal="formData.applyingUnderSchedule2d || formData.applyingUnderSchedule2Three"
          required
        />

        <template v-if="notCompletedPupillage">
          <h2>As you did not complete pupillage, please provide a copy of your exemption and or practicing certificate</h2>

          <FileUpload
            id="exemption-certificate-upload"
            ref="exemption-certificate"
            v-model="formData.uploadedExemptionCertificate"
            name="exemption-certificate"
            :path="uploadPath"
            :acceptable-extensions="['docx', 'doc', 'odt', 'txt', 'fodt', 'pdf']"
            label="Exemption certificate"
            :required="isPupillageCertificateRequired"
          />

          <FileUpload
            id="practicing-certificate-upload"
            ref="practicing-certificate"
            v-model="formData.uploadedPracticingCertificate"
            name="practicing-certificate"
            :path="uploadPath"
            :acceptable-extensions="['docx', 'doc', 'odt', 'txt', 'fodt', 'pdf']"
            label="Practicing certificate"
            :required="isPupillageCertificateRequired"
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
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import ApplyMixIn from '../ApplyMixIn';
import RepeatableFields from '@/components/RepeatableFields.vue';
import Qualification from '@/components/RepeatableFields/Qualification.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import BackLink from '@/components/BackLink.vue';
import * as filters from '@/filters';
import FileUpload from '@/components/Form/FileUpload.vue';
import FormFieldError from '@/components/Form/FormFieldError.vue';
import _has from 'lodash/has';
import { getExemptionCertificateSplitPath, getPracticingCertificateSplitPath } from '@/services/candidateService';

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
  data() {
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

    console.log('============ RELEVANT QUALIFICATION ===============');

    console.log('-- RQ Application data:');
    console.log(data);

    const formData = { ...defaults, ...data };

    console.log('-- RQ Initial formData:');
    console.log(formData);

    // check if candidate has filled relevant qualifications before
    const candidateRelevantQualifications = this.$store.getters['candidate/relevantQualifications']();

    console.log('-- RQ candidateRelevantQualifications:');
    console.log(candidateRelevantQualifications);

    if (!formData.qualifications && candidateRelevantQualifications?.qualifications) {
      formData.qualifications = candidateRelevantQualifications?.qualifications;
    }

    // @TODO: Certificates
    const exemptionCertificateSplitPath = getExemptionCertificateSplitPath();
    console.log('-- RQ exemptionCertificateSplitPath:');
    console.log(exemptionCertificateSplitPath);
    if (exemptionCertificateSplitPath.length > 0) {
      // eg /exercise/gWHwfBAlA9JYqzhwELnx/user/UhG4MVCdVpbSZAyZHOgB2LIidFj
      console.log(`-- RQ exemptionCertificateSplitPath[0]: ${exemptionCertificateSplitPath[0]}`);

      // eg exemption-certificate.docx
      console.log(`-- RQ exemptionCertificateSplitPath[1]: ${exemptionCertificateSplitPath[1]}`);
    }

    const practicingCertificateSplitPath = getPracticingCertificateSplitPath();
    console.log('-- RQ practicingCertificateSplitPath:');
    console.log(practicingCertificateSplitPath);
    if (practicingCertificateSplitPath.length > 0) {
      // eg /exercise/gWHwfBAlA9JYqzhwELnx/user/UhG4MVCdVpbSZAyZHOgB2LIidFj
      console.log(`-- RQ practicingCertificateSplitPath[0]: ${practicingCertificateSplitPath[0]}`);

      // eg practicing-certificate.docx
      console.log(`-- RQ practicingCertificateSplitPath[1]: ${practicingCertificateSplitPath[1]}`);
    }

    // Check if the application has the uploadedExemptionCertificate set and, if so, use it
    //    Set the path for the FileUpload component (and formData.uploadedPracticingCertificate is already set!)
    //    => const fileUploadPath = this.uploadPath;
    // Else if its in the candidate record
    //    formData.uploadedPracticingCertificate = exemptionCertificateSplitPath[1]
    //    fileUploadPath = exemptionCertificateSplitPath[0]

    let exemptionCertFileUploadPath = this.uploadPath;
    let practicingCertFileUploadPath = this.uploadPath;

    // console.log(`-- formData['uploadedExemptionCertificate']: ${formData['uploadedExemptionCertificate']}`);
    // console.log(`-- exemptionCertificateSplitPath.length']: ${exemptionCertificateSplitPath.length}`);

    // EXEMPTION CERTIFICATE
    if (_has(formData, 'uploadedExemptionCertificate') && formData.uploadedExemptionCertificate) {
      console.log('-- RQ Getting exemption certificate from the APPLICATION');
    }
    else if ((!_has(formData, 'uploadedExemptionCertificate') || !formData.uploadedExemptionCertificate) && exemptionCertificateSplitPath.length === 2) {
      console.log('-- RQ Getting exemption certificate from the CANDIDATE PROFILE');

      // @TODO: COMMENTED OUT BELOW TO SHOW WHAT THE DATA LOOKS LIKE, NOW NEED TO TEST IT WHEN THIS IS UNCOMMENTED AND ENSURE THE FILE STILL SHOWS IN FILE UPLOAD!!

      //formData.uploadedExemptionCertificate = exemptionCertificateSplitPath[1];
      exemptionCertFileUploadPath = exemptionCertificateSplitPath[0];
    }
    else {
      console.log('-- RQ NOT getting exemption certificate from ANYWHERE');
    }

    // PRACTICING CERTIFICATE
    if (_has(formData, 'uploadedPracticingCertificate') && formData.uploadedPracticingCertificate) {
      console.log('-- RQ Getting practicing certificate from the APPLICATION');
    }
    else if ((!_has(formData, 'uploadedPracticingCertificate') || !formData.uploadedPracticingCertificate) && practicingCertificateSplitPath.length === 2) {
      console.log('-- RQ Getting practicing certificate from the CANDIDATE PROFILE');

      // @TODO: COMMENTED OUT BELOW TO SHOW WHAT THE DATA LOOKS LIKE, NOW NEED TO TEST IT WHEN THIS IS UNCOMMENTED AND ENSURE THE FILE STILL SHOWS IN FILE UPLOAD!!

      //formData.uploadedPracticingCertificate = practicingCertificateSplitPath[1];
      practicingCertFileUploadPath = practicingCertificateSplitPath[0];
    }
    else {
      console.log('-- RQ NOT getting practicing certificate from ANYWHERE');
    }

    // @TODO: see above, its returning a promise instead of the value!!

    // Path to FileUpload component: /exercise/gWHwfBAlA9JYqzhwELnx/user/UhG4MVCdVpbSZAyZHOgB2LIidFj2
    // Filename to FileUpload component: exemption-certificate.docx

    console.log('-- RQ Eventual formData:');
    console.log(formData);

    // @TODO: Similar to above check for existing files in candidate record and load it if nowt in the formData (ie the application)!

    return {
      formId: 'relevantQualifications',
      formData: formData,
      repeatableFields: {
        Qualification,
      },
      // Save full path to candidate profile when updating certificates
      updateCertificates: {
        exemptionCertificateFullPath: null,
        practicingCertificateFullPath: null,
      },
      errorMessage: '',
      exemptionCertFileUploadPath: exemptionCertFileUploadPath,
      practicingCertFileUploadPath: practicingCertFileUploadPath,
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
    isPupillageCertificateRequired() {
      return this.formData.uploadedExemptionCertificate === null && this.formData.uploadedPracticingCertificate === null;
    },
  },
  watch: {
    'formData.applyingUnderSchedule2d': function(newVal, oldVal) {
      if (oldVal === true && newVal === false) {
        this.formData.qualifications.forEach((qual)=>{
          qual.type = null;
        });
      }
    },
    'formData.applyingUnderSchedule2Three': function(newVal, oldVal) {
      if (oldVal === true && newVal === false) {
        this.formData.qualifications.forEach((qual)=>{
          qual.type = null;
        });
      }
    },
  },
  methods: {
    async saveAndValidate() {
      if (this.notCompletedPupillage) {
        if (this.formData.uploadedExemptionCertificate === null && this.formData.uploadedPracticingCertificate === null) {
          this.$refs['practicing-certificate'].setError('Please provide a copy of your practicing and/or exemption certificate');
          this.$refs['exemption-certificate'].setError('Please provide a copy of your exemption and/or practicing certificate');
        } else {
          this.$refs['practicing-certificate'].setError('');
          this.$refs['exemption-certificate'].setError('');
        }
      }
      this.save();
      if (this.formData.qualifications) {

        // @TODO: Save the certs below too!

        await this.$store.dispatch('candidate/saveRelevantQualifications', {
          qualifications: this.formData.qualifications,
        });
      }
      if (this.updateCertificates.exemptionCertificateFullPath) {
        // Exemption certificate has been added/updated so update the candidate profile
        console.log('-- RQ exemption certificate has been added/updated so update the candidate profile');

        // @TODO:
        // - Save under 'relevantQualifications' as an array AND check that saving qualifications doesnt overwrite these file paths
        // - latest one is the current one so only update it if it's different
        // - use a helper function to save this filepath and retrieve it (get/set)
        // - retrieve the filepath above when the page loads so it fetches the file from the candidate profile if its unset in the application!

      }
      if (this.updateCertificates.practicingCertificateFullPath) {
        // Practicing certificate has been added/updated so update the candidate profile
        console.log('-- RQ practicing certificate has been added/updated so update the candidate profile');

      }
    },

    // @TODO:
    // - should be able to leave application record as it is in terms of how it stores and retrieves the file
    // name and uses it in FileUpload component. Just need to store the full path in the candidate record then if we're
    // using this value for the file upload we split the path accordingly
    // - note that the uploaded file isnt appearing when the page is refreshed!!
    // **** CURRENTLY CHECKING THE DATA COMING INTO AND OUT OF THE FILE UPLOAD COMPONENT TO SEE WHY THE FILE NAME ISNT BEING DISPLAYED

    setExemptionCertificateFullPath(value) {
      console.log(`-- RQ setExemptionCertificateFullPath: ${value}`);
      this.updateCertificates.exemptionCertificateFullPath = value;
    },
    setPracticingCertificateFullPath(value) {
      console.log(`-- RQ setPracticingCertificateFullPath: ${value}`);
      this.updateCertificates.practicingCertificateFullPath = value;
    },
  },
};
</script>

