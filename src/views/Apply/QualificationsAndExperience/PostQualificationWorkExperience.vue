<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Career history - post qualification experience
        </h1>

        <p class="govuk-body-l">
          Starting with your most recent appointment and working back, provide details of your career to date, including all judicial and quasi-judicial appointments and any gaps in employment.
        </p>

        <div
          v-for="(experience, index) in experiences"
          :key="index"
          class="experience-container govuk-!-margin-top-8"
        >
          <Experience
            :row="experience"
            :index="index"
            :type="experience.type"
            :editing="editingIndex === index"
          />
          <div
            v-if="experience.type"
            class="govuk-!-margin-top-6"
            style="display: flex; justify-content: flex-start; gap: 20px;"
          >
            <button
              v-if="editingIndex === index"
              type="button"
              class="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
              @click="() => handleRowSave(index)"
            >
              Save
            </button>
            <button
              v-else
              type="button"
              class="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
              @click="() => handleRowEdit(index)"
            >
              Edit
            </button>
            <button
              type="button"
              class="govuk-button govuk-button--warning govuk-!-margin-bottom-0"
              @click="() => handleRowRemove(index)"
            >
              Remove
            </button>
          </div>
        </div>

        <div
          v-if="hasExperience"
          class="govuk-grid-row govuk-!-margin-left-0 govuk-!-margin-top-8"
        >
          <button
            type="button"
            class="govuk-button govuk-button--secondary"
            @click="handleRowAdd"
          >
            Add another
          </button>

          <h2 class="govuk-heading-m govuk-!-margin-top-8">
            {{ `You have indicated that you have ${totalJudicialDays} sitting days in total.` }}
          </h2>

          <TextareaInput
            v-if="totalJudicialDays < vacancy.pjeDays"
            id="experience-details"
            v-model="formData.experienceDetails"
            label="details"
            :hint="`As you have indicated you have less than ${vacancy.pjeDays} number of sitting days across all judicial and/or quasi-judicial appointments, please provide details of how you have acquired the necessary skills for this role in some other significant way.`"
            :label-hidden="true"
            required
          />
        </div>

        <button
          :disabled="!canSave(formId) || !hasExperience"
          class="govuk-button info-btn--post-qualification-work-experience--save-and-continue govuk-!-margin-top-8"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ApplyMixIn from '../ApplyMixIn';
import Experience from '@/components/RepeatableFields/Experience.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import BackLink from '@/components/BackLink.vue';

export default {
  name: 'PostQualificationWorkExperience',
  components: {
    TextareaInput,
    BackLink,
    Experience,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults =  {
      experience: null,
      employmentGaps: null,
      experienceDetails: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    const experiences = this.sortExperiences(this.getExperiences(formData));
    let editingIndex = null;
    if (experiences.length === 0) {
      experiences.push({});
      editingIndex = 0;
    }

    return {
      formId: 'postQualificationWorkExperience',
      formData: formData,
      experiences,
      editingIndex,
    };
  },
  computed: {
    hasExperience() {
      return (Array.isArray(this.formData.experience) && this.formData.experience.length > 0) || 
        (Array.isArray(this.formData.employmentGaps) && this.formData.employmentGaps.length > 0);
    },
    totalJudicialDays() {
      let total = 0;
      if (Array.isArray(this.formData.experience)) {
        this.formData.experience.forEach((experience) => {
          if (experience.judicialFunctions) {
            total += parseInt(experience.judicialFunctions.duration, 10);
          }
        });
      }
      return total;
    },
  },
  methods: {
    getExperiences(formData) {
      const res = [];
      if (Array.isArray(formData.experience)) {
        formData.experience.forEach((experience) => {
          experience.type = 'appointment';
          res.push(experience);
        });
      }
      if (Array.isArray(formData.employmentGaps)) {
        formData.employmentGaps.forEach((employmentGap) => {
          employmentGap.type = 'gap';
          res.push(employmentGap);
        });
      }
      return res;
    },
    sortExperiences(experiences) {
      return experiences.sort((a, b) => {
        if (a.isOngoing && !b.isOngoing) {
          return -1;
        }
        if (!a.isOngoing && b.isOngoing) {
          return 1;
        }
        if (a.isOngoing && b.isOngoing) {
          return a.startDate > b.startDate ? -1 : 1;
        }
        if (a.endDate && b.endDate) {
          return a.endDate > b.endDate ? -1 : 1;
        }
        return 0;
      }); 
    },
    syncFormData() {
      this.experiences = this.sortExperiences(this.experiences);
      this.formData.experience = this.experiences.filter(experience => experience.type === 'appointment');
      this.formData.employmentGaps = this.experiences.filter(experience => experience.type === 'gap');
      this.$store.dispatch('application/save', this.formData);
    },
    handleRowAdd() {
      this.experiences.push({});
      this.editingIndex = this.experiences.length - 1;
    },
    handleRowEdit(index) {
      this.editingIndex = index;
    },
    handleRowSave() {
      this.validate();
      if (this.isValid()) {
        this.syncFormData();
        this.resetEditing();
      }
    },
    handleRowRemove(index) {
      this.experiences.splice(index, 1);
      this.syncFormData();
      this.resetEditing();
      if (this.experiences.length === 0) {
        this.experiences.push({});
        this.editingIndex = 0;
      }
    },
    resetEditing() {
      this.editingIndex = null;
    },
  },
};
</script>

<style scoped>
.experience-container {
  padding: 30px;
  gap: 40px;
  border: 1px solid #c5c6c8;
}
</style>
