export default {
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    candidateForm() {

      return this.$store.state.candidateForm.record;

      // return {
      //   exercise: { id: '4TZAoQDjKPHJil0wdyOq' },
      //   task: 'candidateAvailability',
      //   createdAt: null,
      //   lastUpdated: null,
      //   openDate: '2023-11-16',
      //   closeDate: '2024-12-31',
      //   candidateIds: ['123'],
      //   parts: [
      //     'candidateAvailability',
      //     'panellistConflicts',
      //     'commissionerConflicts',
      //     'characterChecks',
      //   ],
      //   panellists: [
      //     { id: 'tlg9eeceWesWGGeU4t04', fullName: 'Jane Jones' },
      //   ]
      // };
    },
    candidateFormResponse() {
        return this.$store.state.candidateFormResponse.record;

      // @TODO: Search the candidate form responses for the candidate's one
      // return {
      //   formId: 123,
      //   status: 'created',
      //   statusLog: {},
      //   progress: {
      //     candidateAvailability: true,
      //   },
      //   candidateAvailability: {},
      //   panellistConflicts: {},
      // };
    },
  },
  methods: {
    async save(currentPart) {
      // Set the part's progress to true
      const nextPart = this.getNextPart(currentPart);

      // @TODO: Validate that the form has been completed before saving
      const formData = { ...this.candidateFormResponse };
      formData.progress[currentPart] = true;

      // Update progress
      this.$store.dispatch('candidateFormResponse/update', formData);

      // Router call to the next part otherwise go to the review page
      if (nextPart) {
        this.$router.push({ name: `candidate-form-tasks-${nextPart}` });
      }
      else {
        this.$router.push({ name: 'candidate-form-review' });
      }
    },
    getNextPart(currentPart) {
      let nextItem = null;
      const index = this.candidateForm.parts.indexOf(currentPart);
      if(index >= 0 && index < this.candidateForm.parts.length - 1) {
        nextItem = this.candidateForm.parts[index + 1];
      }
      return nextItem;
    },
  },
  async created() {
    const formId = this.$route.params.formId;
    this.$store.dispatch('candidateForm/bind', formId);
    this.$store.dispatch('candidateFormResponse/bind', formId);
  },
};
