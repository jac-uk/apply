<template>
  <div>
    <div class="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-6">
      <h1 class="govuk-panel__title">
        Test Submitted
      </h1>
      Your test has been submitted and is now complete.
    </div>

    <div class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-6">
      Next Steps

      <p class="govuk-body-m govuk-!-margin-top-0">
        You will be informed of the outcome of your test, as indicated on the
        <router-link
          v-if="qualifyingTestResponse.vacancy"
          class="govuk-link"
          :to="`/vacancy/${qualifyingTestResponse.vacancy.id}`"
        >
          vacancy timeline
        </router-link>
        <span v-else>vacancy timeline</span>.
        <br>
        You may now close this page, return to the
        <router-link
          class="govuk-link"
          to="/"
        >
          homepage
        </router-link>
        or go back to
        <router-link
          class="govuk-link"
          :to="{ name: 'qualifying-tests' }"
        >
          your online tests.
        </router-link>
      </p>
    </div>
    <div
      v-if="upcomingTest"
      class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-6"
    >
      <p class="govuk-body">
        You have another online test to complete:
      </p>

      <div class="govuk-inset-text">
        <ul class="govuk-list">
          <li>
            <RouterLink
              :to="{ name: 'qualifying-test-information', params: { qualifyingTestId: upcomingTest.id }}"
            >
              {{ upcomingTest.qualifyingTest.title }}<br>
            </RouterLink>
            <strong class="red-text">
              by {{ endTime(upcomingTest) }}
            </strong>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-else-if="qualifyingTestResponse.qualifyingTest.feedbackSurvey"
    >
      <Banner
        status="information"
      >
        <template>
          <a
            :href="qualifyingTestResponse.qualifyingTest.feedbackSurvey"
            class="govuk-link info-link--submitted--banner--click-here-to-fill-out-our-feedback-survey"
          >
            Click here to fill out our feedback survey
          </a>
        </template>
      </Banner>
    </div>
  </div>
</template>
<script>
import Banner from '@/components/Page/Banner';
import { isToday, formatDate } from '@/helpers/date';
import { QUALIFYING_TEST_RESPONSE } from '@/helpers/constants';

export default {
  components: {
    Banner,
  },
  computed: {
    qualifyingTestResponse() {
      return this.$store.state.qualifyingTestResponse.record;
    },
    qualifyingTestResponses() {
      return this.$store.state.qualifyingTestResponses.records;
    },
    upcomingTest() {
      return this.qualifyingTestResponses.find((qt) => {
        if (
          this.notThisTest(qt) &&
          this.sameVacancyID(qt) &&
          this.isReadyToStart(qt)
        ) {
          return true;
        }
      });
    },
  },
  created() {
    this.$store.dispatch('qualifyingTestResponses/bind');
  },
  methods: {
    endTime(qualifyingTest) {
      const time = formatDate(qualifyingTest.qualifyingTest.endDate, 'time');
      const day = formatDate(qualifyingTest.qualifyingTest.endDate);
      return isToday(qualifyingTest.qualifyingTest.endDate) ? `${time} today` : `${time} on ${day}`;
    },
    sameVacancyID(qt) {
      if (qt.vacancy && this.$store.state.qualifyingTestResponse.record.vacancy) {
        return qt.vacancy.id === this.$store.state.qualifyingTestResponse.record.vacancy.id;
      } else {
        return false;
      }
    },
    notThisTest(qt) {
      return qt.id !== this.$store.state.qualifyingTestResponse.record.id;
    },
    isReadyToStart(qt) {
      return qt.status === QUALIFYING_TEST_RESPONSE.STATUS.ACTIVATED;
    },
  },
};
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
  .govuk-inset-text {
    border-color: red;
  }
  .red-text {
    color: red;
  }
</style>
