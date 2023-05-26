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
              :class="$route.name === 'profile' || $route.name === 'profile-edit' || $route.name === 'profile-password-edit' ? 'moj-side-navigation__item--active' : null"
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

      <BackLink />

      <div class="govuk-!-padding-top-4 govuk-grid-column-three-quarters">
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-three-quarters">
            <ErrorSummary :errors="errors" />
            <h3 class="govuk-heading-l float-left">
              Your profile
            </h3>
            <!--
              <div class="float-right">
              <a
                class="govuk-button"
                style="cursor: pointer;"
                @click.prevent="save"
              >
                Save and continue
              </a>
              </div>
          -->
          </div>

          <div class="govuk-grid-column-three-quarters">
            <Password
              id="password"
              v-model="password"
              label="Password"
              :hint="`For security reasons it should be ${minPasswordLength} or more characters long, contain a mix of upper- and lower-case letters, at least one digit and special character (like £, #, @, !, %, -, &, *).`"
              type="new-password"
              :min-length="minPasswordLength"
              required
            />
            <a
              class="govuk-button float-right"
              style="cursor: pointer;"
              @click.prevent="save"
            >
              Save and continue
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import Password from '@/components/Form/Password';
import BackLink from '@/components/BackLink';

export default {
  name: 'ProfileEdit',
  components: {
    ErrorSummary,
    BackLink,
    Password,
  },
  extends: Form,
  data() {
    return {
      minPasswordLength: 12,
      password: '',
    };
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        try {
          await auth.currentUser.updatePassword(this.password);
          this.$router.push({ name: 'profile' });
        } catch (error) {
          this.errors = [{ id: 'password', message: error.message }];
        }
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
