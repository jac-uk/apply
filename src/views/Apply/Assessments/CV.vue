<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Curriculum vitae (CV)
        </h1>

        <div class="govuk-form-group">
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
import BackLink from '@/components/BackLink';
import uploadMixin from '@/mixins/uploadMixin';

export default {
  components: {
    BackLink,
  },
  mixins: [uploadMixin],
  data(){
    const defaults = {};
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
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
  },
  methods: {
    async save() {
      const files = Object.values(this.files);
      for (const file of files) {
        await this.upload(file);
      }
      this.application.progress.cv = true;
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
