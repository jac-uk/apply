<template>
  <div class="govuk-grid-row">
    <LoadingMessage
      v-if="loaded === false"
      :load-failed="loadFailed"
    />
    <div
      v-else
      class="govuk-grid-column-two-thirds"
    >
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
        <h1>
          {{ activeTab }}
        </h1>
        <Table
          data-key="id"
          :data="getSelectedTableData()"
          :columns="[
            { title: 'Title' },
            { title: 'Status' },
            { title: 'Deadline' },
          ]"
        >
          <template #row="{row}">
            <TableCell>
              <RouterLink
                :to="{ path: `/qualifying-tests/${row.id}/information` }"
              >
                {{ row.qualifyingTest.title }}
              </RouterLink>
            </TableCell>
            <TableCell>{{ status(row.status) | lookup }}</TableCell>
            <TableCell>{{ endTime(row) }}</TableCell>
          </template>
        </Table>
      </div>
    </div>
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
      return this.qualifyingTestResponses.filter(qt => qt.statusLog.completed === null && isDateInFuture(qt.qualifyingTest.endDate) && qt.status === 'activated');
    },
    futureTests(){
      return this.qualifyingTestResponses.filter(qt => qt.statusLog.completed === null && isDateInFuture(qt.qualifyingTest.endDate) && qt.status === 'created');
    },
    closedTests(){
      return this.qualifyingTestResponses.filter(qt => qt.statusLog.completed != null);
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
    endTime(qualifyingTest) {
      const time = formatDate(qualifyingTest.qualifyingTest.endDate, 'time');
      const day = formatDate(qualifyingTest.qualifyingTest.endDate);
      return isToday(qualifyingTest.qualifyingTest.endDate) ? `${time} today` : `${time} on ${day}`;
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
h1{
  text-transform: capitalize;
}
.govuk-tabs{
  margin-bottom: 0;
}
.govuk-tabs__panel{
  margin-bottom: 10;
  padding: 30px 20px;
  border: 1px solid #b1b4b6;
  border-top: 0;
}
</style>
