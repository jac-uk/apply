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
              id="current-password"
              v-model="currentPassword"
              label="Current Password"
              type="new-password"
              required
            />
          </div>

          <div class="govuk-grid-column-three-quarters">
            <Password
              id="password"
              v-model="password"
              label="New Password"
              :hint="`For security reasons it should be ${minPasswordLength} or more characters long, contain a mix of upper- and lower-case letters, at least one digit and special character (like £, #, @, !, %, -, &, *).`"
              type="new-password"
              :min-length="minPasswordLength"
              :is-new-pwd="true"
              required
            />
          </div>

          <div class="govuk-grid-column-three-quarters">
            <Password
              id="confirm-password"
              v-model="confirmPassword"
              label="Confirm New Password"
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
import { mapPwdResetMessage, updatePwd } from '@/services/authService';
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import Password from '@/components/Form/Password.vue';
import BackLink from '@/components/BackLink.vue';

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
      currentPassword: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    isEmailVerified() {
      return this.$store.getters['auth/isEmailVerified'];
    },
  },
  methods: {
    async save() {
      if (this.password !== this.confirmPassword) {
        this.errors = [{ id: 'confirm-password', message: 'The new password and confirm password values do not match' }];
        return;
      }
      if (this.password === this.currentPassword) {
        this.errors = [{ id: 'password', message: 'The new password should be different from the current password' }];
        return;
      }

      this.validate();
      if (this.isValid()) {
        try {
          await updatePwd(this.currentPassword, this.password);
          this.$router.push({ name: 'profile' });
        } catch (error) {
          let inputId = 'password';
          const message = mapPwdResetMessage(error.code);
          if (Array.prototype.includes.call([
            'auth/invalid-credential',
            'auth/wrong-password',
          ], error.code)) {
            inputId = 'current-password';
          }
          this.errors = [{ id: inputId, message: message }];
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
