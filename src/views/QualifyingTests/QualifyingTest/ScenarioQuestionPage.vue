<template>
  <!-- [ Scenario Qualifying Test | Question | {{ $route.params.qualifyingTestId }} | #{{ $route.params.questionNumber }} ] -->
  <div class="govuk-grid-row js-enabled">
    <div class="govuk-grid-column-two-thirds">
      <div
        id="accordion-default"
        class="govuk-accordion"
        data-module="govuk-accordion"
      >
        <div
          :class="showDetails ? 'govuk-accordion__section govuk-accordion__section--expanded' : 'govuk-accordion__section'"
          @click="toggleAccordion"
        >
          <div class="govuk-accordion__section-header">
            <h2 class="govuk-accordion__section-heading">
              <button
                id="accordion-default-heading-1"
                type="button"
                aria-controls="accordion-default-content-1"
                class="govuk-accordion__section-button"
                :aria-expanded="showDetails"
              >
                [ PLACEHOLDER SCENARIO TITLE ]
                <span
                  class="govuk-accordion__icon"
                  :aria-hidden="showDetails"
                />
              </button>
            </h2>
          </div>
          <div
            id="accordion-default-content-1"
            class="govuk-accordion__section-content"
            aria-labelledby="accordion-default-heading-1"
          >
            <p class="govuk-body">
              [ PIRATE IPSUM LOREM ]<br>
              Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.
              Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.
              Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits.
            </p>
          </div>
        </div>
      </div>
      <TextareaInput
        id="role-summary"
        v-model="answer"
        label="[ 1. QUESTION TITLE ]"
        hint="Answer below:"
        rows="10"
        required
      />
      <div class="govuk-!-margin-bottom-4">
        <button
          class="govuk-button govuk-button--secondary govuk-!-margin-right-1"
          data-module="govuk-button"
        >
          Skip
        </button>
        <button
          class="govuk-button"
          style="background-color:#00703c;"
          data-module="govuk-button"
        >
          Save and continue
        </button>
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
  data(){
    return {
      showDetails: true,
      answer: '',
    };
  },
  methods: {
    toggleAccordion() {
      this.showDetails = !this.showDetails;
    },
  },
};
</script>
