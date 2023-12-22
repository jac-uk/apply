<!-- comment out below until we get feedback from users -->
<!-- <template>
  <div class="govuk-grid-column-two-thirds govuk-!-margin-top-8">
    <div class="govuk-panel govuk-panel--confirmation">
      <h1 class="govuk-panel__title">
        Consent to character checks submitted
      </h1>
    </div>
    <h2 class="govuk-heading-m govuk-!-margin-top-6">
      What happens next
    </h2>
    <p class="govuk-body">
      This information will be used by the Judicial Appointments Commission to undertake character checks.
    </p>
    <p class="govuk-body">
      We may get in touch to ask for more information. In the meantime refer to the timeline, given in your exercise to understand the next steps ahead.
    </p>
    <p class="govuk-body">
      If your circumstances change after submitting this form that might impact your ability to meet the good character requirements please notify the
      <a
        :href="`mailto:${vacancy.exerciseMailbox}?subject=Re: ${vacancy.referenceNumber}`"
        class="govuk-link"
      >Selection Exercise Team</a>.
    </p>
    <p class="govuk-body">
      Any personal data collected and processed is in accordance with the <a
        href="https://judicialappointments.gov.uk/data-protection-freedom-of-information-and-making-requests-for-your-data/"
        class="govuk-link"
        target="_blank"
      >JAC's privacy standards</a>.
    </p>
    <p class="govuk-body govuk-!-margin-top-6">
      <RouterLink
        :to="{ name: 'applications' }"
      >
        Return to your applications
      </RouterLink>
    </p>
  </div>
</template> -->

<script>
import CandidateFormsMixIn from '@/views/Apply/Forms/CandidateFormsMixIn';
import { APPLICATION_FORM_PARTS } from '@/helpers/constants';

export default {
  name: 'FormSubmitted',
  mixins: [CandidateFormsMixIn],
  computed: {
    vacancy() {
      return this.$store.state.vacancy.record;
    },
  },
  mounted() {
    // back to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
  created() {
    this.setupPart(APPLICATION_FORM_PARTS.CHARACTER_CHECKS);
    this.save();
  },
};
</script>
