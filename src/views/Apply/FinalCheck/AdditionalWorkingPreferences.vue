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
            ({{ $filters.lookup(vacancy.additionalWorkingPreferences[index].questionType) }})
          </span>
        </dt>
        <dd
          v-if="vacancy.additionalWorkingPreferences[index].questionType === 'single-choice'"
          class="govuk-summary-list__value"
        >
          <ul class="govuk-list">
            <li :data-welsh="getDataWelsh(vacancy.additionalWorkingPreferences[index].topic, item.selection)">
              {{ item.selection }}
            </li>
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
                  :data-welsh="getDataWelsh(vacancy.additionalWorkingPreferences[index].topic, option.answer)"
                > {{ option.answer }} </strong>
                <span
                  v-else
                  :data-welsh="getDataWelsh(vacancy.additionalWorkingPreferences[index].topic, option.answer)"
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
import { getDataWelshId, getDataWelsh } from '@/helpers/language';

export default {
  name: 'AdditionalWorkingPreferences',
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
  methods: {
    getDataWelsh(topic, answer) {
      return getDataWelsh({ id: getDataWelshId(topic), answer });
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
