import { CANDIDATE_FORM_RESPONSE_STATUS } from '@/helpers/constants';
export default {
  data() {
    return {
      part: '',
      useFormData: false,
      formData: {},
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record ? this.$store.state.vacancy.record : {};
    },
    application() {
      return this.$store.state.application.record;
    },
    vacancyId() {
      return this.vacancy.id;
    },
    formId() {
      return this.$route.params.formId;
    },
    candidateForm() {
      return this.$store.state.candidateForm.record ? this.$store.state.candidateForm.record : {};
    },
    formType() {
      if (!this.candidateForm) return '';
      if (!this.candidateForm.task) return '';
      return this.candidateForm.task.type;
    },
    parts() {
      if (!this.candidateForm) return [];
      if (!this.candidateForm.parts) return [];
      return this.candidateForm.parts;
    },
    areAllPartsDone() {
      let allDone = true;
      for (let i = 0, len = this.parts.length; i < len; ++i) {
        if (!this.isDone(this.parts[i])) allDone = false;
      }
      return allDone;
    },
    candidateFormResponse() {
      return this.$store.state.candidateFormResponse.record ? this.$store.state.candidateFormResponse.record : {};
    },
    isFormCompleted() {
      if (!this.candidateFormResponse) return false;
      return this.candidateFormResponse.status === CANDIDATE_FORM_RESPONSE_STATUS.COMPLETED;
    },
  },
  methods: {
    isDone(partRef) {
      if (!this.candidateFormResponse) return false;
      if (!this.candidateFormResponse.progress) return false;
      return this.candidateFormResponse.progress[partRef];
    },
    setupPart(part, useFormData) {
      this.part = part;
      this.useFormData = useFormData;
      if (useFormData) {
        const responseData = this.$store.getters['candidateFormResponse/data']();
        if (responseData[part]) {
          this.formData = { ...responseData[part] };
        }
      }
    },
    async save() {
      await this.savePart(true);
    },  
    async savePart(isComplete) {
      // @TODO: Validate that the form has been completed before saving
      const saveData = {};
      if (this.useFormData) saveData[this.part] = { ...this.formData };
      saveData[`progress.${this.part}`] = isComplete;
      await this.$store.dispatch('candidateFormResponse/update', saveData);
      this.$router.push({ name: 'candidate-form-task-list' });
    },
    reviewForm() {
      this.$router.push({ name: 'candidate-form-review' });
    },
    async submitForm() {
      if (this.areAllPartsDone) {
        await this.$store.dispatch('candidateFormResponse/submit');
        this.$router.push({ name: 'candidate-form-confirmation' });
      }
    },
  },
};
