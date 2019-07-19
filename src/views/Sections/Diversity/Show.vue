<template>
  <section class="card mb-3">
    <div class="card-header">
      <h2 class="card-title">Diversity</h2>
    </div>
    <div class="card-body">
      <table class="table mb-3">
        <tr>
          <th>
            Sharing my diversity data
          </th>
        </tr>
        <tr>
          <td v-if="applicant.diversity_sharing_consent">
            You may share my diversity data with the Ministry of Justice,
            Judicial Office and HM Courts and Tribunals Service (for monitoring
            purposes only)
          </td>
          <td v-else>
            Do NOT share my diversity data
          </td>
        </tr>
        <tr>
          <td>
            <RouterLink to="/apply/diversity" class="float-right">Change</RouterLink>
          </td>
        </tr>
      </table>

      <ShowSelectList
        changeLink="/apply/diversity"
        :hasOther="applicant.professional_background_has_other"
        :other="applicant.professional_background_other"
        title="What is your professional background?"
        :records="applicant.professional_background"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        :hasOther="applicant.current_legal_role_has_other"
        :other="applicant.current_legal_role_other"
        title="What is your current legal role?"
        :records="applicant.current_legal_role"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        title="Do you hold, or have you held in the past, a fee-paid judicial role?"
        :singleResponse ="applicant.fee_paid_judicial"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        title="Between the ages 11 to 18, did you mainly attend a state or fee-paying school?"
        :singleResponse ="applicant.school_type"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        title="Did you go to university and if so, were you the first generation from your family to go?"
        :singleResponse ="applicant.university_attendance"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        title="What is your ethnic group?"
        :other="applicant.ethnicity_other"
        :singleResponse ="applicant.ethnicity"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        title="What is your gender?"
        :singleResponse ="applicant.gender"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        title="Is your gender identity the same as the gender you were assigned at birth?"
        :singleResponse ="applicant.gender_same_as_birth"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        title="How would you describe your sexual orientation?"
        :singleResponse ="applicant.sexual_orientation"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        title="Do you have a disability, as defined by the Equality Act 2010?"
        :singleResponse ="applicant.disability"
        />

      <ShowSelectList
        changeLink="/apply/diversity"
        title="What is your religion or belief?"
        :other="applicant.religion_other"
        :singleResponse ="applicant.religion"
        />

    </div>
  </section>
</template>

<script>
import ShowSelectList from '@/components/SelectList/Show';

export default {
  components: {
    ShowSelectList,
  },
  data() {
    return {
      applicant: this.$store.getters.applicant(),
    };
  },
};
</script>
