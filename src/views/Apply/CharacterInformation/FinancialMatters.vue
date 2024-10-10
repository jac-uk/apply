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
                  :component-props="{
                    hint2: isCharacterInformationV3
                      ? 'Please add details of your bankruptcy here, including date of discharge from bankruptcy, where relevant.'
                      : 'Please add details of your bankruptcy here'
                  }"
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
              :label="isCharacterInformationV3
                ? '7. Have you ever entered into an Individual Voluntary Agreement (IVA) or other similar arrangement?'
                : '7. Have you ever entered into an Individual Voluntary Agreement (IVA)?'
              "
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.ivaDetails"
                  required
                  :component="repeatableFields.IvaDetails"
                  :component-props="{
                    hint2: isCharacterInformationV3
                      ? 'Please add details of your IVA here, including date of discharge from IVA, where relevant.'
                      : 'Please add details of your IVA here'
                  }"
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
              :label="isCharacterInformationV3
                ? '8. Have you ever filed late tax returns and/or made late tax payments?'
                : '8. Have you ever filed late tax returns?'
              "
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.lateTaxReturnDetails"
                  required
                  :component="repeatableFields.LateTaxReturnDetails"
                  :component-props="{
                    label2: isCharacterInformationV3
                      ? 'Date of late tax return/payment'
                      : 'Date of late tax return'
                  }"
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
              :label="isCharacterInformationV3
                ? '9. Have you ever filed late VAT returns and/or made late VAT payments?'
                : '9. Have you ever filed late VAT returns?'
              "
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.lateVatReturnDetails"
                  required
                  :component="repeatableFields.LateVatReturnDetails"
                  :component-props="{
                    label2: isCharacterInformationV3
                      ? 'Date of late VAT return/payment'
                      : 'Date of late VAT return'
                  }"
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
          </div>
          <div class="govuk-grid-column-one-quarters" />
        </div>

        <div class="govuk-grid-row govuk-!-margin-left-0">
          <div class="govuk-grid-column-three-quarters govuk-!-padding-left-0">
            <RadioGroup
              v-if="isCharacterInformationV3"
              id="hmrc-tax-enquiries"
              v-model="characterInformation.hmrcTax"
              required
              label="11. Are you aware of any open HMRC enquiries into your tax affairs?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <RepeatableFields
                  v-model="characterInformation.hmrcTaxDetails"
                  required
                  :component="repeatableFields.HmrcTaxDetails"
                  :component-props="{
                    hint: 'Please provide full details of any HMRC enquiries into your tax affairs.'
                  }"
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
import { shallowRef } from 'vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import RepeatableFields from '@/components/RepeatableFields.vue';
import BankruptcyDetails from '@/components/RepeatableFields/CharacterInformation/BankruptcyDetails.vue';
import IvaDetails from '@/components/RepeatableFields/CharacterInformation/IvaDetails.vue';
import LateTaxReturnDetails from '@/components/RepeatableFields/CharacterInformation/LateTaxReturnDetails.vue';
import LateVatReturnDetails from '@/components/RepeatableFields/CharacterInformation/LateVatReturnDetails.vue';
import HmrcFineDetails from '@/components/RepeatableFields/CharacterInformation/HmrcFineDetails.vue';
import HmrcTaxDetails from '@/components/RepeatableFields/CharacterInformation/HmrcTaxDetails.vue';
import CharacterInformationStatus from '@/views/Apply/CharacterInformation/CharacterInformationStatus.vue';
import BackLink from '@/components/BackLink.vue';
import InfoIcon from '@/components/ModalViews/InfoIcon.vue';
import { FINANCIAL_MATTERS_URL, BANKRUPTCY_IVA_URL, LATE_TAX_VAT_RETURNS_HMRC_URL } from './character-information-constants';

export default {
  name: 'FinancialMatters',
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
      hmrcTax: null,
      hmrcTaxDetails: null,
    };
    const data = this.$store.getters['candidate/characterInformation']();
    const characterInformation = { ...defaults, ...data };

    return {
      characterInformation: characterInformation,
      formId: 'characterInformation',
      repeatableFields: shallowRef({
        BankruptcyDetails,
        IvaDetails,
        LateTaxReturnDetails,
        LateVatReturnDetails,
        HmrcFineDetails,
        HmrcTaxDetails,
      }),
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
        if (this.characterInformation.hmrcTax === false ) {
          this.characterInformation.hmrcTaxDetails = null;
        }
        const data = this.initCharacterInformation(this.characterInformation);
        data[`progress.${this.formId}`] = this.isCharacterInformationComplete(this.characterInformation);
        await this.$store.dispatch('application/save', data);
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

