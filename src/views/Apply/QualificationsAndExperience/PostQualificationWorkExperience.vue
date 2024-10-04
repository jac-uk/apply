<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />

        <template v-if="isApplicationVersionGreaterThan2">
          <h1 class="govuk-heading-xl">
            Career history - post qualification experience
          </h1>

          <p class="govuk-body-l">
            Starting with your most recent appointment and working back, provide details of your career to date, including all judicial and quasi-judicial appointments and any gaps in employment.
          </p>

          <form
            @submit="console.log('submitting')"
          >
            <div
              v-for="(experience, index) in experiences"
              :key="index"
              class="experience-container govuk-!-margin-top-8"
            >
              <ExperienceV2
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
            </div>
          </form>

          <button
            :disabled="!canSave(formId)"
            class="govuk-button info-btn--post-qualification-work-experience--save-and-continue govuk-!-margin-top-8"
          >
            Save and continue
          </button>
        </template>
        <template v-else>
          <h1 class="govuk-heading-xl">
            Post-qualification experience
          </h1>

          <p class="govuk-body-l">
            Provide details of your career to date including any judicial appointments or quasi-judicial appointments
          </p>

          <RepeatableFields
            v-model="formData.experience"
            :component="repeatableFields.Experience"
          />

          <button
            :disabled="!canSave(formId)"
            class="govuk-button  info-btn--post-qualification-work-experience--save-and-continue"
          >
            Save and continue
          </button>
        </template>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ApplyMixIn from '../ApplyMixIn';
import RepeatableFields from '@/components/RepeatableFields.vue';
import Experience from '@/components/RepeatableFields/Experience.vue';
import ExperienceV2 from '@/components/RepeatableFields/ExperienceV2.vue';
import BackLink from '@/components/BackLink.vue';
import { getApplicationTotalJudicialDays } from '@/helpers/exerciseHelper';

export default {
  name: 'PostQualificationWorkExperience',
  components: {
    RepeatableFields,
    BackLink,
    ExperienceV2,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data() {
    const defaults =  {
      experience: null,
      employmentGaps: null,
      experienceDetails: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };

    // check if candidate has filled post qualification experience before
    const candidatePostQualificationExperience = this.$store.getters['candidate/postQualificationExperience']();
    if (!formData.experience && candidatePostQualificationExperience?.experience) {
      formData.experience = candidatePostQualificationExperience.experience;
    }
    if (!formData.employmentGaps && candidatePostQualificationExperience?.employmentGaps) {
      formData.employmentGaps = candidatePostQualificationExperience.employmentGaps;
    }

    const experiences = this.sortExperiences(this.getExperiences(formData));
    let editingIndex = null;
    if (experiences.length === 0) {
      experiences.push({});
      editingIndex = 0;
    }

    return {
      formId: 'postQualificationWorkExperience',
      formData,
      experiences,
      editingIndex,
      repeatableFields: {
        Experience,
      },
    };
  },
  computed: {
    hasExperience() {
      return (Array.isArray(this.formData.experience) && this.formData.experience.length > 0) ||
        (Array.isArray(this.formData.employmentGaps) && this.formData.employmentGaps.length > 0);
    },
    totalJudicialDays() {
      return getApplicationTotalJudicialDays(this.formData);
    },
  },
  methods: {
    getExperiences(formData) {
      const res = [];
      // add type to experience to differentiate between experience and employmentGaps
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
      this.formData.experience = this.experiences
        .filter(experience => experience.type === 'appointment')
        .map((experience) => {
          const res = { ...experience };
          delete res.type; // remove type from experience
          return res;
        });
      this.formData.employmentGaps = this.experiences
        .filter(experience => experience.type === 'gap')
        .map((experience) => {
          const res = { ...experience };
          delete res.type; // remove type from employmentGaps
          return res;
        });
      this.$store.dispatch('application/save', this.formData);
      this.$store.dispatch('candidate/savePostQualificationExperience', {
        experience: this.formData.experience,
        employmentGaps: this.formData.employmentGaps,
      });
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
    async save() {
      if (!this.hasExperience) {
        this.validate( { target: { value: '' } } );
        return;
      }
      if (this.hasExperience) {
        this.validate();
      }
      if (this.isValid() && this.formId) {
        if (this.isApplicationVersionGreaterThan2) {
          if (this.totalJudicialDays < this.vacancy.pjeDays) {
            // go to `post qualification work experience details` page if pjeDays is required and totalJudicialDays is less than pjeDays
            this.$router.push({ name: 'post-qualification-work-experience-details' });
          } else {
            this.formData.progress[this.formId] = true;
            this.syncFormData();
            this.$router.push({ name: 'task-list' });
          }
        } else {
          this.formData.progress[this.formId] = true;
          await this.$store.dispatch('application/save', this.formData);
          this.$router.push({ name: 'task-list' });
        }
      }
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
