<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Post qualification career history and experience
        </h1>

        <p class="govuk-body-l">
          Starting with your most recent appointment and working back, provide details of your career to date, including all judicial and quasi-judicial appointments and any gaps in employment.
        </p>

        <div
          v-for="(experience, index) in formData.experience"
          :key="index"
          class="experience-container govuk-!-margin-top-8"
        >
          <Experience
            :row="experience"
            :index="index"
            type="appointment"
            :editing="editingType === 'appointment' && editingIndex === index"
          />
          <div
            class="govuk-!-margin-top-6"
            style="display: flex; justify-content: flex-end; gap: 20px;"
          >
            <button
              v-if="editingType === 'appointment' && editingIndex === index"
              type="button"
              class="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
              @click="() => handleRowSave('appointment', index)"
            >
              Save
            </button>
            <button
              v-else
              type="button"
              class="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
              @click="() => handleRowEdit('appointment', index)"
            >
              Edit
            </button>
            <button
              type="button"
              class="govuk-button govuk-button--warning govuk-!-margin-bottom-0"
              @click="() => handleRowRemove('appointment', index)"
            >
              Remove
            </button>
          </div>
        </div>

        <div
          v-for="(experience, index) in formData.employmentGaps"
          :key="index"
          class="experience-container govuk-!-margin-top-8"
        >
          <Experience
            :row="experience"
            :index="index"
            type="gap"
            :editing="editingType === 'gap' && editingIndex === index"
          />
          <div
            class="govuk-!-margin-top-6"
            style="display: flex; justify-content: flex-end; gap: 20px;"
          >
            <button
              v-if="editingType === 'gap' && editingIndex === index"
              type="button"
              class="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
              @click="() => handleRowSave('gap', index)"
            >
              Save
            </button>
            <button
              v-else
              type="button"
              class="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
              @click="() => handleRowEdit('gap', index)"
            >
              Edit
            </button>
            <button
              type="button"
              class="govuk-button govuk-button--warning govuk-!-margin-bottom-0"
              @click="() => handleRowRemove('gap', index)"
            >
              Remove
            </button>
          </div>
        </div>

        <div
          v-if="newExperience"
          class="experience-container govuk-!-margin-top-8"
        >
          <Experience
            :row="newExperience"
            :index="0"
            :editing="true"
          />
          <div
            class="govuk-!-margin-top-6"
            style="display: flex; justify-content: flex-end; gap: 20px;"
          >
            <button
              v-if="newExperience.type"
              type="button"
              class="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
              @click="handleNewRowSave"
            >
              Save
            </button>
            <button
              type="button"
              class="govuk-button govuk-button--warning govuk-!-margin-bottom-0"
              @click="() => handleRowRemove('appointment', index)"
            >
              Remove
            </button>
          </div>
        </div>

        <div
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

        <h2 class="govuk-heading-m govuk-!-margin-top-8">
          {{ `Your total sitting days of judicial roles are ${totalJudicialDays} days.` }}
        </h2>

        <TextareaInput
          v-if="totalJudicialDays < vacancy.pjeDays"
          id="experience-details"
          v-model="formData.experienceDetails"
          :hint="`As you have indicated you have less than ${vacancy.pjeDays} number of sitting days across all judicial and/or quasi-judicial appointments, please provide details of how you have acquired the necessary skills for this role in some other significant way.`"
        />

        <button
          :disabled="!canSave(formId)"
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
    return {
      formId: 'postQualificationWorkExperience',
      formData: formData,
      newExperience: null,
      editingType: null,
      editingIndex: null,
    };
  },
  computed: {
    
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
    handleRowAdd() {
      this.newExperience = {};
    },
    handleRowEdit(type, index) {
      this.editingType = type;
      this.editingIndex = index;
    },
    handleRowSave() {
      this.validate();
      if (this.isValid()) {
        this.$store.dispatch('application/save', this.formData);
        this.resetEditing();
      }
    },
    handleNewRowSave() {
      this.validate();
      if (this.isValid()) {
        if (this.newExperience.type === 'appointment') {
          if (!Array.isArray(this.formData.experience)) {
            this.formData.experience = [];
          }
          this.formData.experience.push(this.newExperience);
        } else if (this.newExperience.type === 'gap') {
          if (!Array.isArray(this.formData.employmentGaps)) {
            this.formData.employmentGaps = [];
          }
          this.formData.employmentGaps.push(this.newExperience);
        }
        this.$store.dispatch('application/save', this.formData);
        this.handleNewRowRemove();
      }
    },
    handleRowRemove(type, index) {
      if (type === 'appointment') {
        this.formData.experience.splice(index, 1);
      } else if (type === 'gap') {
        this.formData.employmentGaps.splice(index, 1);
      }
      this.$store.dispatch('application/save', this.formData);
      this.resetEditing();
    },
    handleNewRowRemove() {
      this.newExperience = null;
    },
    resetEditing() {
      this.editingType = null;
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
