<template>
  <section class="card mb-3">
    <div class="card-header">
      <h2 class="card-title">
        Diversity
      </h2>
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
            <RouterLink
              to="/apply/diversity"
              class="float-right"
            >
              Change
            </RouterLink>
          </td>
        </tr>
      </table>

      <ShowSelectList
        change-link="/apply/diversity"
        :has-other="applicant.professional_background_has_other"
        :other="applicant.professional_background_other"
        title="What is your professional background?"
        :records="applicant.professional_background"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        :has-other="applicant.current_legal_role_has_other"
        :other="applicant.current_legal_role_other"
        title="What is your current legal role?"
        :records="applicant.current_legal_role"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        title="Do you hold, or have you held in the past, a fee-paid judicial role?"
        :single-response="applicant.fee_paid_judicial"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        title="Between the ages 11 to 18, did you mainly attend a state or fee-paying school?"
        :single-response="applicant.school_type"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        title="Did you go to university and if so, were you the first generation from your family to go?"
        :single-response="applicant.university_attendance"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        title="What is your ethnic group?"
        :other="applicant.ethnicity_other"
        :single-response="applicant.ethnicity"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        title="What is your gender?"
        :single-response="applicant.gender"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        title="Is your gender identity the same as the gender you were assigned at birth?"
        :single-response="applicant.gender_same_as_birth"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        title="How would you describe your sexual orientation?"
        :single-response="applicant.sexual_orientation"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        title="Do you have a disability, as defined by the Equality Act 2010?"
        :single-response="applicant.disability"
      />

      <ShowSelectList
        change-link="/apply/diversity"
        title="What is your religion or belief?"
        :other="applicant.religion_other"
        :single-response="applicant.religion"
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
