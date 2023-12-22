<template>
  <form
    ref="formRef"
    @submit.prevent="save"
  >
    <div class="govuk-grid-column-two-thirds">
      <BackLink />

      <h1 class="govuk-heading-xl">
        HMRC
      </h1>

      <ErrorSummary :errors="errors" />

      <RadioGroup
        id="hasVATnumbers"
        v-model="personalDetails.hasVATNumbers"
        required
        label="Do you have a VAT registration number?"
        hint="All personal, partnership, company and sole trader VAT registered number(s) that you have a personal responsibility for, whether they relate to the practice of law or not, will be required."
      >
        <RadioItem
          :value="true"
          label="Yes"
        >
          <RepeatableFields
            v-model="personalDetails.VATNumbers"
            required
            :component="repeatableFields.VATNumbers"
          />
        </RadioItem>
        <RadioItem
          :value="false"
          label="No"
        />
      </RadioGroup>

      <button
        class="govuk-button info-btn--hmrc--save-and-continue"
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
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import RepeatableFields from '@/components/RepeatableFields.vue';
import VATNumbers from '@/components/RepeatableFields/VATNumbers.vue';

export default {
  name: 'Hmrc',
  components: {
    BackLink,
    ErrorSummary,
    RadioGroup,
    RadioItem,
    RepeatableFields,
  },
  extends: Form,
  data() {
    const defaults = {
      hasVATNumbers: null,
      VATNumbers: [],
    };
    const data = this.$store.getters['candidate/personalDetails']();
    const personalDetails = { ...defaults, ...data };
    const application = this.$store.getters['application/data']();
    return {
      personalDetails,
      application,
      repeatableFields: {
        VATNumbers,
      },
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
        if (this.personalDetails.hasVATNumbers === false) {
          this.personalDetails.VATNumbers = null;
        }
        this.application.personalDetails = this.personalDetails;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/savePersonalDetails', this.personalDetails);
        if ((this.vacancy.memberships && this.vacancy.memberships.length && !this.vacancy.memberships.includes('none'))) {
          this.$router.push({ name: 'candidate-form-tasks-characterChecks-other-professional-bodies' });
        } else {
          this.$router.push({ name: 'candidate-form-tasks-characterChecks-review' });
        }
      }
    },
  },
};

</script>
