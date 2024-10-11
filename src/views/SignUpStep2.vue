<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form
        ref="formRef"
        @submit.prevent="onSubmit"
      >
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">
            Create an account - Step 2
          </h1>

          <div class="govuk-body">
            Please complete registration below to fully activate your account.
          </div>

          <ErrorSummary :errors="errors" />
          <WarningSummary :warning-object="warningObject" />

          <TextField
            id="title"
            v-model="formData.title"
            label="Title"
            type="text"
            required
          />

          <TextField
            id="firstName"
            v-model="formData.firstName"
            label="First name"
            type="text"
            required
          />

          <TextField
            id="lastName"
            v-model="formData.lastName"
            label="Last name"
            type="text"
            required
          />

          <!-- <TextField
            id="email"
            v-model="formData.email"
            label="Email address"
            type="email"
            warn-cps-email-msg="Use of a CPS device causes multiple known issues with the JAC Digital Platform due to the device firewall settings - it is strongly recommended that applicants use a personal device to log on/submit an application."
            :pattern="{
              match: /^((?!@judicialappointments.gov.uk\s*$).)*$/,
              message: 'You cannot sign up as a candidate using a @judicialappointments.gov.uk email address',
            }"
            required
          />

          <Password
            id="password"
            v-model="formData.password"
            label="Password"
            :hint="`For security reasons it should be ${minPasswordLength} or more characters long, contain a mix of upper- and lower-case letters, at least one digit and special character (like £, #, @, !, %, -, &, *).`"
            type="new-password"
            :min-length="minPasswordLength"
            :is-new-pwd="true"
            required
          /> -->

          <DateInput
            id="date-of-birth"
            v-model="formData.dateOfBirth"
            :min-date="new Date('1/01/1900')"
            :max-date="new Date()"
            label="Date of birth"
            hint="For example, 27 3 1964."
            required
          />

          <TextField
            id="national-insurance-number"
            v-model="formData.nationalInsuranceNumber"
            label="National Insurance number"
            hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
            type="nino"
          />

          <button
            type="submit"
            class="govuk-button"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import WarningSummary from '@/components/Form/WarningSummary.vue';
import TextField from '@/components/Form/TextField.vue';
import DateInput from '@/components/Form/DateInput.vue';
import { saveCandidate, makeFullName } from '@/services/candidateService';

export default {
  name: 'SignUpStep2',
  components: {
    ErrorSummary,
    WarningSummary,
    TextField,
    //Password,
    DateInput,
  },
  extends: Form,
  data () {
    return {
      //minPasswordLength: 12,

      // @TODO: REVERT
      // formData: {},
      formData: {
        title: 'mr',
        firstName: 'test',
        lastName: 'tester',
        //email: 'omar.jebari+17@gmail.com',
        dateOfBirth: new Date('10/10/1988'),
        nationalInsuranceNumber: 'NN810757D',
      },

      fullName: null,
      //email: null,
    };
  },
  computed: {
    // exerciseId () {
    //   return this.$store.state.vacancy.record && this.$store.state.vacancy.record.id;
    // },
    // nextPage() {
    //   return this.$route.query.nextPage;
    // },
    currentUser() {
      return this.$store.getters['auth/currentUser'];
    },
  },
  mounted() {
    //this.email = this.$route.query.email;
  },
  methods: {
    // @TODO: this should be handled by form
    scrollToTop () {
      this.$el.scrollIntoView();
    },
    async onSubmit() {
      await this.validate();
      if (this.isValid()) {
        try {
          await this.completeSignUp();
        } catch (error) {
          this.errors.push({ message: error.message });
          this.scrollToTop();
        }
      }
      else {
        this.scrollToTop();
      }
    },
    async completeSignUp() {
      try {

        console.log(`email: ${this.currentUser.email}`);

        await saveCandidate({
          title: this.formData.title,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          fullName: makeFullName(this.formData.firstName, this.formData.lastName),
          email: this.currentUser.email,
          dateOfBirth: this.formData.dateOfBirth,
          nationalInsuranceNumber: this.formData.nationalInsuranceNumber || null, // prevent undefined being saved
        });

        this.$router.replace({ name: 'vacancies' });

      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
