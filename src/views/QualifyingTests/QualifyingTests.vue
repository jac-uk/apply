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
                class="govuk-link"
                :to="{ name: 'vacancies' }"
              >
                Vacancies
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link"
                :to="{ name: 'applications' }"
              >
                Applications
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item moj-side-navigation__item--active">
              <RouterLink
                class="govuk-link"
                aria-current="page"
                :to="{ name: 'qualifying-tests' }"
              >
                Qualifying Tests
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
            :columns="[
              { title: 'Title' },
              { title: 'Status' },
              { title: activeTab === 'future' ? 'Start' : 'Deadline' },
            ]"
          >
            <template #row="{row}">
              <TableCell>
                <RouterLink
                  v-if="activeTab === 'open'"
                  :to="{ path: `/qualifying-tests/${row.id}/information` }"
                >
                  {{ row.qualifyingTest.title }}
                </RouterLink>
                <template v-else>
                  {{ row.qualifyingTest.title }}
                </template>
              </TableCell>
              <TableCell>{{ status(row.status) | lookup }}</TableCell>
              <TableCell>
                <template v-if="activeTab === 'future'">
                  {{ prettyDate(row.qualifyingTest.startDate) }}
                </template>
                <template v-else>
                  {{ prettyDate(row.qualifyingTest.endDate) }}
                </template>
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
import { isToday, isDateInFuture, formatDate } from '@/helpers/date';
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
    qualifyingTestResponses() {
      return this.$store.state.qualifyingTestResponses.records;
    },
    openTests(){
      return this.qualifyingTestResponses.filter(qt => (
        !isDateInFuture(qt.qualifyingTest.startDate) &&
        isDateInFuture(qt.qualifyingTest.endDate) && (
          qt.status === QUALIFYING_TEST.STATUS.ACTIVATED || qt.status === QUALIFYING_TEST.STATUS.STARTED
        )
      ));
    },
    futureTests(){
      return this.qualifyingTestResponses.filter(qt => (
        (isDateInFuture(qt.qualifyingTest.startDate) || (
          isDateInFuture(qt.qualifyingTest.endDate) && qt.status === QUALIFYING_TEST.STATUS.CREATED
        ))
      ));
    },
    closedTests(){
      return this.qualifyingTestResponses.filter(qt => (
        !isDateInFuture(qt.qualifyingTest.endDate) ||
        qt.status == QUALIFYING_TEST.STATUS.COMPLETED
      ));
    },
  },
  mounted() {
    this.$store.dispatch('qualifyingTestResponses/bind').then((data) => {
      if (data === null) {
        this.redirectToPage();
      } else {
        this.loaded = true;
      }
    }).catch((e) => {
      this.loadFailed = true;
      throw e;
    });
  },
  destroyed() {
    this.$store.dispatch('qualifyingTestResponses/unbind');
  },
  methods: {
    status(testStatus) {
      if (testStatus === QUALIFYING_TEST.STATUS.STARTED ||
        testStatus === QUALIFYING_TEST.STATUS.COMPLETED) {
        return testStatus;
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
