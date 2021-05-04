<template>
  <dl
    class="govuk-summary-list govuk-!-margin-bottom-8"
  >
    <div
      class="govuk-summary-list__row"
    >
      <dt
        v-if="vacancy.previousJudicialExperienceApply"
        class="govuk-summary-list__key"
      >
        Are you a fee-paid or salaried judge?
      </dt>
      <dd class="govuk-summary-list__value">
        {{ application.feePaidOrSalariedJudge | toYesNo }}
      </dd>
    </div>

    <div
      v-if="application.feePaidOrSalariedJudge === true"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        {{ `Have you sat for at least ${vacancy.pjeDays || 30 } days?` }}
      </dt>
      <dd class="govuk-summary-list__value">
        <p class="govuk-body">
          {{ application.feePaidOrSalariedSatForThirtyDays | toYesNo }}
        </p>
        <p
          v-if="application.feePaidOrSalariedSittingDaysDetails"
          class="govuk-body"
        >
          {{ application.feePaidOrSalariedSittingDaysDetails }}
        </p>
      </dd>
    </div>

    <div
      v-if="application.feePaidOrSalariedSatForThirtyDays == false || application.feePaidOrSalariedJudge == false"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        Have you declared an appointment or appointments in a quasi-judicial body in this application?
      </dt>
      <dd class="govuk-summary-list__value">
        {{ application.declaredAppointmentInQuasiJudicialBody | toYesNo }}
      </dd>
    </div>

    <div
      v-if="application.declaredAppointmentInQuasiJudicialBody === true"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        {{ `Have you sat for at least ${ vacancy.pjeDays || 30 } in one or all of these appointments?` }}
      </dt>
      <dd class="govuk-summary-list__value">
        <p class="govuk-body">
          {{ application.quasiJudicialSatForThirtyDays | toYesNo }}
        </p>
        <p
          v-if="application.quasiJudicialSittingDaysDetails"
          class="govuk-body"
        >
          {{ application.quasiJudicialSittingDaysDetails }}
        </p>
      </dd>
    </div>

    <div
      v-if="application.declaredAppointmentInQuasiJudicialBody == false ||
        application.quasiJudicialSatForThirtyDays == false"
      class="govuk-summary-list__row"
    >
      <dt class="govuk-summary-list__key">
        details of how you have acquired the necessary
        skills for this role in some other significant way
      </dt>
      <dd class="govuk-summary-list__value">
        {{ application.skillsAquisitionDetails }}
      </dd>
    </div>
  </dl>
</template>

<script>
export default {
  props: {
    application: {
      type: Object,
      required: true,
    },
    vacancy: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .govuk-summary-list__value,
  .govuk-summary-list__value:last-child,
  .govuk-summary-list__key {
    @include govuk-media-query($from: tablet) {
      width: auto;
    }
  }
  .change-link {
    float: right;
  }
</style>
