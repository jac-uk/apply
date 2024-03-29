<template>
  <dl
    v-if="characterInformation && Object.keys(characterInformation).length"
    class="govuk-summary-list"
  >
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key widerColumn">
        Have you ever been cautioned or convicted of a criminal offence?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ $filters.toYesNo(characterInformation.criminalOffences) }}
        <EventRenderer
          v-if="characterInformation.criminalOffences"
          :events="characterInformation.criminalOffenceDetails"
        />
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Have you received a non-motoring penalty notice in the last 4 years?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ $filters.toYesNo(characterInformation.nonMotoringFixedPenaltyNotices) }}
        <EventRenderer
          v-if="characterInformation.nonMotoringFixedPenaltyNotices"
          :events="characterInformation.nonMotoringFixedPenaltyNoticesDetails"
        />
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Have you ever been disqualified from driving, or convicted for driving under the influence of drink or drugs?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ $filters.toYesNo(characterInformation.drivingDisqualificationDrinkDrugs) }}
        <EventRenderer
          v-if="characterInformation.drivingDisqualificationDrinkDrugs"
          :events="characterInformation.drivingDisqualificationDrinkDrugsDetails"
        />
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Do you have any endorsements on your licence, or received any motoring fixed-penalty notices in the last 4 years?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ $filters.toYesNo(characterInformation.endorsementsOrMotoringFixedPenalties) }}
        <EventRenderer
          v-if="characterInformation.endorsementsOrMotoringFixedPenalties"
          :events="characterInformation.endorsementsOrMotoringFixedPenaltiesDetails"
        />
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Have you ever been declared bankrupt or entered into an Individual Voluntary Agreement (IVA)?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ $filters.toYesNo(characterInformation.declaredBankruptOrIVA) }}
        <EventRenderer
          v-if="characterInformation.declaredBankruptOrIVA"
          :events="characterInformation.declaredBankruptOrIVADetails"
        />
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Have you ever filed late tax returns or been fined by HMRC?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ $filters.toYesNo(characterInformation.lateTaxReturnOrFined) }}
        <EventRenderer
          v-if="characterInformation.lateTaxReturnOrFined"
          :events="characterInformation.lateTaxReturnOrFinedDetails"
        />
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Have you ever been, or are you currently, subject to professional misconduct, negligence, wrongful
        dismissal, discrimination or harassment proceedings?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ $filters.toYesNo(characterInformation.involvedInProfessionalMisconduct) }}
        <EventRenderer
          v-if="characterInformation.involvedInProfessionalMisconduct"
          :events="characterInformation.involvedInProfessionalMisconductDetails"
        />
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Have you ever been subject to complaints or disciplinary action,
        or been asked to resign from a position?
      </dt>
      <dd
        class="govuk-summary-list__value"
      >
        {{ $filters.toYesNo(characterInformation.diciplinaryActionOrAskedToResign) }}
        <EventRenderer
          v-if="characterInformation.diciplinaryActionOrAskedToResign"
          :events="characterInformation.diciplinaryActionOrAskedToResignDetails"
        />
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Do you have any other issues that you think we should know about when considering your character?
      </dt>
      <dd
        class="govuk-summary-list__value"
        data-welsh="other-character-issues"
      >
        {{ $filters.toYesNo(characterInformation.otherCharacterIssues) }}
        <EventRenderer
          v-if="characterInformation.otherCharacterIssues"
          :events="characterInformation.otherCharacterIssuesDetails"
        />
      </dd>
    </div>
  </dl>
  <span
    v-else
    class="govuk-body"
  >No information provided
  </span>
</template>
<script>
import EventRenderer from '@/components/Page/EventRenderer.vue';
export default {
  name: 'CharacterInformationSummaryV1',
  components: {
    EventRenderer,
  },
  props: {
    characterInformation: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
  .widerColumn {
    width: 70%;
  }
</style>
