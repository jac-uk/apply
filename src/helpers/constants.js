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

const DEFAULT = {
  YES: 'Yes',
  NO: 'No',
};

const WELSH_POSTS_CONTACT_MAILBOX = 'enquiries@judicialappointments.gov.uk';
const WELSH_POSTS_EMAIL_SUBJECT = 'Welsh application form request';

const DECLARATION1 = `I understand that it is my continuing duty, throughout the time that my application is being considered,
                      to inform the Selection Exercise Team of all relevant matters that might affect the acceptability of my
                      application when considered against this guidance.`;

const DECLARATION2 = `I understand that failure to declare on the application form relevant information which later comes
                      to light is likely to rule out further consideration of my application.`;

const DECLARATION3 = `I also understand that failure to disclose information additional to that included on my application for,
                      upon the request of the JAC and to the timetable requested by the JAC, may also rule out further consideration
                      of my application.`;

const CRIMINAL_OFFENCES_URL = 'https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#criminal-offences';
const FIXED_PENALTY_NOTICES_URL = 'https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#fixed-penalty-notices-including-motoring';
const MOTORING_OFFENCES_URL = 'https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#motoring-offences';
const FINANCIAL_MATTERS_URL = 'https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#financial-matters';
const BANKRUPTCY_IVA_URL = 'https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#bankruptcy-or-iva';
const LATE_TAX_VAT_RETURNS_HMRC_URL = 'https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#vat-tax-hmrc';
const PROFESSIONAL_CONDUCT_URL = 'https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#professional-conduct';
const FURTHER_INFORMATION_URL = 'https://judicialappointments.gov.uk/guidance-on-the-application-process-2/good-character/good-character-guidance/#further-information-to-be-disclosed';

export {
  STATUS,
  QUALIFYING_TEST,
  QUALIFYING_TEST_RESPONSE,
  DEFAULT,
  WELSH_POSTS_CONTACT_MAILBOX,
  WELSH_POSTS_EMAIL_SUBJECT,
  DECLARATION1,
  DECLARATION2,
  DECLARATION3,
  CRIMINAL_OFFENCES_URL,
  FIXED_PENALTY_NOTICES_URL,
  MOTORING_OFFENCES_URL,
  FINANCIAL_MATTERS_URL,
  BANKRUPTCY_IVA_URL,
  LATE_TAX_VAT_RETURNS_HMRC_URL,
  PROFESSIONAL_CONDUCT_URL,
  FURTHER_INFORMATION_URL
};
