<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <BackLink />
      <h1 class="govuk-heading-xl">
        Panel Conflicts
      </h1>

      <p class="govuk-body-l">
        Are you related to, or known to any of the following panellists? If you are in any doubt then please select 'Yes' in the list below:
      </p>

      <form
        ref="formRef"
        @submit.prevent="save"
      >
        <ErrorSummary
          :errors="errors"
        />
        <RadioGroup
          v-for="(panellist , index) in formData.panelConflicts"
          :id="`panellist-name-${index}`"
          :key="index"
          v-model="panellist.hasRelationship"
          required
          :label="panellist.name"
        >
          <RadioItem
            label="Yes"
            :value="true"
          >
            <TextareaInput
              id="relationship"
              v-model="panellist.details"
              label="Please provide details of your relationship."
              class="govuk-!-width-two-thirds"
            />
          </RadioItem>
          <RadioItem
            label="No"
            :value="false"
          />
        </RadioGroup>

        <button
          class="govuk-button info-btn--panel-conflicts--save-and-continue"
        >
          Save and continue
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { APPLICATION_FORM_PARTS } from '@/helpers/constants';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
export default {
  name: 'CandidateFormPanelConflicts',
  components: {
    RadioGroup,
    RadioItem,
    TextareaInput,
  },
  mixins: [CandidateFormsMixIn],
  data() {
    const panellists = this.$store.state.candidateForm.record.panellists;
    const defaults = {};
    defaults[APPLICATION_FORM_PARTS.PANEL_CONFLICTS] = panellists.map(panellist => ({
      id: panellist.id,
      name: panellist.name,
      hasRelationship: null,
      details: '',
    }));
    const formData = { ...defaults };
    // get data from response and populate formdata
    return {
      formData,
    };
  },
  created() {
    this.setupPart(APPLICATION_FORM_PARTS.PANEL_CONFLICTS, true);
  },
};
</script>
