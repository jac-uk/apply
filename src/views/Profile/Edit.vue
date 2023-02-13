<template>
  <div>
    <div class="govuk-grid-row">
      <div
        v-if="isSignedIn"
        class="govuk-grid-column-one-quarter"
      >
        <nav
          class="moj-side-navigation"
          aria-label="Side navigation"
        >
          <ul class="moj-side-navigation__list">
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-vacancies--vacancies"
                :aria-current="$route.name === 'vacancies' ? 'active' : null"
                :to="{ name: 'vacancies' }"
              >
                Vacancies
              </RouterLink>
            </li>
            <li
              class="moj-side-navigation__item"
              :class="$route.name === 'profile' || $route.name === 'profile-edit' ? 'moj-side-navigation__item--active' : null"
            >
              <RouterLink
                class="govuk-link"
                :to="{ name: 'profile' }"
              >
                Your profile
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-vacancies--applications"
                :to="{ name: 'applications' }"
              >
                Applications
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-vacancies--qualifying-tests"
                :to="{ name: 'qualifying-tests' }"
              >
                Online tests
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="govuk-!-padding-top-4"
        :class="{ 'govuk-grid-column-three-quarters': isSignedIn, 'govuk-grid-column-full': !isSignedIn }"
      >
        <div
          v-if="personalDetails"
          class="govuk-grid-row"
        >
          <div class="govuk-grid-column-three-quarters">
            <div>
              <h3
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Your profile
              </h3>
              <a
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block; cursor: pointer;"
                @click.prevent="save"
              >
                Save
              </a>
            </div>

            <ErrorSummary :errors="errors" />

            <TextField
              id="title"
              v-model="personalDetails.title"
              label="Title"
              required
            />

            <TextField
              id="firstName"
              v-model="personalDetails.firstName"
              label="First name"
              required
            />

            <TextField
              id="middleNames"
              v-model="personalDetails.middleNames"
              label="Middle name(s)"
            />

            <TextField
              id="lastName"
              v-model="personalDetails.lastName"
              label="Last name"
              required
            />

            <TextField
              id="suffix"
              v-model="personalDetails.suffix"
              label="Suffix"
            />

            <TextField
              id="previousNames"
              v-model="personalDetails.previousNames"
              label="Previous known name(s)"
              hint="Have you ever been known by any other name? For example, life events which may have changed your name such as marriages, divorces, hyphenated names."
            />

            <TextField
              id="professionalName"
              v-model="personalDetails.professionalName"
              label="Professional name"
            />

            <DateInput
              id="date-of-birth"
              v-model="personalDetails.dateOfBirth"
              required
              :min-date="new Date('1/01/1900')"
              :max-date="new Date()"
              label="Date of birth"
              hint="For example, 27 3 1964"
            />

            <TextField
              id="national-insurance-number"
              v-model="personalDetails.nationalInsuranceNumber"
              label="National Insurance number"
              hint="It’s on your National Insurance card, payslip or P60. For example, ‘QQ 12 34 56 C’."
              type="nino"
              required
            />

            <TextField
              id="email"
              v-model="personalDetails.email"
              label="Email address"
              type="email"
              required
            />

            <Password
              id="password"
              v-model="password"
              label="Password"
              :hint="`For security reasons it should be ${minPasswordLength} or more characters long, contain a mix of upper- and lower-case letters, at least one digit and special character (like £, #, @, !, %, -, &, *).`"
              type="new-password"
              :min-length="minPasswordLength"
              required
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';
import Password from '@/components/Form/Password';

export default {
  name: 'ProfileEdit',
  components: {
    ErrorSummary,
    TextField,
    DateInput,
    Password,
  },
  extends: Form,
  data() {
    return {
      personalDetails: {},
      minPasswordLength: 12,
      password: '',
    };
  },
  computed: {
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
  },
  async mounted() {
    if (!this.$store.getters['candidate/personalDetails']()) {
      await this.$store.dispatch('candidate/bind');
    }
    const data = this.$store.getters['candidate/personalDetails']();
    const defaults = {
      title: '',
      firstName: null,
      lastName: null,
      fullName: null,
      email: null,
      phone: null,
      dateOfBirth: null,
      nationalInsuranceNumber: null,
    };
    const personalDetails = { ...defaults, ...data };
    this.personalDetails = personalDetails;
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        await this.$store.dispatch('candidate/savePersonalDetails', this.personalDetails);
        // TODO: update email password
        this.$router.push({ name: 'profile' });
      }
    },
  },
};
</script>

<style scoped>
.change-link {
  float: right;
}
</style>
