<template>
  <section class="card mb-3">
    <div class="card-header">
      <h3 class="card-title">
        Your Character
      </h3>
    </div>
    <div class="card-body">
      <h4>Motoring Offences</h4>
      <CharacterTable
        title="Have you ever been convicted of, cautioned for or received a
        conditional caution for a motoring offence (other than a parking
        offence)?"
        :records="applicant.character_motoring_offences"
        :answered-yes="applicant.character_has_motoring_offences"
      />
      <CharacterTable
        title="Have you ever received a penalty notice?"
        :answered-yes="applicant.character_has_penalty_notices"
        :records="applicant.character_penalty_notices"
      />
      <CharacterTable
        title="Have you received any fixed penalty notices in the past 4 years?"
        :answered-yes="applicant.character_has_fixed_penalty_notices"
        :records="applicant.character_fixed_penalty_notices"
      />
      <CharacterTable
        title="Have you received any endorsements ordered on your licence in the past 4 years?"
        :answered-yes="applicant.character_has_licence_endorsements"
        :records="applicant.character_licence_endorsements"
      />

      <h4>Criminal Offences</h4>
      <CharacterTable
        title="Have you ever been convicted of or cautioned for a criminal offence?"
        :answered-yes="applicant.character_has_criminal_offences"
        :records="applicant.character_criminal_offences"
      />

      <h4>
        Insolvency and debt
      </h4>
      <CharacterTable
        title="Have you ever been declared bankrupt?"
        :answered-yes="applicant.character_has_bankruptcies"
        :records="applicant.character_bankruptcies"
      />
      <CharacterTable
        title="Have you ever enter into an Individual Voluntary Arrangement (IVA)?"
        :answered-yes="applicant.character_has_ivas"
        :records="applicant.character_ivas"
      />
      <CharacterTable
        title="Have you ever been sued in relation to any debt?"
        :answered-yes="applicant.character_has_sued_for_debts"
        :records="applicant.character_sued_for_debts"
      />
      <CharacterTable
        title="Have you ever been a director of a company that has become insolvent?"
        :answered-yes="applicant.character_has_director_insolvencies"
        :records="applicant.character_director_insolvencies"
      />

      <h4>VAT and tax</h4>
      <CharacterTable
        title="Have you or your company ever received a penalty for any VAT or tax assessments?"
        :answered-yes="applicant.character_has_tax_penalties"
        :records="applicant.character_tax_penalties"
      />
      <CharacterTable
        title="Have you or your company ever been penalised for submitting a late VAT or tax return, including through a county court?"
        :answered-yes="applicant.character_has_late_tax_returns"
        :records="applicant.character_late_tax_returns"
      />
      <CharacterTable
        title="Have you or your company ever been penalised for submitting a late VAT or tax return, including through a county court?"
        :answered-yes="applicant.character_has_late_tax_returns"
        :records="applicant.character_late_tax_returns"
      />

      <h4>Professional conduct</h4>
      <CharacterTable
        title="Have you or your company ever had a finding of professional negligence against you?"
        :answered-yes="applicant.character_has_professional_negligence"
        :records="applicant.character_professional_negligence"
      />
      <CharacterTable
        title="Have you or your company ever been involved in unfair or wrongful dismissal or discrimination or any other adverse civil proceedings against you?"
        :answered-yes="applicant.character_has_wrongful_dismissals"
        :records="applicant.character_wrongful_dismissals"
      />
      <CharacterTable
        title="Have you or your company ever had a finding of professional misconduct against you?"
        :answered-yes="applicant.character_has_professional_misconduct"
        :records="applicant.character_professional_misconduct"
      />
      <CharacterTable
        title="Have you or your company ever had a finding of professional misconduct against you?"
        :answered-yes="applicant.character_has_professional_misconduct"
        :records="applicant.character_professional_misconduct"
      />
      <CharacterTable
        title="Have you or your company ever had a finding of inadequate professional service against you?"
        :answered-yes="applicant.character_has_inadequate_professional_service"
        :records="applicant.character_inadequate_professional_service"
      />
      <CharacterTable
        title="Have you ever had any other type of complaint raised against you?"
        :answered-yes="applicant.character_has_other_complaints"
        :records="applicant.character_other_complaints"
      />
      <CharacterTable
        title="Have you ever been asked to resign, or been dismissed from, employment or judicial office?"
        :answered-yes="applicant.character_has_dismissals"
        :records="applicant.character_dissmissals"
      />

      <h4>Current investigations or proceedings</h4>
      <CharacterTable
        title="Are you involved in any current investigations?"
        :answered-yes="applicant.character_has_current_investigations"
        :records="applicant.character_current_investigations"
      />

      <h4>Additional information</h4>
      <CharacterTable
        title="Is there anything else that is relevant to your character that you haven't already told us?"
        :answered-yes="applicant.character_has_other"
        :records="applicant.character_other"
      />
    </div>
  </section>
</template>

<script>
import CharacterTable from '@/components/Review/CharacterTable';

export default {
  components: {
    CharacterTable,
  },
  data() {
    return {
      applicant: this.$store.getters.applicant(),
    };
  },
};
</script>
