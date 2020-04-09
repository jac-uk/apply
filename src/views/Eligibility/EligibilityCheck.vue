<template>
  <form @submit.prevent="save">
    <h1 class="govuk-heading-xl">
      Check if you're eligible
    </h1>

    <RadioGroup
      id="citizenship"
      v-model="eligibility.citizenship"
      label="Citizenship"
      required
    >
      <p class="govuk-body-m">
        Are you a citizen of the UK, the Republic of Ireland or another Commonwealth country?
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
    <!--
    <RadioGroup
      id="character"
      v-model="eligibility.character"
      label="Character"
    >
      <p class="govuk-body-m govuk-!-margin-top-0">
        You're confident there are no issues about your
        <a
          class="govuk-link"
          href="https://www.judicialappointments.gov.uk/good-character"
          target="_blank"
        >
          character
        </a>
        that could affect your suitability for this role.
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

    <RadioGroup
      id="reasonable-length-of-service"
      v-model="eligibility.reasonableLOS"
      label="Reasonable length of service"
    >
      <p class="govuk-body-m">
        You can work for at least {{ lengthOfService }} years before reaching the retirement age of {{ retirementAge }}.
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

    <RadioGroup
      v-if="isLegal"
      id="qualifications-and-experience"
      v-model="eligibility.qualificationsExperience"
      label="Qualifications and experience"
    >
      <p class="govuk-body-m govuk-!-margin-top-0">
        You're qualified in England or Wales as a {{ qualifications }} and have at least {{ postQualificationExperience }} years of
        <a
          class="govuk-link"
          href="https://www.judicialappointments.gov.uk/eligibility-tribunals"
          target="_blank"
        >post-qualification law-related work experience</a>.
      </p>

      <p class="govuk-body-m govuk-!-margin-top-0">
        You have experience of criminal law and procedure
        in the Crown Court and/or the Court of Appeal, Criminal Division and <a
          class="govuk-link"
          href="https://applicant-prototype.herokuapp.com/check-eligibility/v1-7-court/judicial-experience-content"
          target="_blank"
        >sufficient
          directly relevant previous judicial experience</a>.
      </p>

      <RadioItem
        :value="true"
        label="Yes"
      />
      <RadioItem
        :value="false"
        label="No"
      />
    </RadioGroup> -->

    <button class="govuk-button">
      Continue
    </button>
  </form>
</template>

<script>
import Form from '@/components/Form/Form';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import booleanOrNull from '@/helpers/booleanOrNull';

export default {
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
          qualifications += this.$options.filters.lookup(this.vacancy.qualifications[i]);
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
        // if (this.eligibility.character !== true) { isOkay = false; }
        // if (this.eligibility.reasonableLOS !== true) { isOkay = false; }
        // if (this.isLegal && this.eligibility.qualificationsExperience !== true) { isOkay = false; }
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
