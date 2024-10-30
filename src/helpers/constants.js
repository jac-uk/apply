const STATUS = {
  DRAFT: 'draft',
  APPLIED: 'applied',
  WITHDRAWN: 'withdrawn',
  SELECTED: 'selected',
};

const EXERCISE_STAGE = {
  // v2
  SHORTLISTING: 'shortlisting',
  SELECTION: 'selection',
  SCC: 'scc',
  RECOMMENDATION: 'recommendation',

  // v2 proposed but then removed
  APPLIED: 'applied', // to be removed
  SELECTABLE: 'selectable', // to be removed

  // v1
  REVIEW: 'review', // to be replaced with shortlisting
  SHORTLISTED: 'shortlisted', // to be replaced with selection
  SELECTED: 'selected', // to be replaced with recommendation
  RECOMMENDED: 'recommended', // to be replaced with recommendation
  HANDOVER: 'handover', // to be removed/replaced with recommendation
};

const APPLICATION_STATUS = {
  // v2
  CRITICAL_ANALYSIS_PASSED: 'criticalAnalysisPassed',
  CRITICAL_ANALYSIS_FAILED: 'criticalAnalysisFailed',
  SITUATIONAL_JUDGEMENT_PASSED: 'situationalJudgementPassed',
  SITUATIONAL_JUDGEMENT_FAILED: 'situationalJudgementFailed',
  QUALIFYING_TEST_PASSED: 'qualifyingTestPassed',
  QUALIFYING_TEST_FAILED: 'qualifyingTestFailed',
  QUALIFYING_TEST_NOT_SUBMITTED: 'noTestSubmitted',
  SCENARIO_TEST_PASSED: 'scenarioTestPassed',
  SCENARIO_TEST_FAILED: 'scenarioTestFailed',
  SCENARIO_TEST_NOT_SUBMITTED: 'noScenarioTestSubmitted',
  SIFT_PASSED: 'siftPassed',
  SIFT_FAILED: 'siftFailed',
  TELEPHONE_ASSESSMENT_PASSED: 'telephoneAssessmentPassed',
  TELEPHONE_ASSESSMENT_FAILED: 'telephoneAssessmentFailed',
  SHORTLISTING_PASSED: 'shortlistingOutcomePassed',
  SHORTLISTING_FAILED: 'shortlistingOutcomeFailed',
  FULL_APPLICATION_NOT_SUBMITTED: 'fullApplicationNotSubmitted',
  ELIGIBILITY_SCC_PASSED: 'eligibilitySCCPassed',
  ELIGIBILITY_SCC_FAILED: 'eligibilitySCCFailed',
  CHARACTER_AND_SELECTION_SCC_PASSED: 'characterAndSelectionSCCPassed',
  CHARACTER_AND_SELECTION_SCC_FAILED: 'characterAndSelectionSCCFailed',
  STATUTORY_CONSULTATION_PASSED: 'statutoryConsultationPassed',
  STATUTORY_CONSULTATION_FAILED: 'statutoryConsultationFailed',
  SELECTION_INVITED: 'selectionInvited',
  REJECTED_INELIGIBLE_STATUTORY: 'rejectedIneligibleStatutory',
  REJECTED_INELIGIBLE_ADDITIONAL: 'rejectedIneligibleAdditional',
  REJECTED_CHARACTER: 'rejectedCharacter',
  REJECTED_MERIT: 'rejectedMerit',
  SELECTION_DAY_PASSED: 'selectionDayPassed',
  SELECTION_DAY_FAILED: 'selectionDayFailed',
  SELECTION_PASSED: 'selectionOutcomePassed',
  SELECTION_FAILED: 'selectionOutcomeFailed',
  SELECTION_OUTCOME_PASSED: 'selectionOutcomePassed',
  SELECTION_OUTCOME_FAILED: 'selectionOutcomeFailed',
  PASSED_RECOMMENDED: 'passedRecommended',
  PASSED_NOT_RECOMMENDED: 'passedNotRecommended',
  RECOMMENDED_IMMEDIATE: 'recommendedImmediate',
  RECOMMENDED_FUTURE: 'recommendedFuture',
  RECONSIDER: 'reconsider',
  SECOND_STAGE_INVITED: 'secondStageInvited',
  SECOND_STAGE_PASSED: 'empTiebreakerPassed',
  SECOND_STAGE_FAILED: 'empTiebreakerFailed',
  APPROVED_IMMEDIATE: 'approvedImmediate',
  APPROVED_FUTURE: 'approvedFuture',
  WITHDRAWN: 'withdrawn',

  // shortlisting other
  OTHER_PASSED: 'otherPassed',
  OTHER_FAILED: 'otherFailed',

  // v1 REVIEW
  PASSED_SIFT: 'passedSift',
  FAILED_SIFT: 'failedSift',
  SUBMITTED_FIRST_TEST: 'submittedFirstTest',
  FAILED_FIRST_TEST: 'failedFirstTest',
  SUBMITTED_SCENARIO_TEST: 'submittedScenarioTest',
  PASSED_FIRST_TEST: 'passedFirstTest',
  FAILED_SCENARIO_TEST: 'failedScenarioTest',
  PASSED_SCENARIO_TEST: 'passedScenarioTest',
  FAILED_TELEPHONE_ASSESSMENT: 'failedTelephoneAssessment',
  PASSED_TELEPHONE_ASSESSMENT: 'passedTelephoneAssessment',
  NO_TEST_SUBMITTED: 'noTestSubmitted',
  TEST_SUBMITTED_OVER_TIME: 'testSubmittedOverTime',
  WITHDREW_APPLICATION: 'withdrewApplication',
  REJECTED_AS_INELIGIBLE: 'rejectedAsIneligible',
  // v1 SHORTLISTED
  INVITED_TO_SELECTION_DAY: 'invitedToSelectionDay',
  // v1 SELECTED
  PASSED_SELECTION: 'passedSelection',
  FAILED_SELECTION: 'failedSelection',
  PASSED_BUT_NOT_RECOMMENDED: 'passedButNotRecommended',
  // v1 RECOMMENDED
  REJECTED_BY_CHARACTER: 'rejectedByCharacter',
  APPROVED_FOR_IMMEDIATE_APPOINTMENT: 'approvedForImmediateAppointment',
  APPROVED_FOR_FUTURE_APPOINTMENT: 'approvedForFutureAppointment',
  SCC_TO_RECONSIDER: 'sccToReconsider',
};

const QUALIFYING_TEST = {
  TYPE: {
    SCENARIO: 'scenario',
    CRITICAL_ANALYSIS: 'critical-analysis',
    SITUATIONAL_JUDGEMENT: 'situational-judgement',
  },
  STATUS: {
    CREATED: 'created',
    SUBMITTED: 'submitted-for-approval',
    APPROVED: 'approved',
    INITIALISED: 'initialised',
    ACTIVATED: 'activated',
    NOT_STARTED: 'not-started',
    STARTED: 'started',
    PAUSED: 'paused',
    COMPLETED: 'completed',
  },
};

const QUALIFYING_TEST_RESPONSE = {
  STATUS: {
    CREATED: 'created',
    ACTIVATED: 'activated',
    STARTED: 'started',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  },
};

const ADVERT_TYPES = {
  LISTING: 'listing',
  BASIC: 'basic',
  FULL: 'full',
  EXTERNAL: 'external',
};

const DEFAULT = {
  YES: 'Yes',
  NO: 'No',
};

const WELSH_POSTS_CONTACT_MAILBOX = 'enquiries@judicialappointments.gov.uk';
const WELSH_POSTS_EMAIL_SUBJECT = 'Welsh application form request';

const RECAPTCHA_ACTIONS = {
  LOGIN: {
    action: 'login',
    score: 0.5,
  },
};

const ASSESSOR_TYPES = {
  PROFESSIONAL: 'professional',
  JUDICIAL: 'judicial',
  PERSONAL: 'personal',
};

const NOT_COMPLETE_PUPILLAGE_REASONS = {
  TRANSFERRED: 'transferred ',
  CALLED_PRE_2002: 'called-pre-2002',
  OTHER: 'other',
};

const LANGUAGES = {
  ENGLISH: 'eng',
  WELSH: 'cym',
};

const ASSESSMENT_METHOD = {
  SELF_ASSESSMENT_WITH_COMPETENCIES: 'selfAssessmentWithCompetencies',
  COVERING_LETTER: 'coveringLetter',
  CV: 'cv',
  STATEMENT_OF_SUITABILITY_WITH_COMPETENCIES: 'statementOfSuitabilityWithCompetencies',
  STATEMENT_OF_SUITABILITY_WITH_SKILLS_AND_ABILITIES: 'statementOfSuitabilityWithSkillsAndAbilities',
  STATEMENT_OF_ELIGIBILITY: 'statementOfEligibility',
  INDEPENDENT_ASSESSMENTS: 'independentAssessments',
  LEADERSHIP_JUDGE_ASSESSMENT: 'leadershipJudgeAssessment',
};

const APPLICATION_FORM_PARTS = {
  PERSONAL_DETAILS: 'personalDetails',
  CHARACTER_INFORMATION: 'characterInformation',
  EQUALITY_AND_DIVERSITY_SURVEY: 'equalityAndDiversitySurvey',
  PART_TIME_WORKING_PREFERENCES: 'partTimeWorkingPreferences',
  LOCATION_PREFERENCES: 'locationPreferences',
  JURISDICTION_PREFERENCES: 'jurisdictionPreferences',
  ADDITIONAL_WORKING_PREFERENCES: 'additionalWorkingPreferences',
  WELSH_POSTS: 'welshPosts',
  RELEVANT_QUALIFICATIONS: 'relevantQualifications',
  RELEVANT_MEMBERSHIPS: 'relevantMemberships',
  POST_QUALIFICATION_WORK_EXPERIENCE: 'postQualificationWorkExperience',
  JUDICIAL_EXPERIENCE: 'judicialExperience',
  RELEVANT_EXPERIENCE: 'relevantExperience',
  EMPLOYMENT_GAPS: 'employmentGaps',
  REASONABLE_LENGTH_OF_SERVICE: 'reasonableLengthOfService',
  ASSESSORS_DETAILS: 'assessorsDetails',
  LEADERSHIP_JUDGE_DETAILS: 'leadershipJudgeDetails',
  STATEMENT_OF_SUITABILITY: 'statementOfSuitability',
  COVERING_LETTER: 'coveringLetter',
  CV: 'cv',
  STATEMENT_OF_ELIGIBILITY: 'statementOfEligibility',
  SELF_ASSESSMENT_COMPETENCIES: 'selfAssessmentCompetencies',
  ADDITIONAL_INFO: 'additionalInfo',
  CANDIDATE_AVAILABILITY: 'candidateAvailability',
  PANEL_CONFLICTS: 'panelConflicts',
  COMMISSIONER_CONFLICTS: 'commissionerConflicts',
  CHARACTER_CHECKS: 'characterChecks',
  REASONABLE_ADJUSTMENTS: 'reasonableAdjustments',
  WORKING_PREFERENCES: 'workingPreferences',
};

const CANDIDATE_FORM_RESPONSE_STATUS = {
  CREATED: 'created',
  REQUESTED: 'requested',
  COMPLETED: 'completed',
};

const DEFAULT_WORD_COUNT = {
  ADDITIONAL_SELECTION_CRITERIA: 250,
};

export {
  STATUS,
  QUALIFYING_TEST,
  QUALIFYING_TEST_RESPONSE,
  ADVERT_TYPES,
  DEFAULT,
  WELSH_POSTS_CONTACT_MAILBOX,
  WELSH_POSTS_EMAIL_SUBJECT,
  RECAPTCHA_ACTIONS,
  ASSESSOR_TYPES,
  NOT_COMPLETE_PUPILLAGE_REASONS,
  LANGUAGES,
  ASSESSMENT_METHOD,
  APPLICATION_FORM_PARTS,
  CANDIDATE_FORM_RESPONSE_STATUS,
  DEFAULT_WORD_COUNT,
  EXERCISE_STAGE,
  APPLICATION_STATUS
};
