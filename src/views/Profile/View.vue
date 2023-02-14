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

      <div class="govuk-!-padding-top-4 govuk-grid-column-three-quarters">
        <div
          v-if="personalDetails"
          class="govuk-grid-row"
        >
          <div class="govuk-grid-column-three-quarters">
            <h3 class="govuk-heading-l">
              Your profile
            </h3>

            <div class="text-right">
              <RouterLink
                class="govuk-link govuk-body-m"
                style="display:inline-block;"
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
                    {{ personalDetails.dateOfBirth | formatDate }}
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

            <div class="text-right">
              <RouterLink
                class="govuk-link govuk-body-m"
                style="display:inline-block;"
                :to="{ name: 'profile-password-edit' }"
              >
                Edit
              </RouterLink>
            </div>

            <dl class="govuk-summary-list">
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Password
                </dt>
                <dd class="govuk-summary-list__value">
                  ********
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <Modal
        ref="modalRef"
        button-text="Sign out"
        :cancelable="false"
        title="Action"
        message="Please re-sign in due to the update of your email."
        content-style="text-align: center;"
        @confirmed="signOut"
      />
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import Modal from '@/components/Page/Modal';

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
  },
  async mounted() {
    await this.$store.dispatch('candidate/bind');

    // need to sign out if email has been updated
    if (this.personalDetails.email !== this.$store.state.auth.currentUser.email) {
      this.openModal();
    }
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
