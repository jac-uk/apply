<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink class="govuk-!-margin-top-0" />

        <Countdown
          :close-time="vacancyCloseTime"
          :countdown-length="60"
        />

        <ErrorSummary :errors="errors" />

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

        <div
          ref="download-as-pdf-div"
        >
          <h1 class="govuk-heading-l">
            {{ vacancy.name }}
          </h1>

          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Personal details
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'apply-personal-details'}"
            >
              Change
            </RouterLink>
          </div>

          <PersonalDetails
            :application="application"
          />

          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Character information
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: destinationUrl}"
            >
              Change
            </RouterLink>
          </div>

          <dl v-if="isVersion2 && application.characterInformationV2">
            <CriminalOffencesSummary
              :character-information="application.characterInformationV2"
              :can-edit="isDraftApplication"
              :display-change-link="isInformationReview"
            />
            <FixedPenaltiesSummary
              :character-information="application.characterInformationV2"
              :can-edit="isDraftApplication"
              :display-change-link="isInformationReview"
            />
            <MotoringOffencesSummary
              :character-information="application.characterInformationV2"
              :can-edit="isDraftApplication"
              :display-change-link="isInformationReview"
            />
            <FinancialMattersSummary
              :character-information="application.characterInformationV2"
              :can-edit="isDraftApplication"
              :display-change-link="isInformationReview"
            />
            <ProfessionalConductSummary
              :character-information="application.characterInformationV2"
              :can-edit="isDraftApplication"
              :display-change-link="isInformationReview"
            />
            <FurtherInformationSummary
              :character-information="application.characterInformationV2"
              :can-edit="isDraftApplication"
              :display-change-link="isInformationReview"
            />
            <CharacterDeclarationSummary
              :character-information="application.characterInformationV2"
            />
          </dl>
          <dl v-else>
            <CharacterInformationSummaryV1
              :character-information="application.characterInformation || {}"
            />
          </dl>

          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Equality and diversity information
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'equality-and-diversity-survey'}"
            >
              Change
            </RouterLink>
          </div>

          <Diversity
            :application="application"
            :is-legal="isLegal"
          />

          <div
            v-if="vacancy.locationQuestion"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Location preferences
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'location-preferences'}"
            >
              Change
            </RouterLink>
            <dl class="govuk-summary-list">
              <dt class="govuk-summary-list__key">
                {{ vacancy.locationQuestion }}
              </dt>
              <dd
                v-if="vacancy.locationQuestionType == 'single-choice'"
                class="govuk-summary-list__value"
              >
                {{ application.locationPreferences }}
              </dd>
              <dd
                v-else
                class="govuk-summary-list__value"
              >
                <p
                  v-for="(item, index) in application.locationPreferences"
                  :key="item.name"
                  class="govuk-body"
                >
                  {{ item }}
                  <strong>
                    {{ `${index + 1}:` }}
                  </strong>
                  {{ `${item}` }}
                </p>
              </dd>
            </dl>
          </div>

          <div
            v-if="vacancy.jurisdictionQuestion"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Jurisdiction preferences
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'jurisdiction-preferences'}"
            >
              Change
            </RouterLink>
            <dl class="govuk-summary-list">
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  {{ vacancy.jurisdictionQuestion }}
                </dt>
                <dd
                  v-if="vacancy.jurisdictionQuestionType == 'single-choice'"
                  class="govuk-summary-list__value"
                >
                  {{ application.jurisdictionPreferences }}
                </dd>
                <dd
                  v-else
                  class="govuk-summary-list__value"
                >
                  <p
                    v-for="item in application.jurisdictionPreferences"
                    :key="item.name"
                    class="govuk-body"
                  >
                    {{ item }}
                  </p>
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="vacancy.welshRequirement">
            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Welsh posts
              </h2>
              <RouterLink
                v-if="isDraftApplication && canEdit"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'welsh-posts'}"
              >
                Change
              </RouterLink>
            </div>

            <WelshRequirement
              :application="application"
            />
          </div>

          <div
            v-if="vacancy.yesSalaryDetails"
            class="govuk-!-margin-top-9"
          >
            <h2 class="govuk-heading-l">
              Part Time Working Preferences
            </h2>

            <dl class="govuk-summary-list">
              <dt class="govuk-summary-list__key">
                {{ vacancy.yesSalaryDetails }}
              </dt>
              <dd
                class="govuk-summary-list__value"
              >
                {{ application.partTimeWorkingPreferencesDetails }}
              </dd>
            </dl>
          </div>

          <div
            v-if="application.additionalWorkingPreferences"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Additional Preferences
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'additional-working-preferences'}"
            >
              Change
            </RouterLink>

            <AdditionalWorkingPreferences
              :application="application"
              :vacancy="vacancy"
            />
          </div>

          <div v-if="isLegal">
            <div
              class="govuk-!-margin-top-9"
            >
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Qualifications
              </h2>
              <RouterLink
                v-if="isDraftApplication && canEdit"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'relevant-qualifications'}"
              >
                Change
              </RouterLink>
            </div>
            <Qualifications
              :application="application"
            />
            <Schedule2
              :application="application"
              :vacancy="vacancy"
            />
          </div>

          <div v-if="showMemberships">
            <div
              class="govuk-!-margin-top-9"
            >
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Memberships
              </h2>
              <RouterLink
                v-if="isDraftApplication && canEdit"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'relevant-memberships'}"
              >
                Change
              </RouterLink>
            </div>
            <Memberships
              :application="application"
              :vacancy="vacancy"
            />
          </div>

          <div v-if="isNonLegal">
            <div
              class="govuk-!-margin-top-9"
            >
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Experience
              </h2>
              <RouterLink
                v-if="isDraftApplication && canEdit"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'relevant-experience'}"
              >
                Change
              </RouterLink>
            </div>

            <dl
              v-for="item in application.experience"
              :key="item.name"
              class="govuk-summary-list govuk-!-margin-bottom-8"
            >
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
                  Date qualified
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul
                    v-if="item.startDate"
                    class="govuk-list"
                  >
                    <li v-if="item.endDate">
                      {{ item.startDate | formatDate }} to {{ item.endDate | formatDate }}
                    </li>
                    <li v-else>
                      {{ item.startDate | formatDate }} — current
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="isLegal">
            <div
              class="govuk-!-margin-top-9"
            >
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Post-qualification experience
              </h2>
              <RouterLink
                v-if="isDraftApplication && canEdit"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'post-qualification-work-experience'}"
              >
                Change
              </RouterLink>
            </div>

            <PostQualificationExperience
              :application="application"
            />
          </div>

          <div v-if="isLegal && vacancy.previousJudicialExperienceApply">
            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Judicial experience
              </h2>
              <RouterLink
                v-if="isDraftApplication && canEdit"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'judicial-experience'}"
              >
                Change
              </RouterLink>
            </div>

            <JudicialExperience
              :application="application"
              :vacancy="vacancy"
            />
          </div>

          <div
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Gaps in employment
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'employment-gaps'}"
            >
              Change
            </RouterLink>
          </div>

          <GapsInEmployment
            :application="application"
            :is-legal="isLegal"
          />

          <div class="govuk-!-margin-top-9">
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Reasonable length of service
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link info-link--review-final-check--reasonable-length-of-service--change"
              style="display:inline-block;"
              :to="{name: 'reasonable-length-of-service'}"
            >
              Change
            </RouterLink>
          </div>
          <dl class="govuk-summary-list govuk-!-margin-bottom-8">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Can work a resonable length of service
              </dt>
              <dd class="govuk-summary-list__value">
                {{ application.canGiveReasonableLOS | toYesNo }}
                <p v-if="application.canGiveReasonableLOS == false">
                  {{ application.cantGiveReasonableLOSDetails }}
                </p>
              </dd>
            </div>
          </dl>

          <div v-if="showAssessorsDetails">
            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Independent assessors
              </h2>
              <RouterLink
                v-if="isDraftApplication && canEdit"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'assessors-details'}"
              >
                Change
              </RouterLink>
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
                  Title or position
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ application.firstAssessorTitle }}
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
                  Title or position
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ application.secondAssessorTitle }}
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
          </div>

          <div v-if="showLeadershipJudgeDetails">
            <div class="govuk-!-margin-top-9">
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Leadership Judge details
              </h2>
              <RouterLink
                v-if="isDraftApplication && canEdit"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'leadership-judge-details'}"
              >
                Change
              </RouterLink>
            </div>
            <dl
              v-if="application.leadershipJudgeDetails"
              class="govuk-summary-list"
            >
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Full name
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ application.leadershipJudgeDetails.fullName }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Title or position
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ application.leadershipJudgeDetails.title }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Email
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ application.leadershipJudgeDetails.email }}
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Telephone
                </dt>
                <dd class="govuk-summary-list__value">
                  {{ application.leadershipJudgeDetails.phone }}
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="application.additionalInfo">
            <div
              class="govuk-!-margin-top-9"
            >
              <h2
                class="govuk-heading-l"
                style="display:inline-block;"
              >
                Additional Information
              </h2>
              <RouterLink
                v-if="isDraftApplication && canEdit"
                class="govuk-link govuk-body-m change-link"
                style="display:inline-block;"
                :to="{name: 'additional-information'}"
              >
                Change
              </RouterLink>
            </div>

            <dl
              class="govuk-summary-list govuk-!-margin-bottom-8"
            >
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  How did you hear about the vacancy?
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li
                      v-for="(item, index) in application.additionalInfo.listedSources"
                      :key="index"
                    >
                      <p
                        v-if="item == 'other'"
                        class="govuk-body govuk-!-margin-bottom-0"
                      >
                        <span class="govuk-caption-m">{{ item | lookup }}</span>
                        {{ application.additionalInfo.otherSources }}
                      </p>
                      <span v-else>{{ item | lookup }}</span>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div
            v-if="application.selectionCriteriaAnswers"
            class="govuk-!-margin-top-9"
          >
            <h2 class="govuk-heading-l">
              Additional Selection Criteria
            </h2>

            <dl class="govuk-summary-list">
              <div
                v-for="(item, index) in application.selectionCriteriaAnswers"
                :key="index"
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  {{ item.title }}
                </dt>
                <dd class="govuk-summary-list__value">
                  <span v-if="item.answer">
                    {{ item.answerDetails }}
                  </span>
                  <span v-else>I do not meet this requirement</span>
                </dd>
              </div>
            </dl>
          </div>

          <div
            v-if="showStatementOfSuitability"
            id="assessments-heading"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Statement of suitability
            </h2>

            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'statement-of-suitability'}"
            >
              Change
            </RouterLink>

            <div
              class="govuk-summary-list__row"
            >
              <dt class="govuk-summary-list__key">
                Uploaded statement of suitability
              </dt>
              <dd class="govuk-summary-list__value">
                <span v-if="application.uploadedSuitabilityStatement">Your file has been received</span>
                <span v-else>Not yet received</span>
              </dd>
            </div>
          </div>

          <div
            v-if="showSelfAssessment"
            id="self-assessment-heading"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Self assessment competencies
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'self-assessment-competencies'}"
            >
              Change
            </RouterLink>

            <dl class="govuk-summary-list">
              <div
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Uploaded finished self assessment
                </dt>
                <dd class="govuk-summary-list__value">
                  <span v-if="application.uploadedSelfAssessment">Your file has been received</span>
                  <span v-else>Not yet received</span>
                </dd>
              </div>
            </dl>
          </div>

          <div
            v-if="showCV"
            id="cv-heading"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Curriculum vitae (CV)
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'cv'}"
            >
              Change
            </RouterLink>

            <dl class="govuk-summary-list">
              <div
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Uploaded CV
                </dt>
                <dd class="govuk-summary-list__value">
                  <span v-if="application.uploadedCV">Your file has been received</span>
                  <span v-else>Not yet received</span>
                </dd>
              </div>
            </dl>
          </div>

          <div
            v-if="showCoveringLetter"
            id="covering-letter-heading"
            class="govuk-!-margin-top-9"
          >
            <h2
              class="govuk-heading-l"
              style="display:inline-block;"
            >
              Covering Letter
            </h2>
            <RouterLink
              v-if="isDraftApplication && canEdit"
              class="govuk-link govuk-body-m change-link"
              style="display:inline-block;"
              :to="{name: 'covering-letter'}"
            >
              Change
            </RouterLink>

            <dl class="govuk-summary-list">
              <div
                class="govuk-summary-list__row"
              >
                <dt class="govuk-summary-list__key">
                  Uploaded Covering Letter
                </dt>
                <dd class="govuk-summary-list__value">
                  <span v-if="application.uploadedCoveringLetter">Your file has been received</span>
                  <span v-else>Not yet received</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <!-- END download-as-pdf-div -->

        <button
          v-if="isDraftApplication"
          :disabled="!canApply"
          class="govuk-button govuk-!-margin-top-8"
        >
          Send application
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary';
import BackLink from '@/components/BackLink';
import jsPDF from 'jspdf';
import ApplyMixIn from '../ApplyMixIn';
import PersonalDetails from './PersonalDetails';
import CriminalOffencesSummary from '@/views/Apply/CharacterInformation/InformationReview/CriminalOffencesSummary';
import FixedPenaltiesSummary from '@/views/Apply/CharacterInformation/InformationReview/FixedPenaltiesSummary';
import MotoringOffencesSummary from '@/views/Apply/CharacterInformation/InformationReview/MotoringOffencesSummary';
import FinancialMattersSummary from '@/views/Apply/CharacterInformation/InformationReview/FinancialMattersSummary';
import ProfessionalConductSummary from '@/views/Apply/CharacterInformation/InformationReview/ProfessionalConductSummary';
import FurtherInformationSummary from '@/views/Apply/CharacterInformation/InformationReview/FurtherInformationSummary';
import CharacterDeclarationSummary from '@/views/Apply/CharacterInformation/InformationReview/CharacterDeclarationSummary';
import CharacterInformationSummaryV1 from '@/views/Apply/CharacterInformation/CharacterInformationSummaryV1';
import Diversity from './Diversity';
import WelshRequirement from './WelshRequirement';
import AdditionalWorkingPreferences from './AdditionalWorkingPreferences';
import Qualifications from './Qualifications.vue';
import Schedule2 from './Schedule2.vue';
import Memberships from './Memberships.vue';
import PostQualificationExperience from './PostQualificationExperience.vue';
import JudicialExperience from './JudicialExperience.vue';
import GapsInEmployment from './GapsInEmployment';

export default {
  components: {
    BackLink,
    ErrorSummary,
    PersonalDetails,
    CharacterInformationSummaryV1,
    CharacterDeclarationSummary,
    CriminalOffencesSummary,
    FixedPenaltiesSummary,
    MotoringOffencesSummary,
    FinancialMattersSummary,
    ProfessionalConductSummary,
    FurtherInformationSummary,
    Diversity,
    WelshRequirement,
    AdditionalWorkingPreferences,
    Qualifications,
    Schedule2,
    Memberships,
    PostQualificationExperience,
    JudicialExperience,
    GapsInEmployment,
  },
  mixins: [ApplyMixIn],
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    isVersion2 () {
      return this.vacancy._applicationVersion && this.vacancy._applicationVersion === 2;
    },
    isLeadership () {
      return this.vacancy.typeOfExercise === 'leadership';
    },
    isSenior () {
      return this.vacancy.typeOfExercise == 'senior';
    },
    showMemberships() {
      return this.vacancy.memberships && this.vacancy.memberships.indexOf('none') === -1;
    },
    isInformationReview() {
      return this.$route.name === 'character-information-review';
    },
    destinationUrl() {
      return this.isVersion2 && this.application.characterInformationV2 ? 'character-information-review' : 'character-information-form-v1';
    },
    canEdit () {
      return this.isDraftApplication && this.isVacancyOpen;
    },
  },
  methods: {
    scrollToTop () {
      this.$el.scrollIntoView();
    },
    async save() {
      this.errors = [];
      try {
        await this.$store.dispatch('application/submit');

        this.$router.push({ name: 'confirmation' });
      } catch (error) {
        this.errors.push({ message: 'Failed to submit application.' });
        this.scrollToTop();
      }
    },
    downloadAsPdf() {
      const pdf = new jsPDF();
      pdf.fromHTML(
        this.$refs['download-as-pdf-div'],
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
