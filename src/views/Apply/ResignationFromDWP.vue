<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Resignation from the Department for Work and Pensions (DWP)
        </h1>

        <ErrorSummary :errors="errors" />

        <RadioGroup
          id="working-at-dwp"
          v-model="formData.resignationFromDWP.workingAtDWP"
          required
          label="Do you currently work at the Department for Work and Pensions (DWP)?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <Checkbox
          v-if="formData.resignationFromDWP.workingAtDWP"
          id="resign-from-dwp"
          v-model="formData.resignationFromDWP.agreedToResign"
        >
          <span>
            I will resign my post at DWP if recommended for this post.
          </span>
        </Checkbox>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--personal-details--save-and-continue"
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
import ApplyMixIn from './ApplyMixIn';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import Checkbox from '@/components/Form/Checkbox.vue';
import BackLink from '@/components/BackLink.vue';

export default {
  name: 'ResignationFromDWP',
  components: {
    BackLink,
    RadioGroup,
    RadioItem,
    Checkbox,
    ErrorSummary,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data() {
    const defaults = {
      resignationFromDWP: {
        workingAtDWP: null,
        agreedToResign: null,
      },
      progress: {},
    };
    const formData = { ...defaults };
    const data = this.$store.getters['application/data'](defaults);
    if (data.resignationFromDWP) {
      formData.resignationFromDWP = data.resignationFromDWP;
    }
    if (data.progress) {
      formData.progress = data.progress;
    }
    return {
      formId: 'resignationFromDWP',
      formData,
    };
  },
  methods: {
    isFormValid() {
      if (this.formData.resignationFromDWP.workingAtDWP === true) {
        if (!this.formData.resignationFromDWP.agreedToResign) {
          this.errors.push({ id: 'error', message: 'Please check all boxes to continue' });
        }
        return this.formData.resignationFromDWP.agreedToResign;
      } else if (this.formData.resignationFromDWP.workingAtDWP === false) {
        return true;
      }
      return false;
    },
    async save() {
      this.validate();
      if (this.isValid() && this.isFormValid()) {
        this.formData.progress[this.formId] = true;
        await this.$store.dispatch('application/save', this.formData);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
