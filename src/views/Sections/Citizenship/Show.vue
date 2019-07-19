<template>
  <section class="card mb-3">
    <div class="card-header">
      <h3 class="card-title">Citizenship</h3>
    </div>

    <div class="card-body">
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">What is your citizenship?</th>
            <td>{{ options[applicant.citizenship] }}</td>
            <td>
              <RouterLink to="/apply/citizenship">Change</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="applicant.citizenship === 'Non-Commonwealth'" class="mt-3">
        Email <a href="mailto:dcj128@judicialappointments.gov.uk">dcj128@judicialappointments.gov.uk</a> to provide further details
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      applicant: this.$store.getters.applicant(),
      options: {
        'British': 'I am a citizen of the United Kingdom',
        'Irish': 'I am a citizen of the Republic of Ireland',
        'Commonwealth': 'I am a citizen of another Commonwealth country',
        'Non-Commonwealth': 'I am none of these',
      },
    };
  },
};
</script>
