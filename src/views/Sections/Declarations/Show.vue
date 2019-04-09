<template>
  <section class="card mb-3">
    <div class="card-header">
      <h3 class="card-title">Declarations</h3>
    </div>
    <BooleanWithCheckboxes
      changeLink="/apply/declarations"
      :other="applicant.how_do_you_know_the_commissioners"
      otherCaption="How do you know them?"
      title="Are you related to, or known to any of the JAC Commissioners?"
      :answeredYes="applicant.are_you_known_to_the_commissioners"
      :records="applicant.known_to_commissioners"
      />
  </section>
</template>

<script>
import BooleanWithCheckboxes from '@/components/Review/BooleanWithCheckboxes';

export default {
  components: {
    BooleanWithCheckboxes,
  },
  data() {
    return {
      applicant: this.$store.getters.applicant()
    }
  },
}
</script>
