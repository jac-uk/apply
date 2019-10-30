<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1
          v-if="unknownVariable !== 'non-legal'"
          class="govuk-heading-xl"
        >
          Qualifications
        </h1>

        <h1
          v-if="unknownVariable === 'non-legal'"
          class="govuk-heading-xl"
        >
          Memberships
        </h1>

        <RepeatableFields
          v-if="unknownVariable !== 'non-legal'"
          v-model="qualifications"
          :component="repeatableFields.Qualification"
        />

        <RadioGroup
          v-if="unknownVariable === 'non-legal'"
          id="professional-memberships"
          v-model="professionalMemberships"
          label="What professional memberships do you have?"
        >
          <RadioItem
            value="option-a"
            label="Option A"
          />
        </RadioGroup>

        <button class="govuk-button">
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RepeatableFields from '@/components/RepeatableFields';
import Qualification from '@/components/RepeatableFields/Qualification';
import RadioItem from '@/components/Form/RadioItem';
import RadioGroup from '@/components/Form/RadioGroup';

export default {
  components: {
    RepeatableFields,
    RadioItem,
    RadioGroup,
  },
  data(){
    return {
      repeatableFields: {
        Qualification,
      },
      qualifications: null,
      professionalMemberships: null,
      unknownVariable: null,
    };
  },
  methods: {
    save() {

    },
  },
};
</script>
