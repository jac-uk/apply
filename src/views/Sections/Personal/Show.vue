<template>
  <section class="card mb-3">
    <div class="card-header">
      <h3 class="card-title">Personal Details</h3>
    </div>
    <div class="card-body">
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">Full Name</th>
            <td>{{ applicant.full_name }}</td>
            <td>
              <RouterLink to="/apply/personal">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Preferred Name</th>
            <td>{{ applicant.preferred_name }}</td>
            <td>
              <RouterLink to="/apply/personal">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Date of Birth</th>
            <td>{{ applicant.date_of_birth.toLocaleDateString() }}</td>
            <td>
              <RouterLink to="/apply/personal">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">National Insurance Number</th>
            <td>{{ applicant.national_insurance }}</td>
            <td>
              <RouterLink to="/apply/personal">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Telephone Number</th>
            <td>{{ applicant.phone }}</td>
            <td>
              <RouterLink to="/apply/personal">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Your Address</th>
            <td>
              <p v-if="applicant.address_line_1">{{ applicant.address_line_1 }}</p>
              <p v-if="applicant.address_line_2">{{ applicant.address_line_2 }}</p>
              <p v-if="applicant.address_town">{{ applicant.address_town }}</p>
              <p v-if="applicant.address_county">{{ applicant.address_county }}</p>
              <p v-if="applicant.address_postcode">{{ applicant.address_postcode }}</p>
            </td>
            <td>
              <RouterLink to="/apply/personal">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Reasonable Adjustments</th>
            <td>
              {{ applicant.reasonable_adjustments ? "Yes" : "No" }}
            </td>
            <td>
              <RouterLink to="/apply/personal">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Reasonable Adjustments Details</th>
            <td>
              {{ applicant.reasonable_adjustments_details }}
            </td>
            <td>
              <RouterLink to="/apply/personal">Change</RouterLink>
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
  }
}
</script>

<style scoped>
p { margin-bottom: 0!important }
</style>
