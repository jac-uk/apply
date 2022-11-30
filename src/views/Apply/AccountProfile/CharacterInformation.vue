<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Declare character information
        </h1>

        <ErrorSummary
          :errors="errors"
          :show-save-button="true"
          @save="save"
        />

        <p class="govuk-body-l">
          You must tell us about any character issues that could affect your
          suitability for this role. Read the
          <a
            class="govuk-link info-link--character-information--character-guidance"
            href="https://www.judicialappointments.gov.uk/good-character"
            target="_blank"
          >
            character guidance
          </a>
          for detailed information.
        </p>

        <h2 class="govuk-heading-l">
          Criminal offences
        </h2>
        <RadioGroup
          id="criminal-offenses"
          v-model="characterInformation.criminalOffences"
          required
          label="Have you ever been cautioned or convicted of a criminal offence?"
          hint="This includes spent convictions."
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.criminalOffenceDetails"
              required
              :component="repeatableFields.CriminalOffenceDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <h2 class="govuk-heading-l">
          Fixed-penalty notices, non motoring
        </h2>
        <RadioGroup
          id="non-motoring-fixed-pentalty-notice"
          v-model="characterInformation.nonMotoringFixedPenaltyNotices"
          required
          label="Have you received a non-motoring penalty notice in the last 4 years?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.nonMotoringFixedPenaltyNoticesDetails"
              required
              :component="repeatableFields.NonMotoringFixedPenaltyNoticesDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <h2 class="govuk-heading-l">
          Driving offences
        </h2>
        <RadioGroup
          id="driving-disqualification-drink-drugs"
          v-model="characterInformation.drivingDisqualificationDrinkDrugs"
          required
          label="Have you ever been disqualified from driving, or convicted for driving under the influence of drink or drugs?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.drivingDisqualificationDrinkDrugsDetails"
              required
              :component="repeatableFields.DrivingDisqualificationDrinkDrugsDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>
        <RadioGroup
          id="driving-endorsements-of-fixed-penalty"
          v-model="characterInformation.endorsementsOrMotoringFixedPenalties"
          required
          label="Do you have any endorsements on your licence, or received any motoring fixed-penalty notices in the last 4 years?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.endorsementsOrMotoringFixedPenaltiesDetails"
              required
              :component="repeatableFields.EndorsementsOrMotoringFixedPenaltiesDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <h2 class="govuk-heading-l">
          Financial considerations
        </h2>
        <RadioGroup
          id="declared-bankrupt-or-iva"
          v-model="characterInformation.declaredBankruptOrIVA"
          required
          label="Have you ever been declared bankrupt or entered into an Individual Voluntary Agreement (IVA)?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.declaredBankruptOrIVADetails"
              required
              :component="repeatableFields.DeclaredBankruptOrIVADetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>
        <RadioGroup
          id="late-tax-return-or-fined-by-hmrc"
          v-model="characterInformation.lateTaxReturnOrFined"
          required
          label="Have you ever filed late tax returns or been fined by HMRC?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.lateTaxReturnOrFinedDetails"
              required
              :component="repeatableFields.LateTaxReturnOrFinedDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <h2 class="govuk-heading-l">
          Professional complaints
        </h2>
        <RadioGroup
          id="involved-in-professional-misconduct"
          v-model="characterInformation.involvedInProfessionalMisconduct"
          required
          label="Have you ever been, or are you currently,
          subject to professional misconduct, negligence, wrongful
          dismissal, discrimination or harassment proceedings?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.involvedInProfessionalMisconductDetails"
              required
              :component="repeatableFields.InvolvedInProfessionalMisconductDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>
        <RadioGroup
          id="subject-to-diciplinary-or-asked-to-resign"
          v-model="characterInformation.diciplinaryActionOrAskedToResign"
          required
          label="Have you ever been subject to complaints or disciplinary action,
          or been asked to resign from a position?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.diciplinaryActionOrAskedToResignDetails"
              required
              :component="repeatableFields.DiciplinaryActionOrAskedToResignDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <h2 class="govuk-heading-l">
          Other considerations
        </h2>
        <RadioGroup
          id="other-character-issues"
          v-model="characterInformation.otherCharacterIssues"
          required
          label="Do you have any other issues that you think we should know about when considering your character?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          >
            <RepeatableFields
              v-model="characterInformation.otherCharacterIssuesDetails"
              required
              :component="repeatableFields.OtherCharacterIssuesDetails"
            />
          </RadioItem>
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>
        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--character-information--save-and-continue"
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
import RepeatableFields from '@/components/RepeatableFields';
import CriminalOffenceDetails from '@/components/RepeatableFields/CriminalOffenceDetails';
import NonMotoringFixedPenaltyNoticesDetails from '@/components/RepeatableFields/NonMotoringFixedPenaltyNoticesDetails';
import DrivingDisqualificationDrinkDrugsDetails from '@/components/RepeatableFields/DrivingDisqualificationDrinkDrugsDetails';
import EndorsementsOrMotoringFixedPenaltiesDetails from '@/components/RepeatableFields/EndorsementsOrMotoringFixedPenaltiesDetails';
import DeclaredBankruptOrIVADetails from '@/components/RepeatableFields/DeclaredBankruptOrIVADetails';
import LateTaxReturnOrFinedDetails from '@/components/RepeatableFields/LateTaxReturnOrFinedDetails';
import InvolvedInProfessionalMisconductDetails from '@/components/RepeatableFields/InvolvedInProfessionalMisconductDetails';
import DiciplinaryActionOrAskedToResignDetails from '@/components/RepeatableFields/DiciplinaryActionOrAskedToResignDetails';
import OtherCharacterIssuesDetails from '@/components/RepeatableFields/OtherCharacterIssuesDetails';
import BackLink from '@/components/BackLink';

export default {
  name: 'CharacterInformation',
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    RepeatableFields,
    BackLink,
  },
  extends: Form,
  data() {
    const defaults = {
      criminalOffences: null,
      criminalOffenceDetails: null,
      nonMotoringFixedPenaltyNotices: null,
      nonMotoringFixedPenaltyNoticesDetails: null,
      drivingDisqualificationDrinkDrugs: null,
      drivingDisqualificationDrinkDrugsDetails: null,
      endorsementsOrMotoringFixedPenalties: null,
      endorsementsOrMotoringFixedPenaltiesDetails: null,
      declaredBankruptOrIVA: null,
      declaredBankruptOrIVADetails: null,
      lateTaxReturnOrFined: null,
      lateTaxReturnOrFinedDetails: null,
      involvedInProfessionalMisconduct: null,
      involvedInProfessionalMisconductDetails: null,
      diciplinaryActionOrAskedToResign: null,
      diciplinaryActionOrAskedToResignDetails: null,
      otherCharacterIssues: null,
      otherCharacterIssuesDetails: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    const application = this.$store.getters['application/data']();
    return {
      characterInformation: characterInformation,
      application: application,
      formId: 'characterInformation',
      repeatableFields: {
        CriminalOffenceDetails,
        NonMotoringFixedPenaltyNoticesDetails,
        DrivingDisqualificationDrinkDrugsDetails,
        EndorsementsOrMotoringFixedPenaltiesDetails,
        DeclaredBankruptOrIVADetails,
        LateTaxReturnOrFinedDetails,
        InvolvedInProfessionalMisconductDetails,
        DiciplinaryActionOrAskedToResignDetails,
        OtherCharacterIssuesDetails,
      },
    };
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.application.progress.characterInformation = true;
        this.application.characterInformation = this.characterInformation;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);
        this.$router.push({ name: 'task-list' });
      }
    },
  },
};
</script>
