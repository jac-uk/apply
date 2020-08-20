<template>
  <div>
    List of QTs
    <ul>
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
          :to="{ name: 'qualifying-test-scenario-question', params: { qualifyingTestId: '12345', questionNumber: '1' } }"
        >
          QT Scenario Question
        </RouterLink>
      </li>
    </ul>
  </div>   
</template>
