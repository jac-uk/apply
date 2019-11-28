<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-full">
        <h1 class="govuk-heading-xl">
          Review your application
        </h1>

        <h1> {{ exercise.name }} </h1>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Personal details
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'personal-details'}"
          >
            Change
          </router-link>
        </div>

        <dl class="govuk-summary-list">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Full Name
            </dt>
            <dd class="govuk-summary-list__value">
              {{ candidate.fullName }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Email address
            </dt>
            <dd class="govuk-summary-list__value">
              {{ candidate.email }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Date of birth
            </dt>
            <dd class="govuk-summary-list__value">
              <p v-if="candidate.dateOfBirth">
                {{ candidate.dateOfBirth.toLocaleDateString() }}
              </p>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              NI Number
            </dt>
            <dd class="govuk-summary-list__value">
              {{ candidate.nationalInsuranceNumber }}
            </dd>
          </div>

          <!-- <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Citizenship
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div> -->
        </dl>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Character information
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'character-information'}"
          >
            Change
          </router-link>
        </div>

        <dl class="govuk-summary-list">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been cautioned or convicted of a criminal offence
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.criminalConvictionCaution) }}
              <p
                v-if="detailsDetector(application.criminalConvictionCautionDetails)"
                class="govuk-body"
              >
                Details: {{ application.criminalConvictionCautionDetails }}
              </p>
            </dd>
          </div>

          <!-- <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Received a non-motoring penalty notice
            </dt>
            <dd class="govuk-summary-list__value">
              UNSURE
            </dd>
          </div> -->

          <!-- <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been disqualified from driving, or convicted for driving under the influence of drink or drugs
            </dt>
            <dd class="govuk-summary-list__value">
              UNSURE
            </dd>
          </div> -->

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Have any endorsements on your licence, or received any motoring fixed-penalty notices
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.motoringOffencesAndSixPlusPoints) }}:
              <p
                v-if="detailsDetector(application.motoringOffencesAndSixPlusPoints)"
                class="govuk-body"
              >
                Details: {{ application.motoringOffencesAndSixPlusPointsDetails }}
              </p>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been declared bankrupt
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.declaredBankrupt) }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Filed late tax returns or been fined my HMRC
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.financialDifficulties) }}:
              <p
                v-if="detailsDetector(application.financialDifficultiesDetails)"
                class="govuk-body"
              >
                Details: {{ application.financialDifficultiesDetails }}
              </p>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been subject to professional negligence, wrongful dismissal, discrimination or harassment proceedings
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.conductNegligenceInvestigation) }}:
              <p
                v-if="detailsDetector(application.conductNegligenceInvestigationDetails)"
                class="govuk-body"
              >
                Details: {{ application.conductNegligenceInvestigationDetails }}
              </p>
            </dd>
          </div>

          <!-- <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been subject to complaints or disciplinary action, or been asked to resign from a position
            </dt>
            <dd class="govuk-summary-list__value">
              UNSURE
            </dd>
          </div> -->

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Have any other issues that you think we should know about when considering your character
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.otherCharacterIssues) }}:
              <p
                v-if="detailsDetector(application.otherCharacterIssuesDetails)"
                class="govuk-body"
              >
                Details: {{ application.otherCharacterIssuesDetails }}
              </p>
            </dd>
          </div>
        </dl>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Equality and diversity information
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'equality-and-diversity-survey'}"
          >
            Change
          </router-link>
        </div>

        <dl class="govuk-summary-list">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Ethnic group
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.ethnicGroup }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Religion or faith are you
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.religionFaith }}
              <p
                v-if="detailsDetector(application.otherReligionDetails)"
                class="govuk-body"
              >
                Details: {{ application.otherReligionDetails }}
              </p>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Gender
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.gender }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Changed gender
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.changedGender) }}
            </dd>
          </div>

          <!-- <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been declared bankrupt
            </dt>
            <dd class="govuk-summary-list__value">
              UNSURE
            </dd>
          </div> -->

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Sexual orientation
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.sexualOrientation }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Disability
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.disability) }}
              <p
                v-if="detailsDetector(application.disabilityDetails)"
                class="govuk-body"
              >
                Details: {{ application.disabilityDetails }}
              </p>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Attended state or fee-paying school
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.stateOrFeeSchool }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Attended Oxbridge universities
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.oxbridgeUni) }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              First generation to go to university
            </dt>
            <dd class="govuk-summary-list__value">
              {{ booleanAmender(application.firstGenerationStudent) }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Professional background
            </dt>
            <dd
              class="govuk-summary-list__value"
            >
              <li
                v-for="item in application.professionalBackground"
                :key="item.name"
              >
                {{ item }}
              </li>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Current legal role
            </dt>
            <dd
              class="govuk-summary-list__value"
            >
              <li
                v-for="item in application.currentLegalRole"
                :key="item.name"
              >
                {{ item }}
              </li>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Fee-paid judicial role experience
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.feePaidJudicialRole }}
            </dd>
          </div>
        </dl>

        <div
          class="govuk-!-margin-top-9"
        >
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Qualifications
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'relevant-qualifications'}"
          >
            Change
          </router-link>
        </div>

        <dl
          v-for="item in application.qualifications"
          :key="item.name"
          class="govuk-summary-list govuk-!-margin-bottom-8"
        >
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Qualification
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.type }}</li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Location
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.location }}</li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Date qualified
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li v-if="item.date">
                  {{ item.date.toLocaleDateString() }}
                </li>
              </ul>
            </dd>
          </div>
        </dl>

        <div
          v-if="isNonLegal"
          class="govuk-!-margin-top-9"
        >
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Memberships
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'relevant-qualifications'}"
          >
            Change
          </router-link>
        </div>

        <dl
          v-if="isNonLegal"
          class="govuk-summary-list govuk-!-margin-bottom-8"
        >
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Memberships
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.professionalMemberships }}
            </dd>
          </div>
        </dl>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Post-qualification experience
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'post-qualification-work-experience'}"
          >
            Change
          </router-link>
        </div>

        <dl
          v-for="item in application.experience"
          :key="item.name"
          class="govuk-summary-list govuk-!-margin-bottom-8"
        >
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Job title
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.jobTitle }}</li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Organisation or business
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.orgBusinessName }}</li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Dates worked
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li v-if="item.startDate">
                  {{ item.startDate.toLocaleDateString() }} to {{ endDateCleanser(item.endDate)}}
                </li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Law-related tasks
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list govuk-list--bullet">
                <li
                  v-for="task in item.tasks"
                  :key="task.name"
                >
                  {{ task }}
                </li>
              </ul>
            </dd>
          </div>
        </dl>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Independent assessors
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'assessors-details'}"
          >
            Change
          </router-link>
        </div>

        <dl class="govuk-summary-list">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Full name
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.firstAssessorFullName }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Email
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.firstAssessorEmail }}
            </dd>
          </div>

          <hr class="govuk-section-break govuk-section-break--xl">

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Full name
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.secondAssessorFullName }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Email
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.secondAssessorEmail }}
            </dd>
          </div>
        </dl>

        <div
          v-if="isNonLegal || isLeadership"
          id="self-competencies-heading"
          class="govuk-!-margin-top-9"
        >
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Self-assessment competencies
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'self-assessment-competencies'}"
          >
            Change
          </router-link>

          <dl class="govuk-summary-list govuk-!-margin-bottom-8">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Finished statements
              </dt>
              <dd class="govuk-summary-list__value">
                <a
                  ref="templateDownloadLink"
                  class="govuk-link govuk-body-m"
                  href="#"
                >
                  fancy-judge-stuff.doc
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div
          id="self-competencies-heading"
          class="govuk-!-margin-top-9"
        >
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            statement of suitability
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: ''}"
          >
            Change
          </router-link>

          <dl class="govuk-summary-list govuk-!-margin-bottom-8">
            <div class="govuk-summary-list__row">
              <dd class="govuk-summary-list__value">
                <a
                  class="govuk-link govuk-body-m"
                  href="#"
                >
                  Upload CV
                </a>
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dd class="govuk-summary-list__value">
                <a
                  class="govuk-link govuk-body-m"
                  href="#"
                >
                  upload statement of suitability
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <button class="govuk-button">
          Send application
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    exercise () {
      return this.$store.state.exercise.record;
    },
    application () {
      return this.$store.state.application.record;
    },
    candidate () {
      return this.$store.state.candidate.record;
    },
    isNonLegal () {
      return this.exercise.typeOfExercise === 'non-legal';
    },
    isLegal () {
      return this.exercise.typeOfExercise === 'legal';
    },
    isLeadership () {
      return this.exercise.typeOfExercise === 'leadership';
    },
    isSenior () {
      return this.exercise.typeOfExercise == 'senior';
    },
  },
  methods: {
    booleanAmender (value) {
      if (value === true) { return 'Yes'; }
      if (value === false) { return 'No'; }
    },
    detailsDetector (value) {
      if (value !== null) {return true;}
    },
    endDateCleanser (value) {
      if (value) {
        return value.toLocaleDateString();
      } else {
        return 'present';
      }
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
