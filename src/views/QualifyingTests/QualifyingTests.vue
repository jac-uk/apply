<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <!-- Delete when necessary -->
      <ul style="background-color:aqua; border: 5px dotted black;">
        QT Dev nagvigation menu
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
        <li>
          <RouterLink
            :to="{ name: 'qualifying-test-situational-judgement-question', params: { qualifyingTestId: '12345', questionNumber: '1' } }"
          >
            QT Situational Judgement Question
          </RouterLink>
        </li>
        <li>
        <RouterLink
          :to="{ name: 'qualifying-test-scenario-question', params: { qualifyingTestId: '12345', questionNumber: '1' } }"
        >
          QT Scenario Question
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
      <!-- OPEN QTs -->
      <div 
        v-if="activeTab === 'open'"
        class="govuk-tabs__panel"
        role="tabpanel"
      >
        <h1 class="govuk-heading-l">
          Open
        </h1>
        <table 
          class="govuk-table"
        >
          <thead class="govuk-table__head">
            <tr class="govuk-table__row">
              <th
                scope="col"
                class="govuk-table__header"
              >
                QTs
              </th>
              <th
                scope="col"
                class="govuk-table__header"
              >
                Status
              </th>
              <th
                scope="col"
                class="govuk-table__header govuk-table__header--numeric"
              >
                Deadline date
              </th>
            </tr>
          </thead>
          <tbody class="govuk-table__body">
            <tr
              class="govuk-table__row"
            >
              <td class="govuk-table__cell">
                <a href="">QT title</a>
              </td>
              <td class="govuk-table__cell">
                ??
              </td>
              <td class="govuk-table__cell govuk-table__cell--numeric">
                DD/MM/YYYY - MM:HH
              </td>
            </tr>
            <tr
              class="govuk-table__row"
            >
              <td class="govuk-table__cell">
                <a href="">QT title</a>
              </td>
              <td class="govuk-table__cell">
                ??
              </td>
              <td class="govuk-table__cell govuk-table__cell--numeric">
                DD/MM/YYYY - MM:HH
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- FUTURE QTs -->
      <div 
        v-if="activeTab === 'future'"
        class="govuk-tabs__panel"
        role="tabpanel"
      >
        <h1 class="govuk-heading-l">
          Future
        </h1>
        <table 
          class="govuk-table"
        >
          <thead class="govuk-table__head">
            <tr class="govuk-table__row">
              <th
                scope="col"
                class="govuk-table__header"
              >
                QTs
              </th>
              <th
                scope="col"
                class="govuk-table__header"
              >
                Status
              </th>
              <th
                scope="col"
                class="govuk-table__header govuk-table__header--numeric"
              >
                Deadline date
              </th>
            </tr>
          </thead>
          <tbody class="govuk-table__body">
            <tr
              class="govuk-table__row"
            >
              <td class="govuk-table__cell">
                <a href="">QT title</a>
              </td>
              <td class="govuk-table__cell">
                ??
              </td>
              <td class="govuk-table__cell govuk-table__cell--numeric">
                DD/MM/YYYY - MM:HH
              </td>
            </tr>
            <tr
              class="govuk-table__row"
            >
              <td class="govuk-table__cell">
                <a href="">QT title</a>
              </td>
              <td class="govuk-table__cell">
                ??
              </td>
              <td class="govuk-table__cell govuk-table__cell--numeric">
                DD/MM/YYYY - MM:HH
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- PAST QTs -->
      <div 
        v-if="activeTab === 'past'"
        class="govuk-tabs__panel"
        role="tabpanel"
      >
        <h1 class="govuk-heading-l">
          Past
        </h1>
        <table 
          class="govuk-table"
        >
          <thead class="govuk-table__head">
            <tr class="govuk-table__row">
              <th
                scope="col"
                class="govuk-table__header"
              >
                QTs
              </th>
              <th
                scope="col"
                class="govuk-table__header"
              >
                Status
              </th>
              <th
                scope="col"
                class="govuk-table__header govuk-table__header--numeric"
              >
                Deadline date
              </th>
            </tr>
          </thead>
          <tbody class="govuk-table__body">
            <tr
              class="govuk-table__row"
            >
              <td class="govuk-table__cell">
                <a href="">QT title</a>
              </td>
              <td class="govuk-table__cell">
                ??
              </td>
              <td class="govuk-table__cell govuk-table__cell--numeric">
                DD/MM/YYYY - MM:HH
              </td>
            </tr>
            <tr
              class="govuk-table__row"
            >
              <td class="govuk-table__cell">
                <a href="">QT title</a>
              </td>
              <td class="govuk-table__cell">
                ??
              </td>
              <td class="govuk-table__cell govuk-table__cell--numeric">
                DD/MM/YYYY - MM:HH
              </td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>
  </div>   
</template>

<script>
import TabsList from '@/components/Page/TabsList';
export default {
  components: {
    TabsList,
  },
  data(){
    return {
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
};
</script>

<style>
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
