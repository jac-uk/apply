<template>
  <div>
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <h1 class="govuk-heading-xl">
        GDPR Statement
      </h1>

      <Checkbox
        id="consent"
        v-model="agreedToGDPR"
        required
      >
        [GDPR AGREEMENT STATEMENT]
      </Checkbox>

      <button
        class="govuk-button info-btn--eligibility-check--continue"
        :disabled="!agreedToGDPR"
      >
        Continue
      </button>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import Checkbox from '@/components/Form/Checkbox';

export default {
  components: {
    Checkbox,
  },
  extends: Form,
  data(){
    return {
      agreedToGDPR: false,
    };
  },
  computed: {
    vacancy () {
      return this.$store.state.vacancy.record;
    },
  },
  methods: {
    save () {
      this.validate();
      if (this.isValid()) {
        this.$router.push(`/apply/${this.vacancy.id}`);
      }
    },
  },
};
</script>
