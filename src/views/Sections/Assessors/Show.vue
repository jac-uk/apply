<template>
  <section class="card mb-3">
    <div class="card-header">
      <h3 class="card-title">
        Your assessors
      </h3>
    </div>

    <div class="card-body">
      <table
        v-for="assessor in applicant.assessors"
        :key="assessor.id"
        class="table mb-6"
      >
        <tbody>
          <tr>
            <th>Assessor Type</th>
            <td>{{ assessor.type }}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{{ assessor.name }}</td>
          </tr>
          <tr>
            <th>Relationship</th>
            <td>{{ assessor.relationship }}</td>
          </tr>
          <tr>
            <th>Position</th>
            <td>{{ assessor.position }}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{{ assessor.email }}</td>
          </tr>
          <tr>
            <th>Phone:</th>
            <td>{{ assessor.phone }}</td>
          </tr>
          <tr>
            <td colspan="10">
              <RouterLink
                to="/apply/assessors"
                class="float-right"
              >
                Change
              </RouterLink>
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
