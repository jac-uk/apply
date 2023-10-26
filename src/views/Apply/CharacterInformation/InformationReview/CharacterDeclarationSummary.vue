<template>
  <div>
    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          {{ declaration1 }}
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo(characterInformation.declaration1) }}
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          {{ declaration2 }}
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo(characterInformation.declaration2) }}
        </dd>
      </div>
    </dl>

    <dl class="govuk-summary-list govuk-!-margin-bottom-0">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key widerColumn">
          {{ declaration3 }}
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo(characterInformation.declaration3) }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { DECLARATION1, DECLARATION2, DECLARATION3 } from '../character-information-constants';

export default {
  name: 'CharacterDeclarationSummary',
  props: {
    characterInformation: {
      type: Object,
      required: true,
      default: new Object({}),
    },
  },
  data() {
    return {
      declaration1: DECLARATION1,
      declaration2: DECLARATION2,
      declaration3: DECLARATION3,
    };
  },
};
</script>

<style scoped>
  .widerColumn {
    width: 70%;
  }
</style>

