<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h3 class="govuk-caption-xl govuk-!-padding-bottom-5">
          092 Registrar of Criminal Appeals, Master of the Crown Office and Queen’s Coroner &amp;
          Attorney
        </h3>

        <h1 class="govuk-heading-xl">
          Check if you're eligible
        </h1>

        <p class="govuk-body-l">
          If you cannot meet all the requirements, you can still apply
          but it could mean you’re unlikely to be offered a position.
        </p>

        <RadioGroup
          id="citizenship"
          v-model="citizenship"
          label="Citizenship"
        >
          <p class="govuk-body-m">
            You're a citizen of the UK, the Republic of Ireland or another Commonwealth country.
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
          id="character"
          v-model="character"
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
          v-model="reasonableLOS"
          label="Reasonable length of service"
        >
          <p class="govuk-body-m">
            You can work for at least 5 years before reaching the retirement age of 70.
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
          id="qualifications-and-experience"
          v-model="qualificationsExperience"
          label="Qualifications and experience"
        >
          <p class="govuk-body-m govuk-!-margin-top-0">
            You're qualified in England or Wales as a barrister,
            fellow of CILEx or solicitor, and have at least 5 years of
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
        </RadioGroup>

        <button class="govuk-button">
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import booleanOrNull from '@/helpers/booleanOrNull';

export default {
  components: {
    RadioGroup,
    RadioItem,

  },
  data(){
    return {
      citizenship: booleanOrNull(null),
      character: booleanOrNull(null),
      reasonableLOS: booleanOrNull(null),
      qualificationsExperience: booleanOrNull(null),
    };
  },
  methods: {
    save() {

    },
  },
};

</script>

<style scoped>
.govuk-hint .govuk-link {
  text-decoration: underline;
  color: #1d70b8;
}

.govuk-hint .govuk-link:hover {
  text-decoration: underline;
  color: #4c2c92;
}
</style>
