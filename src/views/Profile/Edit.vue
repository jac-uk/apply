<template>
  <div>
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-one-quarter">
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
              v-if="isEmailVerified"
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
          </ul>
        </nav>
      </div>

      <BackLink />

      <div class="govuk-!-padding-top-4 govuk-grid-column-three-quarters">
        <div
          v-if="personalDetails"
          class="govuk-grid-row"
        >
          <div class="govuk-grid-column-three-quarters">
            <ErrorSummary :errors="errors" />
            <h3 class="govuk-heading-l float-left">
              Your profile
            </h3>
            <!--
              <div class="text-right govuk-!-margin-bottom-4">
              <a
                class="govuk-button"
                style="cursor: pointer;"
                @click.prevent="save"
              >
                Save
              </a>
            </div>
            -->
          </div>

          <div class="govuk-grid-column-three-quarters">
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

            <div class="text-right govuk-!-margin-top-8 govuk-!-margin-bottom-4">
              <ActionButton
                class="govuk-button info-btn--character-information--save-and-continue"
                type="primary"
                :action="save"
              >
                Save and Continue
              </ActionButton>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateProfile } from 'firebase/auth';
import { httpsCallable } from '@firebase/functions';
import { auth, functions } from '@/firebase';
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import TextField from '@/components/Form/TextField.vue';
import DateInput from '@/components/Form/DateInput.vue';
import BackLink from '@/components/BackLink.vue';
import ActionButton from '@jac-uk/jac-kit/draftComponents/ActionButton.vue';

export default {
  name: 'ProfileEdit',
  components: {
    ErrorSummary,
    TextField,
    DateInput,
    BackLink,
    ActionButton,
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
    isEmailVerified() {
      return this.$store.getters['auth/isEmailVerified'];
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
      try {
        this.validate();
        if (this.isValid()) {
          const data = this.$store.getters['candidate/personalDetails']();

          // update displayName in authentication database
          const fullName = this.getFullName();
          if (fullName && this.$store.state.auth.currentUser?.displayName !== fullName) {
            await this.updateProfile({ displayName: fullName });
            await auth.currentUser.reload(); // reload to get new displayName
            const newUser = { ...auth.currentUser };
            newUser.displayName = fullName;
            await this.$store.dispatch('auth/setCurrentUser', newUser);
          }

          // Update email address
          if (this.personalDetails.email !== data.email) {
            // Update email in authentication database
            await this.updateEmail(data.email, this.personalDetails.email);
          }
          if (this.errors.length === 0) {

            // Update candidate details
            await this.$store.dispatch('candidate/savePersonalDetails', this.personalDetails);

            this.$router.push({ name: 'profile' });
          }
          else {
            this.scrollToTop();
          }
        }

      } catch (e) {
        // console.log('Error in save:');
        // console.log(e);
      }
    },
    async updateEmail(currentEmailAddress, newEmailAddress) {
      let isSuccess = false;
      try {
        const res = await httpsCallable(functions, 'updateEmailAddress')({
          currentEmailAddress,
          newEmailAddress,
        });
        const result = res.data;
        if (result.status === 'success') {
          isSuccess = true;
        } else {
          if (result.data.code === 'auth/email-already-exists') {
            this.errors = [{ id: 'email', message: 'Unable to update email at this time. Please contact the administrator.' }];
          } else if (result.data.code === 'auth/invalid-email') {
            this.errors = [{ id: 'email', message: result.data.message }];
          } else {
            this.errors = [{ id: 'email', message: 'Failed to update email address.' }];
          }
        }
      } catch (error) {
        this.errors = [{ id: 'email', message: 'Failed to perform action.' }];
      }

      return isSuccess;
    },
    getFullName() {
      const names = [];
      if (this.personalDetails.firstName) names.push(this.personalDetails.firstName);
      if (this.personalDetails.lastName) names.push(this.personalDetails.lastName);
      return names.join(' ');
    },
    async updateProfile({ displayName }) {
      try {
        await updateProfile(auth.currentUser, {
          displayName,
        });
      } catch (error) {
        // console.error(error);
      }
    },
    scrollToTop () {
      this.$el.scrollIntoView();
    },
  },
};
</script>

<style scoped>
.change-link {
  float: right;
}
</style>
