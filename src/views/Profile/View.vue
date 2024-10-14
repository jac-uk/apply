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
              :class="$route.name === 'profile' ? 'moj-side-navigation__item--active' : null"
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

      <div class="govuk-!-padding-top-4 govuk-grid-column-three-quarters">
        <div
          v-if="personalDetails"
          class="govuk-grid-row"
        >
          <div class="govuk-grid-column-three-quarters">
            <div
              v-if="isSignedIn && !isEmailVerified"
              class="govuk-notification-banner"
              role="region"
              aria-labelledby="govuk-notification-banner-title"
              data-module="govuk-notification-banner"
            >
              <div class="govuk-notification-banner__header">
                <h2
                  id="govuk-notification-banner-title"
                  class="govuk-notification-banner__title"
                >
                  Important
                </h2>
              </div>
              <div class="govuk-notification-banner__content">
                <p class="govuk-notification-banner__heading">
                  You must verify your email to complete registration!<br>
                  Click
                  <RouterLink
                    class="govuk-notification-banner__link"
                    :to="{ name: 'verify-email-request' }"
                  >
                    here
                  </RouterLink> for more information.
                </p>
              </div>
            </div>

            <div
              v-else-if="isSignedIn && !hasCompletedSignup"
              class="govuk-notification-banner"
              role="region"
              aria-labelledby="govuk-notification-banner-title"
              data-module="govuk-notification-banner"
            >
              <div class="govuk-notification-banner__header">
                <h2
                  id="govuk-notification-banner-title"
                  class="govuk-notification-banner__title"
                >
                  Important
                </h2>
              </div>
              <div class="govuk-notification-banner__content">
                <p class="govuk-notification-banner__heading">
                  You must fill in the fields below to complete registration!
                </p>
              </div>
            </div>

            <h3 class="float-left govuk-heading-l">
              Your profile
            </h3>

            <!-- style="display:inline-block;" -->
            <div class="float-right">
              <RouterLink
                class="govuk-link govuk-body-m"
                :to="{ name: 'profile-edit' }"
              >
                Edit
              </RouterLink>
            </div>

            <dl class="govuk-summary-list">
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Title
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.title }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  First name
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.firstName }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Middle name(s)
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.middleNames }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Last name
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.lastName }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Suffix
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.suffix }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Previous known name(s)
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.previousNames }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Professional name
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.professionalName }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Date of birth
                </dt>
                <dd class="govuk-summary-list__value">
                  <span v-if="personalDetails.dateOfBirth">
                    {{ $filters.formatDate(personalDetails.dateOfBirth) }}
                  </span>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  National Insurance number
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.nationalInsuranceNumber }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Email
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.email }}
                </dd>
              </div>
            </dl>

            <dl class="govuk-summary-list">
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Password
                </dt>
                <dd class="govuk-summary-list__value">
                  ********
                  <RouterLink
                    class="govuk-link govuk-body-m float-right"
                    style="display:inline-block;"
                    :to="{ name: 'profile-password-edit' }"
                  >
                    Edit
                  </RouterLink>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <Modal
      ref="modalRef"
      button-text="OK"
      :cancelable="false"
      title="Change of email address"
      message="Your email address has been changed. We have sent an email verification link to your inbox, so please click on that link then sign in with your new email address."
      @confirmed="signOut"
    />
  </div>
</template>

<script>
import { auth } from '@/firebase';
import Modal from '@/components/Page/Modal.vue';

export default {
  name: 'Profile',
  components: {
    Modal,
  },
  data() {
    return {
    };
  },
  computed: {
    personalDetails() {
      return this.$store.getters['candidate/personalDetails']();
    },
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
    isEmailVerified() {
      return this.$store.getters['auth/isEmailVerified'];
    },
    hasCompletedSignup() {
      return this.$store.getters['candidate/requiredFieldsComplete']();
    },
  },
  async mounted() {
    await this.$store.dispatch('candidate/bind');

    // need to sign out if email has been updated
    if (this.personalDetails.email && this.personalDetails.email !== this.$store.state.auth.currentUser.email) {
      this.openModal();
    }
  },
  unmounted() {
    this.$store.dispatch('candidate/unbind');
  },
  methods: {
    openModal(){
      this.$refs.modalRef.openModal();
    },
    signOut() {
      auth.signOut();
      this.$router.push({ name: 'sign-in' });
    },
  },
};
</script>

<style scoped>
.change-link {
  float: right;
}
</style>
