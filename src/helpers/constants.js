const STATUS = {
  DRAFT: 'draft',
  APPLIED: 'applied',
  WITHDRAWN: 'withdrawn',
  SELECTED: 'selected',
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
  APPLICATION_FORM_PARTS
};
