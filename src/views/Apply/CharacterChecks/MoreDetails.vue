<template>
  <div>
    <RouterLink
      class="govuk-back-link"
      :to="{ name: 'character-checks-HMRC' }"
    >
      Back
    </RouterLink>

    <div class="govuk-grid-row">
      <div class="govuk-form-group">
        <div class="govuk-grid-column-two-thirds govuk-!-margin-top-8">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
            <h1 class="govuk-fieldset__heading govuk-!-margin-bottom-4">
              Further information to disclose (optional)
            </h1>
          </legend>
          <TextareaInput
            id="further-info"
            ref="textareaInput"
            class="govuk-heading-m govuk-!-margin-bottom-2"
            rows="10"
            hint="For example, misuse of social media or online networking sites, breaches of the Integrity Statement etc."
            aria-describedby="more-details-info more-details-hint"
          />
          <span
            id="more-details-info"
            aria-live="polite"
            class="govuk-hint govuk-character-count__message"
          >You have {{ charsRemaining }} characters remaining</span>
          <button
            class="govuk-button govuk-!-margin-top-4"
            data-module="govuk-button"
          >
            Save and continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  components: {
    TextareaInput,
  },
  data() {
    return {
      charsRemaining: 1000,
    };
  },
};
    
</script>
