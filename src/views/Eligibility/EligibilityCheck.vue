<template>
  <div>
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <h1 class="govuk-heading-xl">
        Check if you meet the nationality requirement
      </h1>

      <RadioGroup
        id="citizenship"
        v-model="eligibility.citizenship"
        label="Citizenship"
        required
      >
        <p class="govuk-body-m">
          In order to apply you need to be a citizen of the UK,
          Republic of Ireland or another Commonwealth country.
        </p>
        <p class="govuk-body-m">
          Are you a citizen of the UK, the Republic of Ireland
          or another Commonwealth country?
        </p>

        <RadioItem
          :value="true"
          label="Yes"
        />
        <RadioItem
          :value="false"
          label="No"
        />
      </RadioGroup>

      <button class="govuk-button info-btn--eligibility-check--continue">
        Continue
      </button>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import RadioGroup from '@/components/Form/RadioGroup.vue';
import RadioItem from '@/components/Form/RadioItem.vue';
import booleanOrNull from '@/helpers/booleanOrNull';

export default {
  name: 'EligibilityCheck',
  components: {
    RadioGroup,
    RadioItem,
  },
  extends: Form,
  data(){
    return {
      eligibility: {
        citizenship: booleanOrNull(null),
        character: booleanOrNull(null),
        reasonableLOS: booleanOrNull(null),
        qualificationsExperience: booleanOrNull(null),
      },
    };
  },
  computed: {
    vacancy () {
      return this.$store.state.vacancy.record;
    },
    isLegal() {
      if (this.vacancy.typeOfExercise === 'legal') {
        return true;
      }
      if (this.vacancy.typeOfExercise === 'leadership') {
        return true;
      }
      return false;
    },
    lengthOfService() {
      if (this.vacancy.reasonableLengthService === 'other') {
        return this.vacancy.otherLOS;
      } else {
        return this.vacancy.reasonableLengthService;
      }
    },
    retirementAge() {
      if (this.vacancy.retirementAge === 'other') {
        return this.vacancy.otherRetirement;
      } else {
        return this.vacancy.retirementAge;
      }
    },
    qualifications() {
      let qualifications = '';
      for (let i = 0, len = this.vacancy.qualifications.length; i < len; ++i) {
        if (i > 0) {
          if (i < len - 1) {
            qualifications += ', ';
          } else {
            qualifications += ' or ';
          }
        }
        if (this.vacancy.qualifications[i] === 'other') {
          qualifications += this.vacancy.otherQualifications;
        } else {
          qualifications += this.$filters.lookup(this.vacancy.qualifications[i]);
        }
      }
      return qualifications;
    },
    postQualificationExperience() {
      if (this.vacancy.postQualificationExperience === 'other') {
        return this.vacancy.otherYears;
      } else {
        return this.vacancy.postQualificationExperience;
      }
    },
  },
  methods: {
    save () {
      this.validate();
      if (this.isValid()) {
        let isOkay = true;
        if (this.eligibility.citizenship !== true ) { isOkay = false; }
        if (isOkay) {
          this.$router.push({ name: 'eligibility-pass' });
        } else {
          this.$router.push({ name: 'eligibility-fail' });
        }
      }
    },
  },
};
</script>
