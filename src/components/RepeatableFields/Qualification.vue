<template>
  <div>
    <RadioGroup
      :id="qualificationType"
      v-model="row.type"
      label="What are you qualified as?"
      hint="Choose 1 option."
      required
    >
      <RadioItem
        value="advocate-scotland"
        label="Advocate - Scotland"
      />
      <RadioItem
        value="barrister"
        label="Barrister"
      />
      <RadioItem
        value="CILEx"
        label="Fellow of the Chartered Institute of Legal Executives (CILEx)"
      />
      <RadioItem
        value="solicitor"
        label="Solicitor"
      />
      <RadioItem
        v-if="showNoLegal"
        value="no-legal-qualification"
        label="None of the above"
      />

      <RadioItem
        v-if="otherQualificationsRequired"
        :value="vacancy.otherQualifications"
        :label="vacancy.otherQualifications"
      />
    </RadioGroup>

    <RadioGroup
      :id="qualificationLocation"
      v-model="row.location"
      label="Where are you qualified?"
      hint="Choose 1 option."
      :required="row.type!=='no-legal-qualification'"
    >
      <RadioItem
        value="england-wales"
        label="England and Wales"
      />
      <RadioItem
        value="northern-ireland"
        label="Northern Ireland"
      />
      <RadioItem
        value="scotland"
        label="Scotland"
      />
    </RadioGroup>

    <div
      v-if="row.type === 'barrister'"
    >
      <DateInput
        :id="calledToBarDate"
        v-model="row.calledToBarDate"
        label="When were you called to the Bar?"
        type="month"
        required
      />

      <RadioGroup
        :id="completedPupillage"
        v-model="row.completedPupillage"
        label="Have you completed pupillage?"
        required
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

      <DateInput
        v-if="row.completedPupillage === true"
        :id="qualificationDate"
        v-model="row.date"
        label="When did you complete pupillage?"
        type="month"
        required
      />
      <div v-else-if="row.completedPupillage === false">
        <RadioGroup
          :id="notCompletePupillageReason"
          v-model="row.notCompletePupillageReason"
          label="Why you were exempt from pupillage (we may ask for a copy of your exemption or practicing certificate)?"
          required
        >
          <RadioItem
            v-for="option in NOT_COMPLETE_PUPILLAGE_REASONS"
            :key="option"
            :value="option"
            :label="$filters.lookup(option)"
          />
        </RadioGroup>

        <TextareaInput
          v-if="row.notCompletePupillageReason === NOT_COMPLETE_PUPILLAGE_REASONS.OTHER"
          :id="details"
          v-model="row.details"
          hint="Please provide details how you satisfy the ‘judicial-appointment eligibility condition’, set out in section 50 of the Tribunals, Courts and Enforcement Act 2007"
          required
        />
      </div>
    </div>

    <div v-else>
      <DateInput
        :id="qualificationDate"
        v-model="row.date"
        label="When did you qualify?"
        type="month"
        :required="row.type!=='no-legal-qualification'"
      />
    </div>

    <slot name="removeButton" />
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import DateInput from '@/components/Form/DateInput.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import { NOT_COMPLETE_PUPILLAGE_REASONS } from '@/helpers/constants';
import ApplyMixIn from '@/views/Apply/ApplyMixIn';

export default {
  name: 'Qualification',
  components: {
    RadioGroup,
    RadioItem,
    DateInput,
    TextareaInput,
  },
  mixins: [ApplyMixIn],
  props: {
    row: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
    showNoLegal: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      NOT_COMPLETE_PUPILLAGE_REASONS,
    };
  },
  computed: {
    qualificationType() {
      return `qualification_type_${this.index}`;
    },
    otherQualificationsRequired() {
      if (this.vacancy.qualifications) {
        return this.vacancy.qualifications.includes('other') && this.vacancy.otherQualifications;
      } else {
        return false;
      }
    },
    qualificationLocation() {
      return `qualification_location_${this.index}`;
    },
    calledToBarDate() {
      return `qualification_calledToBar_date_${this.index}`;
    },
    qualificationDate() {
      return `qualification_date_${this.index}`;
    },
    details() {
      return `qualification_details_${this.index}`;
    },
    completedPupillage() {
      return `qualification_completedPupillage_${this.index}`;
    },
    notCompletePupillageReason() {
      return `qualification_not_complete_pupillage_reason_${this.index}`;
    },
  },
};
</script>
