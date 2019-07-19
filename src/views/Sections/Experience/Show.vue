<template>
  <section class="card mb-3">
    <div class="card-header">
      <h3 class="card-title">Experience</h3>
    </div>

    <div class="card-body">
      <table class="table mb-3" v-for="exp in applicant.experience" :key="exp.title">
        <tbody>
          <tr>
            <th scope="row">Title</th>
            <td>{{ exp.title }}</td>
          </tr>
          <tr>
            <th scope="row">Date from</th>
            <td>{{ exp.date_from.toLocaleDateString() }}</td>
          </tr>
          <tr>
            <th scope="row">Date to</th>
            <td v-if="exp.currently_in_job">I currently work in this job</td>
            <td v-else>{{ exp.date_to.toLocaleDateString() }}</td>
          </tr>
          <tr>
            <th scope="row">Judicial appointment?</th>
            <td>{{ exp.is_judicial_appointment ? 'Yes' : 'No' }}</td>
          </tr>
        </tbody>
        <tbody v-if="exp.is_judicial_appointment">
          <tr>
            <th scope="row">Salaried or fee-paid?</th>
            <td>{{ exp.appointment_type }}</td>
          </tr>
          <tr>
            <th scope="row">Jurisdiction</th>
            <td>{{ exp.jurisdiction }}</td>
          </tr>
          <tr>
            <th scope="row">Circuit</th>
            <td>{{ exp.circuit }}</td>
          </tr>
          <tr>
            <th scope="row">Days sat in appointment</th>
            <td>{{ exp.days_sat }}</td>
          </tr>
        </tbody>
        <tbody v-if="!exp.is_judicial_appointment">
          <tr>
            <th scope="row">In Government Legal Service or Crown Prosecution Service?</th>
            <td>{{ exp.is_public_employee ? 'Yes' : 'No' }}</td>
          </tr>
          <tr>
            <th scope="row">Company or organisation</th>
            <td>{{ exp.company }}</td>
          </tr>
          <tr>
            <th scope="row">Law-related activities</th>
            <td>
              <ul>
                <li v-for="activity in exp.activities" :key="activity">
                  {{ activity }}
                </li>
                <li v-if="exp.activities_has_other">
                  Other: {{exp.activities_other}}
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th scope="row">Main duties</th>
            <td>{{ exp.main_duties }}</td>
          </tr>
          <tr>
            <th scope="row">Specialism/s</th>
            <td>{{ exp.specialisms }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <RouterLink to="/apply/experience" class="float-right">Change</RouterLink>
            </td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th scope="row">Have you had and gaps in employment?</th>
            <td>{{ applicant.has_gaps_in_employment ? "Yes" : "No" }}</td>
            <td>
              <RouterLink to="/apply/experience">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Law-related activities during gaps</th>
            <td>
              <ul>
                <li v-for="activity in applicant.gaps_in_employment_activities" :key="activity">
                  {{ activity }}
                </li>
                <li v-if="applicant.gaps_in_employment_activities_has_other">
                  Other: {{applicant.gaps_in_employment_activities_other}}
                </li>
              </ul>
            </td>
            <td>
              <RouterLink to="/apply/experience">Change</RouterLink>
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
    };
  },
};
</script>

<style scoped>
  th {
    width: 40%;
  }
  tbody + tbody {
    border-top: 0;
  }
  ul {
    padding-left: 1.2rem;
  }
</style>
