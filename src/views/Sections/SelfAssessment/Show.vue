<template>
  <section class="card mb-3">
    <div class="card-header">
      <h3 class="card-title">Your Self Assessment</h3>
    </div>

    <div class="card-body">
      <h4>Self assessment</h4>
      <table class="table long-answers">
        <tbody>
          <tr>
            <th scope="row">Leadership</th>
            <td>{{ application.competency_leadership }}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Exercising Judgement</th>
            <td>{{ application.competency_exercising_judgement }}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Possessing and Building Knowledge</th>
            <td>{{ application.competency_possessing_and_building_knowledge }}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Assimilating and Clarifying Information</th>
            <td>{{ application.competency_assimilating_and_clarifying_information }}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Working and Communicating with Others</th>
            <td>{{ application.competency_working_and_communicating_with_others }}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
            </td>
          </tr>
          <tr>
            <th scope="row">Managing Work Effectively</th>
            <td>{{ application.competency_managing_work_effectively }}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Additional Selection Criterion</h4>
      <table class="table long-answers">
        <tbody>
          <tr>
            <th scope="row">Provide details of how you meet this requirement</th>
            <td>{{ application.additional_selection_criteria}}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Reasonable Length of Service</h4>
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">Are you able to provide 3 years’ service?</th>
            <td>{{ application.length_of_service_accepted ? 'Yes' : 'No' }}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
            </td>
          </tr>
          <tr v-if="application.length_of_service_accepted === false">
            <th scope="row">Provide any mitigation you’d like considered</th>
            <td>{{ application.length_of_service_mitigation }}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Authorisations</h4>
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">Do you currently have a Section 9(1) authorisation?</th>
            <td>{{ application.has_section_9_1_authorisation ? "Yes" : "No" }}</td>
            <td>
              <RouterLink to="/apply/self-assessment">Change</RouterLink>
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
        application: this.$store.getters.application(),
      };
    }
  }
</script>

<style scoped>
  th {
    width: 50%;
  }
  .long-answers th {
    width: 30%;
  }
</style>
