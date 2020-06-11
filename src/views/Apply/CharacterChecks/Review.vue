<template>
  <div class="govuk-row">
    <RouterLink
      class="govuk-back-link"
      :to="{ name: 'character-checks-review' }"
    >
      Back
    </RouterLink>

    <h1 class="govuk-heading-xl">
      Check your answers
    </h1>

    <div
      v-for="(section, title) in answers"
      :key="title"

      class="govuk-summary-list govuk-!-margin-bottom-9 clearfix"
    >
      <h2 class="govuk-heading-l">
        {{ title }}
      </h2>
      <dl
        v-for="(answer, index) in section"
        :key="index"
      >
        {{ index }}
				
        {{ answer }}
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
          'Date of birth':	new Date('11 June 1975'),
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
