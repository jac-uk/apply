<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          {{ isJAC00164 ? 'E' : 'Judicial e' }}xperience
        </h1>

        <div
          v-if="isJAC00164"
        >
          <p
            class="govuk-body-l"
          >
            We need to understand how you have gained your experience and how many sitting days you have.
          </p>
          <p
            class="govuk-body-m"
          >
            The Lord Chancellor expects that candidates for salaried posts will have sufficient directly relevant previous judicial experience.
            The meaning of “directly relevant experience” is sitting as a fee-paid medical member of the First-tier Tribunal, Social Security and Child Support Tribunal (SSCS).
            For fee-paid members this should be for a period of at least two years or 30 sitting days since appointment.
            <br>
            <br>
            Only in exceptional cases and if the candidate in question has demonstrated the necessary skills in some other significant way should an exception be made.
            This would likely include demonstrating excellence in relation to clinical knowledge, supervision, management, appraisal, mentoring and training, together with a clear understanding and ability to apply the boundaries and responsibilities inherent in the judicial role.
          </p>
        </div>
        <p
          v-else
          class="govuk-body-l"
        >
          We need to understand how you have gained your judicial experience and
          how many sitting days you have. Expand on the information
          you've provided about your career.
        </p>

        <ErrorSummary :errors="errors" />

        <div
          v-if="isJAC00164"
        >
          <RadioGroup
            id="fee-or-salaried-judge"
            v-model="formData.feePaidOrSalariedJudge"
            required
            label="Are you a fee-paid or salaried medical member?"
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
            v-if="formData.feePaidOrSalariedJudge === true"
            id="fee-or-salaried-sat-thirty-days"
            v-model="formData.feePaidOrSalariedSatForThirtyDays"
            :label="`Have you sat for at least ${ vacancy.pjeDays || 30 } days?`"
            required
          >
            <RadioItem
              :value="true"
              label="Yes"
            >
              <TextareaInput
                id="fee-or-salaried-sitting-days-details"
                v-model="formData.feePaidOrSalariedSittingDaysDetails"
                label="Enter the number of sitting days for each
              appointment you have declared on this form."
                required
              />
            </RadioItem>
            <RadioItem
              :value="false"
              label="No"
            />
          </RadioGroup>

          <TextareaInput
            v-if="formData.feePaidOrSalariedJudge === false || (formData.feePaidOrSalariedJudge === true && formData.feePaidOrSalariedSatForThirtyDays === false)"
            id="gained-experience"
            v-model="formData.skillsAquisitionDetails"
            :word-limit="250"
            label="If you do not have previous experience as a Fee-paid Medical Member in the Social Entitlement Chamber, please tell us what equivalent experience and skills you have in the box below"
            required
          />
        </div>

        <div v-else>
          <RadioGroup
            id="fee-or-salaried-judge"
            v-model="formData.feePaidOrSalariedJudge"
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
            v-if="formData.feePaidOrSalariedJudge === true"
            id="fee-or-salaried-sat-thirty-days"
            v-model="formData.feePaidOrSalariedSatForThirtyDays"
            required
            :label="`Have you sat for at least ${ vacancy.pjeDays || 30 } days?`"
          >
            <RadioItem
              :value="true"
              label="Yes"
            >
              <TextareaInput
                id="fee-or-salaried-sitting-days-details"
                v-model="formData.feePaidOrSalariedSittingDaysDetails"
                label="Enter the number of sitting days for each judicial
              appointment you have declared on this form."
                required
              />
            </RadioItem>
            <RadioItem
              :value="false"
              label="No"
            />
          </RadioGroup>

          <RadioGroup
            v-if="formData.feePaidOrSalariedSatForThirtyDays == false || formData.feePaidOrSalariedJudge == false"
            id="appointment-in-quasi-judicial-body"
            v-model="formData.declaredAppointmentInQuasiJudicialBody"
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
            v-if="formData.declaredAppointmentInQuasiJudicialBody === true"
            id="quasi-judicial-sat-thirty-days"
            v-model="formData.quasiJudicialSatForThirtyDays"
            required
            :label="`Have you sat for at least ${ vacancy.pjeDays || 30 } days in one or all of these appointments?`"
          >
            <RadioItem
              :value="true"
              label="Yes"
            >
              <TextareaInput
                id="quasi-judicial-sitting-days-details"
                v-model="formData.quasiJudicialSittingDaysDetails"
                required
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
            v-if="formData.declaredAppointmentInQuasiJudicialBody == false ||
              formData.quasiJudicialSatForThirtyDays == false"
            id="gained-experience"
            v-model="formData.skillsAquisitionDetails"
            label="Provide details of how you have acquired the necessary
          skills for this role in some other significant way."
          />
        </div>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--judicial-experience--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import ApplyMixIn from '../ApplyMixIn';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import BackLink from '@/components/BackLink.vue';

export default {
  name: 'JudicialExperience',
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      feePaidOrSalariedJudge: null,
      feePaidOrSalariedSatForThirtyDays: null,
      feePaidOrSalariedSittingDaysDetails: null,
      declaredAppointmentInQuasiJudicialBody: null,
      quasiJudicialSatForThirtyDays: null,
      quasiJudicialSittingDaysDetails: null,
      skillsAquisitionDetails: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      formId: 'judicialExperience',
      formData: formData,
    };
  },
};
</script>
