<template>
  <div class="govuk-grid-row">
    <form 
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Judicial experience
        </h1>

        <p class="govuk-body-l">
          We need to understand how you have gained your judicial experience and
          how many sitting days you have. Expand on the information
          you've provided about your career.
        </p>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <RadioGroup
          id="fee-or-salaried-judge"
          v-model="application.feePaidOrSalariedJudge"
          required
          label="Are you a fee-paid or salaried judge?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          v-if="application.feePaidOrSalariedJudge === true"
          id="fee-or-salaried-sat-thirty-days"
          v-model="application.feePaidOrSalariedSatForThirtyDays"
          label="Have you sat for at least 30 days?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="fee-or-salaried-sitting-days-details"
              v-model="application.feePaidOrSalariedSittingDaysDetails"
              label="Enter the number of sitting days for each judicial
              appointments you have declared on this application."
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          v-if="application.feePaidOrSalariedSatForThirtyDays == false || application.feePaidOrSalariedJudge == false"
          id="appointment-in-quasi-judicial-body"
          v-model="application.declaredAppointmentInQuasiJudicialBody"
          required
          label="Have you declared an appointment or appointments in a quasi-judicial body in this application?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />

          <details
            class="govuk-details"
            data-module="govuk-details"
          >
            <summary class="govuk-details__summary">
              <span class="govuk-details__summary-text">
                More about quasi-judicial bodies
              </span>
            </summary>
            <div class="govuk-details__text">
              <p>
                Quasi-judicial bodies have powers and procedures
                similar to those of courts.  For example, involve complex
                matters, determining facts and making decisions.
              </p>

              <p>Examples of quasi-judicial bodies include:</p>

              <ul class="govuk-list govuk-list--bullet">
                <li>Coroner</li>
                <li>Parole Board</li>
                <li>Chair of a statutory inquiry</li>
                <li>Arbitration</li>
                <li>Disciplinary tribunals</li>
                <li>Conduct hearings for professional standard bodies</li>
              </ul>
            </div>
          </details>
        </RadioGroup>

        <RadioGroup
          v-if="application.declaredAppointmentInQuasiJudicialBody === true"
          id="quasi-judicial-sat-thirty-days"
          v-model="application.quasiJudicialSatForThirtyDays"
          label="Have you sat for at least 30 days in one or all of these appointments?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="quasi-judicial-sitting-days-details"
              v-model="application.quasiJudicialSittingDaysDetails"
              label="Enter the number of sitting days for each of the
              appointments you have declared on this application, and powers and
              procedures in the office you hold. Include any further details of whether
              a legal qualification is required, the nature of your work."
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <TextareaInput
          v-if="application.declaredAppointmentInQuasiJudicialBody == false ||
            application.quasiJudicialSatForThirtyDays == false"
          id="gained-experience"
          v-model="application.skillsAquisitionDetails"
          label="Provide details of how you have acquired the necessary
          skills for this role in some other significant way."
        />

        <button
          :disabled="application.status != 'draft'"
          class="govuk-button"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  data(){
    const defaults = {
      feePaidOrSalariedJudge: null,
      feePaidOrSalariedSatForThirtyDays: null,
      feePaidOrSalariedSittingDaysDetails: null,
      declaredAppointmentInQuasiJudicialBody: null,
      quasiJudicialSatForThirtyDays: null,
      quasiJudicialSittingDaysDetails: null,
      skillsAquisitionDetails: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
    };
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.application.progress.judicialExperience = true;
        await this.$store.dispatch('application/save', this.application);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
