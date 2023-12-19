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
        We sometimes need to share the personal information we process with the individual themselves and also with other organisations. Where this is necessary we will comply with all aspects of the data protection laws. <br>
        <br>
        The organisations we share some aspects of your personal information with may include: <br>
        <ul class="govuk-list govuk-list--bullet">
          <li>
            The judiciary (for statutory consultation) <br>
          </li>
          <li>
            Independent assessors (the individuals nominated by you) <br>
          </li>
          <li>
            HMRC (for tax and financial information) <br>
          </li>
          <li>
            ACRO Criminal Records Office (for criminal record checks) <br>
          </li>
          <li>
            Professional bodies (including any relevant regulatory bodies) (for conduct verification) <br>
          </li>
          <li>
            Judicial Office, HMCTS, the Ministry of Justice and Judicial College (for purposes relating to the appointment of judges) <br>
          </li>
          <li>
            Welsh Government (for devolved appointments) <br>
          </li>
          <li>
            Judicial Appointments and Conduct Ombudsman (only if you make a complaint to them)<br>
          </li>
        </ul>
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
import Form from '@/components/Form/Form.vue';
import Checkbox from '@/components/Form/Checkbox.vue';

export default {
  name: 'GDPRCheck',
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
