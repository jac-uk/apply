<template>
  <section>
    <form @submit.prevent="save">
      <h2>Your personal details</h2>

      <fieldset>
        <legend>Your name</legend>
        <div class="form-group">
          <label for="full_name">Full name</label>
          <div class="fieldset-text">
            We’ll use this name when contacting you about your application, and when contacting your assessors
          </div>
          <input
            id="full_name"
            v-model="applicant.full_name"
            type="text"
            class="form-control"
            autocomplete="name"
          >
        </div>
        <div class="form-group">
          <label>Are you or have you been known by any other name?</label>
          <div class="fieldset-text">
            We need this to do a character check
          </div>
          <BooleanInput v-model="applicant.has_other_name" />
        </div>
        <div
          v-if="applicant.has_other_name"
          class="form-group"
        >
          <label for="other_name">Name</label>
          <input
            id="other_name"
            v-model="applicant.other_name"
            type="text"
            class="form-control"
          >
        </div>
      </fieldset>

      <fieldset>
        <legend>Your date of birth</legend>
        <div class="fieldset-text">
          For example, 31 03 1980
        </div>
        <DateInput v-model="applicant.date_of_birth" />
      </fieldset>

      <fieldset>
        <legend>Your National Insurance number</legend>
        <div class="fieldset-text">
          It’s on your National Insurance card, payslip or P60. For&nbsp;example, QQ&nbsp;12&nbsp;34&nbsp;56&nbsp;C
        </div>
        <div class="form-group">
          <label for="national_insurance">National Insurance number</label>
          <input
            id="national_insurance"
            v-model="applicant.national_insurance"
            type="text"
            class="form-control"
          >
        </div>
      </fieldset>

      <fieldset>
        <legend>Your telephone number</legend>
        <div class="fieldset-text">
          We’ll only use this to contact you about your application
        </div>
        <div class="form-group">
          <label for="phone">Telephone number</label>
          <input
            id="phone"
            v-model="applicant.phone"
            type="tel"
            class="form-control"
            autocomplete="tel"
          >
        </div>
      </fieldset>

      <fieldset>
        <legend>Your address</legend>
        <div class="fieldset-text">
          We’ll use this address when verifying your identity for a character check
        </div>
        <div class="form-group">
          <label for="address_line_1">
            Address
            <span class="sr-only">line 1 of 2</span>
          </label>
          <input
            id="address_line_1"
            v-model="applicant.address_line_1"
            type="text"
            class="form-control"
            autocomplete="address-line1"
          >
        </div>
        <div class="form-group">
          <label
            for="address_line_2"
            class="sr-only"
          >
            Address line 2 of 2
          </label>
          <input
            id="address_line_2"
            v-model="applicant.address_line_2"
            type="text"
            class="form-control"
            autocomplete="address-line2"
          >
        </div>
        <div class="form-group">
          <label for="address_town">
            Town or city
          </label>
          <input
            id="address_town"
            v-model="applicant.address_town"
            type="text"
            class="form-control"
            autocomplete="address-line2"
            style="max-width: 18rem;"
          >
        </div>
        <div class="form-group">
          <label for="address_county">
            County
          </label>
          <input
            id="address_county"
            v-model="applicant.address_county"
            type="text"
            class="form-control"
            autocomplete="address-level1"
            style="max-width: 18rem;"
          >
        </div>
        <div class="form-group">
          <label for="address_postcode">
            Postcode
          </label>
          <input
            id="address_postcode"
            v-model="applicant.address_postcode"
            type="text"
            class="form-control"
            autocomplete="postal-code"
            style="max-width: 12rem;"
          >
        </div>
      </fieldset>

      <fieldset>
        <legend>Reasonable adjustments</legend>
        <div class="fieldset-text">
          We provide reasonable adjustments to ensure that candidates with a disability are not placed at a substantial disadvantage. We’ll also consider making reasonable adjustments for those suffering from short-term injury or temporary illness.
        </div>

        <p>Do you need any reasonable adjustments?</p>

        <div class="custom-control custom-radio custom-control-inline">
          <input
            id="reasonable_adjustments_yes"
            v-model="applicant.reasonable_adjustments"
            class="custom-control-input"
            type="radio"
            :value="true"
          >
          <label
            class="custom-control-label"
            for="reasonable_adjustments_yes"
          >
            Yes
          </label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input
            id="reasonable_adjustments_no"
            v-model="applicant.reasonable_adjustments"
            class="custom-control-input"
            type="radio"
            :value="false"
          >
          <label
            class="custom-control-label"
            for="reasonable_adjustments_no"
          >
            No
          </label>
        </div>

        <div
          v-if="applicant.reasonable_adjustments"
          class="form-group mt-3"
        >
          <label for="reasonable_adjustments_details">
            Provide details of your condition and request
          </label>
          <textarea
            id="reasonable_adjustments_details"
            v-model="applicant.reasonable_adjustments_details"
            class="form-control"
            rows="3"
          />
          <div class="form-text">
            <p>We’ll contact you if we need to discuss your arrangements.</p>
            <p>If you would like to discuss reasonable adjustments in confidence with someone, please email <a href="mailto:dcj128@judicialappointments.gov.uk">dcj128@judicialappointments.gov.uk</a>.</p>
          </div>
        </div>
      </fieldset>

      <SaveAndContinueButtons
        :is-saving="isSaving"
        @saveAndContinue="saveAndContinue"
      />
    </form>
  </section>
</template>

<script>
import DateInput from '@/components/DateInput';
import SaveAndContinueButtons from '@/components/SaveAndContinueButtons';
import BooleanInput from '@/components/BooleanInput';

export default {
  components: {
    BooleanInput,
    SaveAndContinueButtons,
    DateInput,
  },
  data() {
    return {
      applicant: this.$store.getters.applicant(),
      isSaving: false,
    };
  },
  methods: {
    async saveAndContinue() {
      await this.save();
      this.$emit('continue');
    },
    async save() {
      this.isSaving = true;
      await this.$store.dispatch('saveApplicant', this.applicant);
      this.isSaving = false;
    },
  },
};
</script>
