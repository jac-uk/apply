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
      <!-- Delete when necessary -->
      <ul style="background-color:aqua; border: 5px dotted black;">
        QT Dev navigation menu
        <li>
          <RouterLink
            :to="{ name: 'qualifying-test-information', params: { qualifyingTestId: '12345' } }"
          >
            QT Information Page
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'qualifying-test-overview', params: { qualifyingTestId: '12345' } }"
          >
            QT Overview
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'qualifying-test-submitted', params: { qualifyingTestId: '12345' } }"
          >
            QT Submitted
          </RouterLink>
        </li>
      </ul>
      <!-- Delete when necessary -->

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
                :to="{ name: `/qualifying-tests/${row.id}/information` }"
              >
                {{ row.qualifyingTest.title }}
              </RouterLink>
            </TableCell>
            <TableCell>{{ row.status != 'completed' ? 'incomplete' : 'complete' }}</TableCell>
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
      const tests = [];
      for (const qt of this.qualifyingTestResponses){
        if (qt.statusLog.completed === null && isDateInFuture(qt.qualifyingTest.endDate) && qt.status === 'activated'){
          tests.push(qt);
        }
      }
      return tests;
    },
    futureTests(){
      const tests = [];
      for (const qt of this.qualifyingTestResponses){
        if (qt.statusLog.completed === null && isDateInFuture(qt.qualifyingTest.endDate) && qt.status === 'created'){
          tests.push(qt);
        }
      }
      return tests;
    },
    closedTests(){
      const tests = [];
      for (const qt of this.qualifyingTestResponses){
        if (qt.statusLog.completed != null){
          tests.push(qt);
        }
      }
      return tests;
    },
    hasOpenTests(){
      return this.openTests.length != 0 ? true : false;
    },
    hasFutureTests(){
      return this.openTests.length != 0 ? true : false;
    },
    hasClosedTests(){
      return this.openTests.length != 0 ? true : false;
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
    endTime(qualifyingTest){
      const time = formatDate(qualifyingTest.qualifyingTest.endDate, 'time');
      const day = formatDate(qualifyingTest.qualifyingTest.endDate);
      return isToday(qualifyingTest.qualifyingTest.endDate) ? `${time} today` : `${time} on ${day}`;
    },
    getSelectedTableData(){
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

<style>
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
