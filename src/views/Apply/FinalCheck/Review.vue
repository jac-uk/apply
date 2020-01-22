<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-full">
        <BackLink class="govuk-!-margin-top-0" />
        <div class="govuk-!-margin-top-1">
          <h1 
            class="govuk-heading-xl"
            style="display:inline-block;"
          >
            Review your application
          </h1>
          <a 
            href="#" 
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            @click="downloadAsPdf"
          >
            Download As PDF
          </a>
        </div>

        <h1> {{ vacancy.name }} </h1>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Personal details
          </h2>
          <router-link
            v-if="isDraftApplication"
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'apply-personal-details'}"
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
              {{ application.personalDetails.fullName }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Email address
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.personalDetails.email }}
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Date of birth
            </dt>
            <dd class="govuk-summary-list__value">
              <p v-if="application.personalDetails.dateOfBirth">
                {{ application.personalDetails.dateOfBirth.toLocaleDateString() }}
              </p>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              NI Number
            </dt>
            <dd class="govuk-summary-list__value">
              {{ application.personalDetails.nationalInsuranceNumber }}
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

        <div id="download-as-pdf-div"> 
          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Character information
            </h2>
            <router-link
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'apply-character-information'}"
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
                {{ booleanAmender(application.characterInformation.criminalConvictionCaution) }}
                <p
                  v-if="detailsDetector(application.characterInformation.criminalConvictionCautionDetails)"
                  class="govuk-body"
                >
                  Details: {{ application.characterInformation.criminalConvictionCautionDetails }}
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
                {{ booleanAmender(application.characterInformation.motoringOffencesAndSixPlusPoints) }}
                <p
                  v-if="detailsDetector(application.characterInformation.motoringOffencesAndSixPlusPointsDetails)"
                  class="govuk-body"
                >
                  Details: {{ application.characterInformation.motoringOffencesAndSixPlusPointsDetails }}
                </p>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Been declared bankrupt
              </dt>
              <dd class="govuk-summary-list__value">
                {{ booleanAmender(application.characterInformation.declaredBankrupt) }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Filed late tax returns or been fined my HMRC
              </dt>
              <dd class="govuk-summary-list__value">
                {{ booleanAmender(application.characterInformation.financialDifficulties) }}
                <p
                  v-if="detailsDetector(application.characterInformation.financialDifficultiesDetails)"
                  class="govuk-body"
                >
                  Details: {{ application.characterInformation.financialDifficultiesDetails }}
                </p>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Been subject to professional negligence, wrongful dismissal, discrimination or harassment proceedings
              </dt>
              <dd class="govuk-summary-list__value">
                {{ booleanAmender(application.characterInformation.conductNegligenceInvestigation) }}
                <p
                  v-if="detailsDetector(application.characterInformation.conductNegligenceInvestigationDetails)"
                  class="govuk-body"
                >
                  Details: {{ application.characterInformation.conductNegligenceInvestigationDetails }}
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
                {{ booleanAmender(application.characterInformation.otherCharacterIssues) }}
                <p
                  v-if="detailsDetector(application.characterInformation.otherCharacterIssuesDetails)"
                  class="govuk-body"
                >
                  Details: {{ application.characterInformation.otherCharacterIssuesDetails }}
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
              v-if="isDraftApplication"
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
                {{ application.equalityAndDiversitySurvey.ethnicGroup | lookup }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Religion or faith are you
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.religionFaith | lookup }}
                <p
                  v-if="detailsDetector(application.equalityAndDiversitySurvey.otherReligionDetails)"
                  class="govuk-body"
                >
                  Details: {{ application.equalityAndDiversitySurvey.otherReligionDetails }}
                </p>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Gender
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.gender | lookup }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Changed gender
              </dt>
              <dd class="govuk-summary-list__value">
                {{ booleanAmender(application.equalityAndDiversitySurvey.changedGender) }}
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
                {{ application.equalityAndDiversitySurvey.sexualOrientation | lookup }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Disability
              </dt>
              <dd class="govuk-summary-list__value">
                {{ booleanAmender(application.disability) }}
                <p
                  v-if="detailsDetector(application.equalityAndDiversitySurvey.disabilityDetails)"
                  class="govuk-body"
                >
                  Details: {{ application.equalityAndDiversitySurvey.disabilityDetails }}
                </p>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Attended state or fee-paying school
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.stateOrFeeSchool | lookup }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Attended Oxbridge universities
              </dt>
              <dd class="govuk-summary-list__value">
                {{ booleanAmender(application.equalityAndDiversitySurvey.oxbridgeUni) }}
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                First generation to go to university
              </dt>
              <dd class="govuk-summary-list__value">
                {{ booleanAmender(application.equalityAndDiversitySurvey.firstGenerationStudent) }}
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
                  v-for="item in application.equalityAndDiversitySurvey.professionalBackground"
                  :key="item.name"
                >
                  {{ item | lookup }}
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
                  v-for="item in application.equalityAndDiversitySurvey.currentLegalRole"
                  :key="item.name"
                >
                  {{ item | lookup }}
                </li>
              </dd>
            </div>

            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Fee-paid judicial role experience
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.equalityAndDiversitySurvey.feePaidJudicialRole }}
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
              v-if="isDraftApplication"
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
              v-if="isDraftApplication"
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
              v-if="isDraftApplication"
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
                  <li v-if="item.startDate && item.endDate">
                    {{ item.startDate.toLocaleDateString() }} to {{ item.endDate.toLocaleDateString() }}
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
              v-if="isDraftApplication"
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

          <!-- <div
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
              v-if="isDraftApplication"
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
          </div> -->

          <!-- 
          <div
            id="self-competencies-heading"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Statement of suitability
            </h2>
            <router-link
              v-if="isDraftApplication"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'statement-of-suitability'}"
            >
              Change
            </router-link>

            <p class="govuk-body govuk-!-margin-bottom-8">
              t.b.c
            </p>
            
              @todo: this needs sorting once the upload changes are done
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
          -->
        </div><!-- END download-as-pdf-div -->

        <button
          v-if="isDraftApplication"
          :disabled="!canApply"
          class="govuk-button"
        >
          Send application
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import BackLink from '@/components/BackLink';
import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';

export default {
  components: {
    BackLink,
  },
  computed: {
    vacancy () {
      return this.$store.state.vacancy.record;
    },   
    application () {
      return this.$store.state.application.record;
    },
    isNonLegal () {
      return this.vacancy.typeOfExercise === 'non-legal';
    },
    isLegal () {
      return this.vacancy.typeOfExercise === 'legal';
    },
    isLeadership () {
      return this.vacancy.typeOfExercise === 'leadership';
    },
    isSenior () {
      return this.vacancy.typeOfExercise == 'senior';
    },
    isVacancyOpen() {
      return this.$store.getters['vacancy/isOpen'];
    },
    isApplicationComplete() {
      let isComplete = false;
      if (this.application && this.application.progress) {
        isComplete = true;
        if (!this.application.progress.personalDetails) { isComplete = false; }
        if (!this.application.progress.characterInformation) { isComplete = false; }
        if (!this.application.progress.equalityAndDiversitySurvey) { isComplete = false; }
        if (!this.application.progress.assessorsDetails) { isComplete = false; }
        if (this.vacancy.isSPTWOffered) {
          if (!this.application.progress.partTimeWorkingPreferences) { isComplete = false; }
        }
        if (this.vacancy.welshRequirement) {
          if (!this.application.progress.welshPosts) { isComplete = false; }
        }
        if (this.isLegal) {
          if (!this.application.progress.relevantQualifications) { isComplete = false; }
          if (!this.application.progress.postQualificationWorkExperience) { isComplete = false; }
          if (!this.application.progress.judicialExperience) { isComplete = false; }
          if (!this.application.progress.employmentGaps) { isComplete = false; }
        }
        if (this.isNonLegal) {
          if (!this.application.progress.relevantMemberships) { isComplete = false; }
          if (!this.application.progress.relevantExperience) { isComplete = false; }
          if (!this.application.progress.employmentGaps) { isComplete = false; }
        }
        switch (this.vacancy.assessmentOptions) {
        case 'self-assessment-with-competencies':
          if (!this.application.progress.selfAssessmentCompetencies) { isComplete = false; }
          break;
        case 'statement-of-suitability-with-competencies':
          if (!this.application.progress.statementOfSuitability) { isComplete = false; }
          break;
        case 'statement-of-suitability-with-skills-and-abilities':
          if (!this.application.progress.statementOfSuitability) { isComplete = false; }
          break;
        case 'statement-of-suitability-with-skills-and-abilities-and-cv':
          if (!this.application.progress.statementOfSuitability) { isComplete = false; }
          break;
        case 'statement-of-eligibility':
          if (!this.application.progress.statementOfEligibility) { isComplete = false; }
          break;
        default:
        }
      }
      return isComplete;
    },
    isDraftApplication() {
      return this.application.status === 'draft';
    },
    canApply () {
      return this.isDraftApplication
        && this.isVacancyOpen
        && this.isApplicationComplete;
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
    async save() {
      await this.$store.dispatch('application/submit');
      this.$router.push({ name: 'confirmation' });
    },
    downloadAsPdf() {
      const pdf = new jsPDF();
      pdf.fromHTML(
        document.querySelector('#download-as-pdf-div'), 
        15, 
        15, 
        {
          width: 170,
        }
      );
      pdf.save('judicial-appointments-application.pdf');
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
