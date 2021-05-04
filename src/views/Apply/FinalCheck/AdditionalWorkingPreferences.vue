<template>
  <div>
    <dl
      v-for="(item, index) in application.additionalWorkingPreferences"
      :key="index"
      class="govuk-summary-list"
    >
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          {{ vacancy.additionalWorkingPreferences[index].question }}
          <span class="govuk-body govuk-!-font-size-19">
            ({{ vacancy.additionalWorkingPreferences[index].questionType | lookup }})
          </span>
        </dt>
        <dd
          v-if="vacancy.additionalWorkingPreferences[index].questionType === 'single-choice'"
          class="govuk-summary-list__value"
        >
          <ul class="govuk-list">
            <li>{{ item.selection }}</li>
          </ul>
        </dd>
        <dd
          v-if="vacancy.additionalWorkingPreferences[index].questionType === 'multiple-choice'"
          class="govuk-summary-list__value"
        >
          <ul class="govuk-list">
            <li>
              <span
                v-for="(option, count) in vacancy.additionalWorkingPreferences[index].answers"
                :key="count"
              >
                <strong
                  v-if="item.selection.includes(option.answer)"
                > {{ option.answer }} </strong>
                <span
                  v-else
                >
                  {{ option.answer }}
                </span>
                <span
                  v-if="count + 1 !== vacancy.additionalWorkingPreferences[index].answers.length"
                >,</span>
              </span>
            </li>
          </ul>
        </dd>
        <dd
          v-if="vacancy.additionalWorkingPreferences[index].questionType === 'ranked-choice'"
          class="govuk-summary-list__value"
        >
          <ul class="govuk-list">
            <li>
              <span
                v-for="(choice, count) in item.selection"
                :key="count"
              >
                <strong>{{ count + 1 }}.</strong> {{ choice }}
              </span>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    application: {
      type: Object,
      required: true,
    },
    vacancy: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .govuk-summary-list__value,
  .govuk-summary-list__value:last-child,
  .govuk-summary-list__key {
    @include govuk-media-query($from: tablet) {
      width: auto;
    }
  }
  .change-link {
    float: right;
  }
</style>
