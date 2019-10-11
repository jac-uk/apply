<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Judicial experience
        </h1>

        <RadioGroup
          id="has-been-judge"
          v-model="hasBeenJudge"
          label="Have you ever been a judge?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <RadioGroup
          v-if="hasBeenJudge === false"
          id="similar-role"
          v-model="similarRole"
          label="Have you ever held a similar role on a quasi-judicial body?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />

          <details
            class="govuk-details"
            data-module="govuk-details"
          >
            <summary class="govuk-details__summary">
              <span class="govuk-details__summary-text">
                More about quasi-judicial bodies
              </span>
            </summary>
            <div class="govuk-details__text">
              <p>
                Quasi-judicial bodies have powers and procedures similar to
                those of courts. For example, determining facts
                and making decisions.
              </p>

              <p>Examples of quasi-judicial bodies include:</p>

              <ul class="govuk-list govuk-list--bullet">
                <li>Coroner</li>
                <li>Parole Board</li>
                <li>Chair of a statutory inquiry</li>
              </ul>
            </div>
          </details>
        </RadioGroup>

        <RadioGroup
          v-if="hasBeenJudge === true || hasBeenJudge === false && similarRole === true"
          id="30-days-sitting"
          v-model="thirtyDaysSitting"
          label="Do you have at least 30 sitting days?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <TextareaInput
          v-if="hasBeenJudge === true && thirtyDaysSitting === false ||
            hasBeenJudge === false && similarRole === false ||
            hasBeenJudge === false && similarRole === true && thirtyDaysSitting === false"
          id="gained-experience"
          v-model="gainedExperience"
          label="Explain how you've gained significant judicial experience."
        />

        <button class="govuk-button">
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';

export default {
  components: {
    RadioGroup,
    RadioItem,
    TextareaInput,
  },
  data(){
    return {
      hasBeenJudge: null,
      thirtyDaysSitting: null,
      similarRole: null,
      gainedExperience: null,
    };
  },
  methods: {
    save() {

    },
  },
};
</script>
