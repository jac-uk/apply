<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-three-quarters">
            <h2 class="govuk-heading-l">
              Financial Matters
            </h2>
            <ErrorSummary
              :errors="errors"
              :show-save-button="true"
              @save="save"
            />
          </div>
          <div class="govuk-grid-column-one-quarter">
            <InfoIcon
              url="https://judicialappointments.gov.uk/wp-content/uploads/2020/10/good-character-guidance-jan2019.pdf"
            />
          </div>
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <RadioGroup
            id="bankruptcies"
            v-model="characterInformation.bankruptcies"
            required
            label="8. Have you ever been declared bankrupt?"
          >
            <RadioItem
              :value="true"
              label="Yes"
            >
              <RepeatableFields
                v-model="characterInformation.bankruptcyDetails"
                required
                :component="repeatableFields.BankruptcyDetails"
                url="https://judicialappointments.gov.uk/wp-content/uploads/2020/10/good-character-guidance-jan2019.pdf"
              />
            </RadioItem>
            <RadioItem
              :value="false"
              label="No"
            />
          </RadioGroup>
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <RadioGroup
            id="ivas"
            v-model="characterInformation.ivas"
            required
            label="9. Have you ever entered into an Individual Voluntary Agreement (IVA)?"
          >
            <RadioItem
              :value="true"
              label="Yes"
            >
              <RepeatableFields
                v-model="characterInformation.ivaDetails"
                required
                :component="repeatableFields.IvaDetails"
                url="https://judicialappointments.gov.uk/wp-content/uploads/2020/10/good-character-guidance-jan2019.pdf"
              />
            </RadioItem>
            <RadioItem
              :value="false"
              label="No"
            />
          </RadioGroup>
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <RadioGroup
            id="late-tax-returns"
            v-model="characterInformation.lateTaxReturns"
            required
            label="10. Have you ever filed late tax returns?"
          >
            <RadioItem
              :value="true"
              label="Yes"
            >
              <RepeatableFields
                v-model="characterInformation.lateTaxReturnDetails"
                required
                :component="repeatableFields.LateTaxReturnDetails"
                url="https://judicialappointments.gov.uk/wp-content/uploads/2020/10/good-character-guidance-jan2019.pdf"
              />
            </RadioItem>
            <RadioItem
              :value="false"
              label="No"
            />
          </RadioGroup>

        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <RadioGroup
            id="late-vat-returns"
            v-model="characterInformation.lateVatReturns"
            required
            label="11. Have you ever filed late VAT returns?"
          >
            <RadioItem
              :value="true"
              label="Yes"
            >
              <RepeatableFields
                v-model="characterInformation.lateVatReturnDetails"
                required
                :component="repeatableFields.LateVatReturnDetails"
                url="https://judicialappointments.gov.uk/wp-content/uploads/2020/10/good-character-guidance-jan2019.pdf"
              />
            </RadioItem>
            <RadioItem
              :value="false"
              label="No"
            />
          </RadioGroup>
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <RadioGroup
            id="hmrc-fines"
            v-model="characterInformation.hmrcFines"
            required
            label="12. Have you ever been filed by HMRC?"
          >
            <RadioItem
              :value="true"
              label="Yes"
            >
              <RepeatableFields
                v-model="characterInformation.hmrcFineDetails"
                required
                :component="repeatableFields.HmrcFineDetails"
                url="https://judicialappointments.gov.uk/wp-content/uploads/2020/10/good-character-guidance-jan2019.pdf"
              />
            </RadioItem>
            <RadioItem
              :value="false"
              label="No"
            />
          </RadioGroup>
          <button
            :disabled="application.status != 'draft'"
            class="govuk-button info-btn--character-information--save-and-continue"
          >
            Save and continue
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import RepeatableFields from '@/components/RepeatableFields';
import BankruptcyDetails from '@/components/RepeatableFields/BankruptcyDetails';
import IvaDetails from '@/components/RepeatableFields/IvaDetails';
import LateTaxReturnDetails from '@/components/RepeatableFields/LateTaxReturnDetails';
import LateVatReturnDetails from '@/components/RepeatableFields/LateVatReturnDetails';
import HmrcFineDetails from '@/components/RepeatableFields/HmrcFineDetails';
import CharacterInformationForm from '@/views/Apply/CharacterInformation/CharacterInformationForm';
import BackLink from '@/components/BackLink';
import InfoIcon from '@/components/ModalViews/InfoIcon';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    RepeatableFields,
    BackLink,
    InfoIcon,
  },
  extends: CharacterInformationForm,
  data() {
    const defaults = {
      bankruptcies: null,
      bankruptcyDetails: null,
      ivas: null,
      ivaDetails: null,
      lateTaxReturns: null,
      lateTaxReturnDetails: null,
      lateVatReturns: null,
      lateVatReturnDetails: null,
      hmrcFines: null,
      hmrcFineDetails: null,

    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };
    const application = this.$store.getters['application/data']();
    return {
      characterInformation: characterInformation,
      application: application,
      repeatableFields: {
        BankruptcyDetails,
        IvaDetails,
        LateTaxReturnDetails,
        LateVatReturnDetails,
        HmrcFineDetails,
      },
    };
  },
  methods: {
    async save() {
      this.validate();
      if (this.isValid()) {
        this.updateProgress();
        if (this.characterInformation.bankruptcies === false ) {
          this.characterInformation.bankruptcyDetails = null;
        }
        if (this.characterInformation.ivas === false ) {
          this.characterInformation.ivaDetails = null;
        }
        if (this.characterInformation.lateTaxReturns === false ) {
          this.characterInformation.lateTaxReturnDetails = null;
        }
        if (this.characterInformation.lateVatReturns === false ) {
          this.characterInformation.lateVatReturnDetails = null;
        }
        if (this.characterInformation.hmrcFines === false ) {
          this.characterInformation.hmrcFineDetails = null;
        }

        this.application.characterInformation = this.characterInformation;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);
        this.$router.push({ name: 'character-information-professional-conduct' });
      }
    },
  },
};
</script>

