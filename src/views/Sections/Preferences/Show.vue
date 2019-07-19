<template>
  <section class="card mb-3">
    <div class="card-header">
      <h3 class="card-title">Preferences</h3>
    </div>
    <BooleanWithCheckboxes
      title="Are you interested in salaried part-time working?"
      subtitle="What sitting patterns are you interested in?"
      changeLink="/apply/preferences"
      :answeredYes="applicant.work_part_time"
      :records="applicant.sitting_patterns"
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
      applicant: this.$store.getters.applicant(),
    };
  },
};
</script>
