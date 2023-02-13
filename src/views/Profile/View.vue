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
              <RouterLink
                class="govuk-link govuk-body-m change-link"
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
            </dl>

            <dl class="govuk-summary-list">
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Email
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ personalDetails.email }}
                </dd>
              </div>

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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  components: {},
  data() {
    return {
    };
  },
  computed: {
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
    personalDetails() {
      return this.$store.getters['candidate/personalDetails']();
    },
  },
  async mounted() {
    await this.$store.dispatch('candidate/bind');
  },
  methods: {
  },
};
</script>

<style scoped>
.change-link {
  float: right;
}
</style>
