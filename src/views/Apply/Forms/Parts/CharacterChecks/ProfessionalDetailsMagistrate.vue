<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        Professional details
      </h1>

      <ErrorSummary :errors="errors" />

      <RadioGroup
        id="magistrate"
        v-model="application.magistrate"
        label="Have you been a magistrate?"
        required
        hint=""
      >
        <RadioItem
          :value="true"
          label="Yes"
        >
          <div class="govuk-form-group">
            <DateInput
              id="magistrateStartDate"
              v-model="application.magistrateStartDate"
              :required="application.magistrate"
              label="From date"
              hint="For example, 12 11 2007"
            />
            <DateInput
              id="magistrateEndDate"
              v-model="application.magistrateEndDate"
              label="Until date"
              hint="For example, 11 6 2020. Leave blank if this is your present role."
              :min-date="application.magistrateStartDate"
            />
            <TextField
              id="magistrateLocation"
              v-model="application.magistrateLocation"
              :required="application.magistrate"
              label="Location"
            />
          </div>
        </RadioItem>
        <RadioItem
          :value="false"
          label="No"
        />
      </RadioGroup>

      <button
        class="govuk-button info-btn--professional-bodies--save-and-continue"
      >
        Save and continue
      </button>
    </div>
  </form>
</template>

<script>
import BackLink from '@/components/BackLink.vue';
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import TextField from '@/components/Form/TextField.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import DateInput from '@/components/Form/DateInput.vue';

export default {
  name: 'ProfessionalDetails',
  components: {
    BackLink,
    ErrorSummary,
    TextField,
    RadioGroup,
    RadioItem,
    DateInput,
  },
  extends: Form,
  data() {
    const defaults = {
      magistrate: null,
      magistrateStartDate: null,
      magistrateEndDate: null,
      magistrateLocation: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application,
    };
  },
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
  },
  mounted() {
    // back to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        if (this.application.magistrate === false) {
          this.application.magistrateStartDate = null;
          this.application.magistrateEndDate = null;
          this.application.magistrateLocation = null;
        }
        await this.$store.dispatch('application/save', this.application);

        if (this.vacancy.characterChecks && this.vacancy.characterChecks.HMRC) {
          this.$router.push({ name: 'candidate-form-tasks-characterChecks-HMRC' });
        } else {
          if ((this.vacancy.memberships && this.vacancy.memberships.length) && !this.vacancy.memberships.includes('none')) {
            this.$router.push({ name: 'candidate-form-tasks-characterChecks-other-professional-bodies' });
          } else {
            this.$router.push({ name: 'candidate-form-tasks-characterChecks-review' });
          }
        }
      }
    },
  },
};

</script>
