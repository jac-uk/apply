<template>
  <li class="task govuk-!-margin-bottom-0 govuk-!-padding-top-2 govuk-!-padding-bottom-2 container-border-bottom">
    <div class="govuk-grid-row">
      <div
        :aria-describedby="`${id}-status`"
        class="govuk-grid-column-three-quarters"
      >
        <span v-if="locked">
          {{ title }}
        </span>
        <RouterLink
          v-else
          :class="`govuk-link govuk-!-font-weight-bold info-link--task-list--${id}`"
          :to="{name: id}"
        >
          {{ title }}
        </RouterLink>
      </div>
      <div class="govuk-grid-column-one-quarter">
        <strong
          v-if="done"
          :id="`${id}-status`"
          class="govuk-tag"
        >
          DONE
        </strong>
        <span
          v-else
          :id="`${id}-status`"
        />
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: false,
      default: false,
    },
    locked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
