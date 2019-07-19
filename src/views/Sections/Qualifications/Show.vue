<template>
  <section class="card mb-3">
    <div class="card-header">
      <h3 class="card-title">Qualifications</h3>
    </div>

    <div class="card-body">

      <h4>Qualifications</h4>
      <table class="table" v-for="qualification in applicant.qualifications" :key="qualification.qualification">
        <tbody>
          <tr>
            <th scope="row">Qualification</th>
            <td>{{qualification.qualification}}</td>
          </tr>
          <tr>
            <th scope="row">College or university</th>
            <td>{{qualification.college}}</td>
          </tr>
          <tr>
            <th scope="row">Qualification date</th>
            <td>{{ qualification.date.toLocaleDateString() }}</td>
          </tr>
          <tr>
            <td colspan="2">
              <RouterLink to="/apply/qualifications" class="float-right">Change</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

    <table class="table">
      <tbody>
        <tr>
          <th scope="row">Qualified profession</th>
          <td>{{ applicant.qualified_profession }}</td>
          <td>
            <RouterLink to="/apply/qualifications">Change</RouterLink>
          </td>
        </tr>
        <tr>
          <th scope="row">Where did you qualify?</th>
          <td>{{ applicant.location_qualified }}</td>
          <td>
            <RouterLink to="/apply/qualifications">Change</RouterLink>
          </td>
        </tr>

        <tr v-if="applicant.qualified_profession === 'Solicitor'">
          <th scope="row">When were you entered on the Roll?</th>
          <td v-if="applicant.solicitor_date_on_roll">
            {{ applicant.solicitor_date_on_roll.toLocaleDateString() }}
          </td>
          <td v-else></td>
          <td>
            <RouterLink to="/apply/qualifications">Change</RouterLink>
          </td>
        </tr>

        <tr v-if="applicant.qualified_profession === 'Advocate'">
          <th scope="row">When were you called to the Faculty?</th>
          <td v-if="applicant.advocate_date_called_to_faculty">
            {{ applicant.advocate_date_called_to_faculty.toLocaleDateString() }}
          </td>
          <td v-else></td>
          <td>
            <RouterLink to="/apply/qualifications">Change</RouterLink>
          </td>
        </tr>

        <tr v-if="applicant.qualified_profession === 'Barrister'">
          <th scope="row">When were you called to the Bar?</th>
          <td v-if="applicant.barrister_date_called_to_bar">
            {{ applicant.barrister_date_called_to_bar.toLocaleDateString() }}
          </td>
          <td v-else></td>
          <td>
            <RouterLink to="/apply/qualifications">Change</RouterLink>
          </td>
        </tr>

        <tr v-if="applicant.qualified_profession === 'Barrister' && applicant.location_qualified !== 'Northern Ireland'">
          <th scope="row">Have you completed pupillage?</th>
          <td>{{ applicant.barrister_completed_pupillage ? "Yes" : "No" }}</td>
          <td>
            <RouterLink to="/apply/qualifications">Change</RouterLink>
          </td>
        </tr>

        <tr v-if="applicant.qualified_profession === 'Barrister' && applicant.location_qualified !== 'Northern Ireland' && applicant.barrister_completed_pupillage">
          <th scope="row">When did you complete pupillage?</th>
          <td>
            {{ applicant.barrister_date_completed_pupillage.toLocaleDateString() }}
          </td>
          <td>
            <RouterLink to="/apply/qualifications">Change</RouterLink>
          </td>
        </tr>

        <tr v-if="applicant.qualified_profession === 'Barrister' && applicant.location_qualified !== 'Northern Ireland' && !applicant.barrister_completed_pupillage">
          <th scope="row">Why didn’t you complete pupillage?</th>
          <td>{{ applicant.barrister_reason_pupillage_not_completed }}</td>
          <td>
            <RouterLink to="/apply/qualifications">Change</RouterLink>
          </td>
        </tr>

        <tr v-if="applicant.qualified_profession === 'Barrister' && applicant.location_qualified !== 'Northern Ireland' && !applicant.barrister_completed_pupillage">
          <th scope="row">Do you have an exemption certificate?</th>
          <td>
            <p>{{ applicant.barrister_has_pupillage_exemption_certificate ? "Yes" : "No" }}</p>
            <p v-if="applicant.barrister_has_pupillage_exemption_certificate">
              Email your certificate to
              <a href="mailto:dcj128@judicialappointments.gov.uk">dcj128@judicialappointments.gov.uk</a>
            </p>
          </td>
          <td>
            <RouterLink to="/apply/qualifications">Change</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      applicant: this.$store.getters.applicant(),
      isSaving: false,
    };
  },
};
</script>

<style scoped>
  th {
    width: 40%;
  }
</style>
