<template>
  <div>
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <h1 class="govuk-heading-xl govuk-!-margin-bottom-2">
        Sharing information
      </h1>

      <p
        class="govuk-body"
      >
        We sometimes need to share the personal information we process with the individual themselves and also with other organizations. Where this is necessary we will comply with all aspects of the data protection laws. <br>
        <br>
        The organizations we share some aspects of your personal information with may include: <br>
        <br>
        - The judiciary (for statutory consultation) <br>
        - Independent assessors (the individuals nominated by you) <br>
        - HMRC (for tax and financial information) <br>
        - ACRO Criminal Records Office (for criminal record checks) <br>
        - Professional bodies (including any relevant regulatory bodies) (for conduct verification) <br>
        - Judicial Office, HMCTS, the Ministry of Justice and Judicial College (for purposes relating to the appointment of judges) <br>
        - Welsh Government (for devolved appointments) <br>
        - Judicial Appointments and Conduct Ombudsman (only if you make a complaint to them)<br>
      </p>

      <Checkbox
        id="consent"
        v-model="agreedToGDPR"
        required
      >
        Please confirm you are content that we may share your data in this way
      </Checkbox>

      <button
        class="govuk-button info-btn--eligibility-check--continue"
        :disabled="!agreedToGDPR"
      >
        Agree and continue
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
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
    ContinueLink() {
      return this.isSignedIn ? { name: 'GDPR' } : { name: 'sign-in' };
    },
  },
  methods: {
    save () {
      this.validate();
      if (this.isValid()) {
        this.$router.push(`/apply/${this.vacancy.id}`)
          .catch(() => {}); //capture error for redirect to sign-in
      }
    },
  },
};
</script>
