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

const LANGUAGES = {
  ENGLISH: 'eng',
  WELSH: 'cym',
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
  LANGUAGES
};
