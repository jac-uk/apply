<template>
  <section class="card mb-3">
    <div class="card-header">
      <h2 class="card-title">
        Outreach
      </h2>
    </div>
    <div class="card-body">
      <ShowSelectList
        change-link="/apply/outreach"
        :has-other="applicant.how_did_you_hear_has_other"
        title="How did you hear about this vacancy?"
        :records="applicant.how_did_you_hear"
      />

      <table class="table">
        <tbody>
          <tr>
            <th scope="row">
              Have you attended an outreach event on JAC selection exercises?
            </th>
            <td>{{ applicant.has_attended_outreach_event ? "Yes" : "No" }}</td>
            <td>
              <RouterLink to="/apply/outreach">
                Change
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th scope="row">
              Have you taken part in the Judicial Work Shadowing Scheme?
            </th>
            <td>{{ applicant.taken_part_in_judicial_work_shadowing_scheme ? "Yes" : "No" }}</td>
            <td>
              <RouterLink to="/apply/outreach">
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
