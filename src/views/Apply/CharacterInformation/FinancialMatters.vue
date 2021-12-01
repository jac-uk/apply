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
          <div class="govuk-grid-column-one-quarter govuk-!-padding-left-1">
            <InfoIcon
              :url="financialMatters"
            />
          </div>
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <div class="govuk-grid-column-three-quarters govuk-!-padding-left-0">
            <RadioGroup
              id="bankruptcies"
              v-model="characterInformation.bankruptcies"
              required
              label="6. Have you ever been declared bankrupt?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.bankruptcyDetails"
                  required
                  :component="repeatableFields.BankruptcyDetails"
                  :url="bankruptcyOrIva"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <div class="govuk-grid-column-three-quarters govuk-!-padding-left-0">
            <RadioGroup
              id="ivas"
              v-model="characterInformation.ivas"
              required
              label="7. Have you ever entered into an Individual Voluntary Agreement (IVA)?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.ivaDetails"
                  required
                  :component="repeatableFields.IvaDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
          <div class="govuk-grid-column-one-quarters" />
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <div class="govuk-grid-column-three-quarters govuk-!-padding-left-0">
            <RadioGroup
              id="late-tax-returns"
              v-model="characterInformation.lateTaxReturns"
              required
              label="8. Have you ever filed late tax returns?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.lateTaxReturnDetails"
                  required
                  :component="repeatableFields.LateTaxReturnDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
          <div class="govuk-grid-column-one-quarters" />
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <div class="govuk-grid-column-three-quarters govuk-!-padding-left-0">
            <RadioGroup
              id="late-vat-returns"
              v-model="characterInformation.lateVatReturns"
              required
              label="9. Have you ever filed late VAT returns?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.lateVatReturnDetails"
                  required
                  :component="repeatableFields.LateVatReturnDetails"
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
          <div class="govuk-grid-column-one-quarters" />
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <div class="govuk-grid-column-three-quarters govuk-!-padding-left-0">
            <RadioGroup
              id="hmrc-fines"
              v-model="characterInformation.hmrcFines"
              required
              label="10. Have you ever been fined by HMRC?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.hmrcFineDetails"
                  required
                  :component="repeatableFields.HmrcFineDetails"
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
          <div class="govuk-grid-column-one-quarters" />
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
import BankruptcyDetails from '@/components/RepeatableFields/CharacterInformation/BankruptcyDetails';
import IvaDetails from '@/components/RepeatableFields/CharacterInformation/IvaDetails';
import LateTaxReturnDetails from '@/components/RepeatableFields/CharacterInformation/LateTaxReturnDetails';
import LateVatReturnDetails from '@/components/RepeatableFields/CharacterInformation/LateVatReturnDetails';
import HmrcFineDetails from '@/components/RepeatableFields/CharacterInformation/HmrcFineDetails';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus';
import BackLink from '@/components/BackLink';
import InfoIcon from '@/components/ModalViews/InfoIcon';
import { FINANCIAL_MATTERS_URL, BANKRUPTCY_IVA_URL, LATE_TAX_VAT_RETURNS_HMRC_URL } from './character-information-constants';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    RepeatableFields,
    BackLink,
    InfoIcon,
  },
  extends: CharacterInformationStatus,
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
      financialMattersUrl: FINANCIAL_MATTERS_URL,
      bankruptcyOrIvaUrl: BANKRUPTCY_IVA_URL,
      lateTaxVatReturnsHmrcUrl: LATE_TAX_VAT_RETURNS_HMRC_URL,
    };
  },
  computed: {
    financialMatters() {
      return this.financialMattersUrl;
    },
    bankruptcyOrIva() {
      return this.bankruptcyOrIvaUrl;
    },
    lateTaxVatReturnsHmrc() {
      return this.lateTaxVatReturnsHmrcUrl;
    },
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

        this.application.characterInformationV2 = this.characterInformation;
        await this.$store.dispatch('application/save', this.application);
        await this.$store.dispatch('candidate/saveCharacterInformation', this.characterInformation);

        if (this.application.progress.characterInformation === true) {
          this.$router.push({ name: 'character-information-review' });
        } else {
          this.$router.push({ name: 'character-information-professional-conduct' });
        }
      }
    },
  },
};
</script>

