<template>
  <div class="govuk-row">
    <h1 class="govuk-heading-xl">
      Check your answers
    </h1>
    <div 
      v-for="(section, title) in answers"
      :key="title"
      class="govuk-row"
    >
      <h2 class="govuk-heading-l">
        {{ title }}
      </h2>

      <dl
        class="govuk-summary-list"
      >
        <tr
          v-for="(answer, index) in section"
          :key="index"
        >
          <dt class="govuk-summary-list__key govuk-!-width-one-third">
            {{ index }}
          </dt>
          <dd class="govuk-summary-list__value">
            {{ answer }}
          </dd>
          <dd class="govuk-summary-list__actions">
            <RouterLink 
              :to="{ name: '' }"
            >
              Change
            </RouterLink>
          </dd>
        </tr>
      </dl>
    </div>

    <button
      class="govuk-button"
      data-module="govuk-button"
    >
      Continue
    </button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      answers: {
        'Personal information': {
          'Full Name':	'Max Talbot',
          'Gender':	'Male',
          'Date of birth':	'11 June 1975',
          'Place of birth': 'New York, USA',
          'Citizenship': 'American',
          'National insurance number': 'QQ 12 34 45 C',
        },
        'Professional details': {
          title: 'two',
        },
        'HMRC': {
          title: 'three',
        },
      },
    };
  },
};
</script>
