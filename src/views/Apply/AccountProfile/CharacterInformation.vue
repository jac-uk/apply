<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Declare character information
        </h1>

        <p class="govuk-body-l">
          You must tell us about any character issues that could affect your
          suitability for this role. Read the
          <a
            class="govuk-link"
            href="https://www.judicialappointments.gov.uk/good-character"
            target="_blank"
          >
            character guidance
          </a>
          for detailed information.
        </p>

        <RadioGroup
          id="declared-bankrupt"
          v-model="application.declaredBankrupt"
          label="Have you ever been declared bankrupt?"
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
          id="financial-difficulties"
          v-model="application.financialDifficulties"
          label="Have you filed late tax returns, been fined by HMRC or
          had other financial difficulties more than 3 times in the last 5 years?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="financial-difficulties-details"
              v-model="application.financialDifficultiesDetails"
              label="Add details of late filling, fines or other difficulties"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="live-conduct-negligence-investigation"
          v-model="application.conductNegligenceInvestigation"
          label="Are you the subject of a live professional conduct or negligence investigation?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="conduct-negligence-investigation-details"
              v-model="application.conductNegligenceInvestigationDetails"
              label="Add details of conduct or negligence investigations"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="drink-drug-mobile-motoring-offence"
          v-model="application.drinkDrugMobileMotoringOffence"
          label="Have you had a motoring offence involving drink or drug
          driving, or driving while using a mobile in the last 10 years?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="drink-drug-mobile-motoring-offence-details"
              v-model="application.drinkDrugMobileMotoringOffenceDetails"
              label="Add details of driving offences"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="disqualified-from-driving"
          v-model="application.disqualifiedFromDriving"
          label="Have you been disqualified from driving in the last 5 years?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="disqualified-from-driving-details"
              v-model="application.disqualifiedFromDrivingDetails"
              label="Add details of disqualification"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="motoring-offences-and->6points"
          v-model="application.motoringOffencesAndSixPlusPoints"
          label="Do you have any motoring offences and more than 6 points on your licence?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="motoring-offences-and->6points-details"
              v-model="application.motoringOffencesAndSixPlusPointsDetails"
              label="Add details of motoring offences or licence points"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="criminal-conviction-causion"
          v-model="application.criminalConvictionCaution"
          label="Have you had a criminal conviction in the last 10 years or a criminal caution in the last 5 years?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="criminal-conviction-causion-details"
              v-model="application.criminalConvictionCautionDetails"
              label="Add details of criminal conviction"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          id="other-character-issues"
          v-model="application.otherCharacterIssues"
          label="Do you have any other issues that you think we should know about when considering your character?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <TextareaInput
              id="other-character-issues-details"
              v-model="application.otherCharacterIssuesDetails"
              label="Add details of other character issues"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <button class="govuk-button">
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  components: {
    RadioGroup,
    RadioItem,
    TextareaInput,
  },
  data(){
    const defaults = {
      declaredBankrupt: null,
      financialDifficulties: null,
      financialDifficultiesDetails: null,
      conductNegligenceInvestigation: null,
      conductNegligenceInvestigationDetails: null,
      drinkDrugMobileMotoringOffence: null,
      drinkDrugMobileMotoringOffenceDetails: null,
      disqualifiedFromDriving: null,
      disqualifiedFromDrivingDetails: null,
      motoringOffencesAndSixPlusPoints: null,
      motoringOffencesAndSixPlusPointsDetails: null,
      criminalConvictionCaution: null,
      criminalConvictionCautionDetails: null,
      otherCharacterIssues: null,
      otherCharacterIssuesDetails: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
    };
  },
  methods: {
    async save() {
      await this.$store.dispatch('application/save', this.application);
      this.$router.push({ name: 'task-list' });
    },
  },
};
</script>
