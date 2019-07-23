<template>
  <section>
    <form @submit.prevent="save">
      <h2>Your character</h2>

      <fieldset>
        <legend>Motoring offences</legend>

        <label>Have you ever been convicted of, cautioned for or received a conditional caution for a motoring offence (other than a parking offence)?</label>
        <BooleanInput v-model="applicant.character_has_motoring_offences" />
        <RepeatableFields
          v-if="applicant.character_has_motoring_offences"
          v-model="applicant.character_motoring_offences"
          :component="repeatableFields.OffenceDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you ever received a penalty notice?</label>
        <BooleanInput v-model="applicant.character_has_penalty_notices" />
        <RepeatableFields
          v-if="applicant.character_has_penalty_notices"
          v-model="applicant.character_penalty_notices"
          :component="repeatableFields.OffenceDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you received any fixed penalty notices in the past 4 years?</label>
        <BooleanInput v-model="applicant.character_has_fixed_penalty_notices" />
        <RepeatableFields
          v-if="applicant.character_has_fixed_penalty_notices"
          v-model="applicant.character_fixed_penalty_notices"
          :component="repeatableFields.OffenceDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you received any endorsements ordered on your licence in the past 4 years?</label>
        <BooleanInput v-model="applicant.character_has_licence_endorsements" />
        <RepeatableFields
          v-if="applicant.character_has_licence_endorsements"
          v-model="applicant.character_licence_endorsements"
          :component="repeatableFields.OffenceDetails"
          class="mt-3"
        />
      </fieldset>

      <fieldset>
        <legend>Criminal offences</legend>
        <label>Have you ever been convicted of or cautioned for a criminal offence?</label>
        <BooleanInput v-model="applicant.character_has_criminal_offences" />
        <RepeatableFields
          v-if="applicant.character_has_criminal_offences"
          v-model="applicant.character_criminal_offences"
          :component="repeatableFields.OffenceDetails"
          class="mt-3"
        />
      </fieldset>

      <fieldset>
        <legend>Insolvency and debt</legend>

        <label>Have you ever been declared bankrupt?</label>
        <BooleanInput v-model="applicant.character_has_bankruptcies" />
        <RepeatableFields
          v-if="applicant.character_has_bankruptcies"
          v-model="applicant.character_bankruptcies"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you ever enter into an Individual Voluntary Arrangement (IVA)?</label>
        <BooleanInput v-model="applicant.character_has_ivas" />
        <RepeatableFields
          v-if="applicant.character_has_ivas"
          v-model="applicant.character_ivas"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you ever been sued in relation to any debt?</label>
        <BooleanInput v-model="applicant.character_has_sued_for_debts" />
        <RepeatableFields
          v-if="applicant.character_has_sued_for_debts"
          v-model="applicant.character_sued_for_debts"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you ever been a director of a company that has become insolvent?</label>
        <BooleanInput v-model="applicant.character_has_director_insolvencies" />
        <RepeatableFields
          v-if="applicant.character_has_director_insolvencies"
          v-model="applicant.character_director_insolvencies"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />
      </fieldset>

      <fieldset>
        <legend>VAT and tax</legend>

        <label>Have you or your company ever received a penalty for any VAT or tax assessments?</label>
        <BooleanInput v-model="applicant.character_has_tax_penalties" />
        <RepeatableFields
          v-if="applicant.character_has_tax_penalties"
          v-model="applicant.character_tax_penalties"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you or your company ever been penalised for submitting a late VAT or tax return, including through a county court?</label>
        <BooleanInput v-model="applicant.character_has_late_tax_returns" />
        <RepeatableFields
          v-if="applicant.character_has_late_tax_returns"
          v-model="applicant.character_late_tax_returns"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />
      </fieldset>

      <fieldset>
        <legend>Professional conduct</legend>

        <label>Have you or your company ever had a finding of professional negligence against you?</label>
        <BooleanInput v-model="applicant.character_has_professional_negligence" />
        <RepeatableFields
          v-if="applicant.character_has_professional_negligence"
          v-model="applicant.character_professional_negligence"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you or your company ever been involved in unfair or wrongful dismissal or discrimination or any other adverse civil proceedings against you?</label>
        <BooleanInput v-model="applicant.character_has_wrongful_dismissals" />
        <RepeatableFields
          v-if="applicant.character_has_wrongful_dismissals"
          v-model="applicant.character_wrongful_dismissals"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you or your company ever had a finding of professional misconduct against you?</label>
        <BooleanInput v-model="applicant.character_has_professional_misconduct" />
        <RepeatableFields
          v-if="applicant.character_has_professional_misconduct"
          v-model="applicant.character_professional_misconduct"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you or your company ever had a finding of inadequate professional service against you?</label>
        <BooleanInput v-model="applicant.character_has_inadequate_professional_service" />
        <RepeatableFields
          v-if="applicant.character_has_inadequate_professional_service"
          v-model="applicant.character_inadequate_professional_service"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you ever had any other type of complaint raised against you?</label>
        <BooleanInput v-model="applicant.character_has_other_complaints" />
        <RepeatableFields
          v-if="applicant.character_has_other_complaints"
          v-model="applicant.character_other_complaints"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />

        <label class="mt-3">Have you ever been asked to resign, or been dismissed from, employment or judicial office?</label>
        <BooleanInput v-model="applicant.character_has_dismissals" />
        <RepeatableFields
          v-if="applicant.character_has_dismissals"
          v-model="applicant.character_dismissals"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />
      </fieldset>

      <fieldset>
        <legend>Current investigations or proceedings</legend>
        <label>Are you involved in any current investigations?</label>
        <BooleanInput v-model="applicant.character_has_current_investigations" />
        <RepeatableFields
          v-if="applicant.character_has_current_investigations"
          v-model="applicant.character_current_investigations"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />
      </fieldset>

      <fieldset>
        <legend>Additional information</legend>
        <label class="mt-3">Is there anything else that is relevant to your character that you haven't already told us?</label>
        <div class="fieldset-text">
          For example, anything which might make a member of the public think you're unsuitable for this post
        </div>
        <BooleanInput v-model="applicant.character_has_other" />
        <RepeatableFields
          v-if="applicant.character_has_other"
          v-model="applicant.character_other"
          :component="repeatableFields.ConductDetails"
          class="mt-3"
        />
      </fieldset>

      <SaveAndContinueButtons
        :is-saving="isSaving"
        @saveAndContinue="saveAndContinue"
      />
    </form>
  </section>
</template>

<script>
import BooleanInput from '@/components/BooleanInput';
import RepeatableFields from '@/components/RepeatableFields';
import OffenceDetails from '@/views/RepeatableFields/OffenceDetails';
import ConductDetails from '@/views/RepeatableFields/ConductDetails';
import SaveAndContinueButtons from '@/components/SaveAndContinueButtons';

export default {
  components: {
    SaveAndContinueButtons,
    RepeatableFields,
    BooleanInput,
  },
  data() {
    return {
      applicant: this.$store.getters.applicant(),
      isSaving: false,
      repeatableFields: {
        OffenceDetails,
        ConductDetails,
      },
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
