<template>
  <section class="card">
    <div class="card-header">
      <h2 class="card-title">Outreach</h2>
    </div>
    <div class="card-body">

      <ShowSelectList
        changeLink="/apply/outreach"
        :hasOther="applicant.how_did_you_hear_has_other"
        title="How did you hear about this vacancy?"
        :records="applicant.how_did_you_hear"
        />

      <ShowSelectList
        changeLink="/apply/outreach"
        title="Have you attended an outreach event on JAC selection exercises?"
        :singleResponse ="applicant.has_attended_outreach_event"
        />

      <ShowSelectList
        changeLink="/apply/outreach"
        title="Did you participate in a Judicial Work Shadowing Scheme?"
        :singleResponse ="applicant.participated_in_judicial_work_shadowing_scheme"
        />
    </div>
  </section>
</template>

<script>
import ShowSelectList from '@/components/SelectList/Show';

export default {
  components: {
    ShowSelectList
  },
  data() {
    return {
      applicant: this.$store.getters.applicant(),
    };
  },
}
</script>
