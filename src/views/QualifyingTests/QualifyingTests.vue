<template>
  <div class="govuk-grid-row">
    <LoadingMessage
      v-if="loaded === false"
      :load-failed="loadFailed"
    />
    <template v-else>
      <div class="govuk-grid-column-one-quarter">
        <nav
          class="moj-side-navigation"
          aria-label="Side navigation"
        >
          <ul class="moj-side-navigation__list">
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-qualifying-tests--vacancies"
                :to="{ name: 'vacancies' }"
              >
                Vacancies
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-qualifying-tests--applications"
                :to="{ name: 'applications' }"
              >
                Applications
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item moj-side-navigation__item--active">
              <RouterLink
                class="govuk-link info-link--nav-qualifying-tests--qualifying-tests"
                aria-current="page"
                :to="{ name: 'qualifying-tests' }"
              >
                Online tests
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Online tests
        </h1>

        <TabsList
          :tabs="tabs"
          :active-tab.sync="activeTab"
        />
        <div
          class="govuk-tabs__panel"
          role="tabpanel"
        >
          <h1>{{ activeTab | capitalize }}</h1>

          <Table
            data-key="id"
            :data="getSelectedTableData()"
            :columns="getSelectedTableColumns()"
          >
            <template #row="{row}">
              <TableCell>
                <RouterLink
                  v-if="activeTab === 'open'"
                  :to="{ path: `/online-tests/${row.id}/information` }"
                  :class="`info-btn--qualifying-tests--to--${row.id}`"
                >
                  {{ row.qualifyingTest.title }}
                </RouterLink>
                <template v-else>
                  {{ row.qualifyingTest.title }}
                </template>
              </TableCell>
              <TableCell>{{ status(row) | lookup }}</TableCell>
              <TableCell>
                <template v-if="activeTab === 'future'">
                  {{ prettyDate(row.qualifyingTest.startDate) }}
                </template>
                <template v-else>
                  {{ prettyDate(row.qualifyingTest.endDate) }}
                </template>
              </TableCell>
              <TableCell
                v-if="activeTab === 'past' && showFeedbackColumn"
              >
                <a
                  v-if="row.qualifyingTest.feedbackSurvey"
                  :href="row.qualifyingTest.feedbackSurvey"
                  :class="`govuk-link info-btn--qualifying-tests--feedback-${row.id}--click-here`"
                >
                  Click here
                </a>
                <span
                  v-else
                >
                  ---
                </span>
              </TableCell>
            </template>
          </Table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TabsList from '@/components/Page/TabsList';
import Table from '@/components/Page/Table/Table';
import TableCell from '@/components/Page/Table/TableCell';
import LoadingMessage from '@/components/LoadingMessage';
import { isToday, isDateInFuture, formatDate, helperTimeLeft } from '@/helpers/date';
import { QUALIFYING_TEST } from '@/helpers/constants';

export default {
  components: {
    TabsList,
    Table,
    TableCell,
    LoadingMessage,
  },
  data(){
    return {
      loaded: false,
      loadFailed: false,
      activeTab: 'open',
      tabs: [
        {
          ref: 'open',
          title: 'Open',
        },
        {
          ref: 'future',
          title: 'Future',
        },
        {
          ref: 'past',
          title: 'Past',
        },
      ],
    };
  },
  computed: {
    showFeedbackColumn() {
      return this.closedTests.some((element) => element.qualifyingTest.feedbackSurvey);
    },
    qualifyingTestResponses() {
      return this.$store.state.qualifyingTestResponses.records.concat(this.$store.state.qualifyingTestResponses.dryRuns).filter((qt, index, qts) => qts.findIndex(i => i.id === qt.id) === index);
    },
    openTests(){
      return this.qualifyingTestResponses.filter(qt => {
        const timeout = this.isTimeOut(qt.status, qt.statusLog.completed, this.isTimeLeft(qt));
        const startEndNotInFuture = !isDateInFuture(qt.qualifyingTest.startDate) && isDateInFuture(qt.qualifyingTest.endDate);
        const activatedOrStarted = qt.status === QUALIFYING_TEST.STATUS.ACTIVATED || qt.status === QUALIFYING_TEST.STATUS.STARTED;
        return startEndNotInFuture && activatedOrStarted && !timeout;
      });
    },
    futureTests(){
      return this.qualifyingTestResponses.filter(qt => (
        (isDateInFuture(qt.qualifyingTest.startDate) || (
          isDateInFuture(qt.qualifyingTest.endDate) && qt.status === QUALIFYING_TEST.STATUS.CREATED
        ))
      ));
    },
    closedTests(){
      return this.qualifyingTestResponses.filter(qt => {
        const timeout = this.isTimeOut(qt.status, qt.statusLog.completed, this.isTimeLeft(qt));
        const pastDateAndCompleted = (!isDateInFuture(qt.qualifyingTest.endDate) || qt.status == QUALIFYING_TEST.STATUS.COMPLETED);
        return timeout || pastDateAndCompleted;
      });
    },
  },
  async mounted() {
    this.qualifyingTest;
    try {
      await this.$store.dispatch('qualifyingTestResponses/bind');
      await this.$store.dispatch('qualifyingTestResponses/bindDryRuns');
      this.loaded = true;
    } catch (e) {
      this.loadFailed = true;
      throw e;
    }
  },
  destroyed() {
    this.$store.dispatch('qualifyingTestResponses/unbind');
    this.$store.dispatch('qualifyingTestResponses/unbindDryRuns');
  },
  methods: {
    status(obj) {
      const startedOrCompleted = obj.status === QUALIFYING_TEST.STATUS.STARTED || obj.status === QUALIFYING_TEST.STATUS.COMPLETED;
      const timeout = this.isTimeOut(obj.status, obj.statusLog.completed, this.isTimeLeft(obj));

      if (timeout) {
        return 'Completed - Out of time';
      }

      if (startedOrCompleted) {
        return obj.status;
      }

      return QUALIFYING_TEST.STATUS.NOT_STARTED;
    },
    prettyDate(date) {
      const time = formatDate(date, 'time');
      const day = formatDate(date);
      return isToday(date) ? `${time} today` : `${time} on ${day}`;
    },
    getSelectedTableData() {
      switch (this.activeTab){
      case 'open':
        return this.openTests;
      case 'future':
        return this.futureTests;
      case 'past':
        return this.closedTests;
      default:
        return [];
      }
    },
    getSelectedTableColumns() {
      const result = [
        { title: 'Title' },
        { title: 'Status' },
        { title: this.activeTab === 'future' ? 'Start' : 'Deadline' },
      ];
      if (this.activeTab === 'past' && this.showFeedbackColumn) {
        result.push({ title: 'Feedback Survey' });
      }
      return result;
    },
    isTimeLeft(qt) {
      return helperTimeLeft(qt) > 0;
    },
    isTimeOut(testStatus, logCompleted, isTimeLeft) {
      const timeout = (testStatus == QUALIFYING_TEST.STATUS.STARTED && logCompleted === null && !isTimeLeft);
      return timeout;
    },
  },
};
</script>

<style type="text/css" rel="stylesheet/scss" lang="scss" scoped>
.govuk-tabs {
  margin-bottom: 0;
}
.govuk-tabs__panel {
  margin-bottom: 10px;
  padding: 20px 20px;
  border: 1px solid #b1b4b6;
  border-top: 0;
}
</style>
