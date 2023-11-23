import { QUALIFYING_TEST, ASSESSOR_TYPES, NOT_COMPLETE_PUPILLAGE_REASONS, LANGUAGES, ASSESSMENT_METHOD, APPLICATION_FORM_PARTS } from '@/helpers/constants';

const capitalize = (value) => {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const hyphenize = (value) => {
  let hyphenizeStr = '';
  if (value && typeof value !== 'object') {
    value = value.toString();
    hyphenizeStr = value.replace(/\s+/g, '-').toLowerCase();
  }
  return hyphenizeStr;
};

const formatDate = (value, type) => {
  if (value) {
    const objDate = new Date(Date.parse(value));
    switch (type) {
    case 'month':
      return `${objDate.toLocaleString('en-GB', { month: 'long' })} ${objDate.getUTCFullYear()}`;
    case 'datetime':
      return objDate.toLocaleString('en-GB');
    case 'datetime-without-second':
      return objDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    default:
      return objDate.toLocaleDateString('en-GB');
    }
  }
};

const formatEstimatedDate = (value) => {
  if (value instanceof Date) {
    return formatDate(value, 'month');
  }
  const parts = value.split('-');

  if (parts.length === 1) {
    return value;
  }

  if (parts.length === 2) {
    return formatDate(validateDateParts(parts), 'month');
  }

  return formatDate(validateDateParts(parts));
};

const validateDateParts = (dateParts) => {
    const month = dateParts[1];
    if (month.length === 1) {
      dateParts[1] = `0${  month}`;
    }
    if (dateParts.length === 2) {
      dateParts.push('01');
    } else {
      if (dateParts.length === 3) {
        const day = dateParts[2];
        if (day.length === 1) {
          dateParts[2] = `0${  day}`;
        }
      }
    }

  return `${dateParts[0]  }-${  dateParts[1]  }-${  dateParts[2]}`;
};

const formatCurrency = (value) => {
  let amount = parseFloat(value);
  if (isNaN(amount)) {
    amount = 0;
  }
  if (typeof amount === 'number') {
    amount = amount.toLocaleString('en-GB',
      { style: 'currency', currency: 'GBP' }
    );
  }
  return amount;
};

const toYesNo = (value) => {
  // Only convert booleans, not all falsy values mean "no"
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return value;
};

const showAlternative = (value, optional) => value || optional;

const showHTMLBreaks = (text) => {
  let returnText = '';
  if (text) {
    returnText = text;
    returnText = returnText.replace(/</g, '&lt;');
    returnText = returnText.replace(/>/g, '&gt;');
    returnText = returnText.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
  return returnText;
};

const lookup = (value) => {
  if (typeof value === 'string') {
    // @TODO: extract lookup values
    const lookup = {
      'academic': 'Academic',
      'acting-arbitrator': 'Acting as an arbitrator',
      'acting-mediator-in-resolving-issues-that-are-of-proceedings': 'Acting as mediator in connection with attempts to resolve issues that are, or if not resolved could be, the subject of proceedings',
      'administrative-appeals-chamber': 'Administrative Appeals Chamber',
      'advising-application-of-law': 'Advising on the application of the law',
      'advocate-scottish-bar': 'Advocate – enrolled with the Scottish bar',
      'advocate-scotland': 'Advocate - Scotland',
      'african': 'African',
      'another-commonwealth-country': 'Another Commonwealth country',
      'approved': 'Approved',
      'assisting-in-proceedings-for-resolution-of-issues-under-law': 'Assisting persons involved in proceedings for the resolution of issues arising under the law',
      'athiest': 'Atheist',
      'atheist': 'Atheist',
      'bangladeshi': 'Bangladeshi',
      'barrister': 'Barrister',
      'bisexual': 'Bisexual',
      'both': 'Both',
      'buddhist': 'Buddhist',
      'caribbean': 'Caribbean',
      'chartered-association-of-building-engineers': 'Chartered Association of Building Engineers',
      'chartered-institute-of-building': 'Chartered Institute of Building',
      'chartered-institute-of-environmental-health': 'Chartered Institute of Environmental Health',
      'chinese': 'Chinese',
      'christian': 'Christian',
      'cilex': 'CILEx fellow (this might be called Fellow ILEX)',
      'CILEx': 'Fellow of the Chartered Institute of Legal Executives (CILEx)',
      'civil': 'Civil',
      'closed': 'Closed',
      'court': 'Court',
      'crime': 'Crime',
      'critical-analysis-qualifying-test': 'Critical analysis qualifying test (QT)',
      'devolution-questions': 'Devolution questions',
      'draft': 'Draft',
      'drafting-documents-that-affect-rights-obligations': 'Drafting documents intended to affect persons\' rights or obligations',
      'employment-appeals-tribunal': 'Employment Appeals Tribunal',
      'employment-tribunal': 'Employment Tribunal',
      'england-wales': 'England and Wales',
      'false': 'No',
      'family': 'Family',
      'fee-paid': 'Fee paid',
      'fee-paid-court-judge': 'Fee-paid court judge',
      'fee-paid-court-post': 'Fee-paid court post',
      'fee-paid-tribunal-judge': 'Fee-paid tribunal judge',
      'fee-paid-tribunal-post': 'Fee-paid tribunal post',
      'female': 'Female',
      'gay-man': 'Gay man',
      'gay-woman-lesbian': 'Gay woman or lesbian',
      'gender-neutral': 'Gender neutral',
      'general-medical-council': 'General Medical Council',
      'general-regulatory-chamber': 'General Regulatory Chamber',
      'group-1': 'Group 1 - £262,264',
      'group-1.1': 'Group 1.1 - £234,184',
      'group-2': 'Group 2 - £226,193',
      'group-3': 'Group 3 - £215,094',
      'group-4': 'Group 4 - £188,901',
      'group-5': 'Group 5 - £151,497',
      'group-5+': 'Group 5+ - £160,377',
      'group-6.1': 'Group 6.1 - £140,289',
      'group-6.2': 'Group 6.2 - £132,075',
      'group-7': 'Group 7 - £112,542',
      'group-8': 'Group 8 - £89,428',
      'gypsy-irish-traveller': 'Gypsy or Irish Traveller',
      'health-education-and-social-care-chamber': 'Health, Education and Social Care Chamber',
      'heterosexual-straight': 'Heterosexual or straight',
      'hindu': 'Hindu',
      'immigration-and-asylum-chamber': 'Immigration and Asylum Chamber',
      'indian': 'Indian',
      'irish': 'Irish',
      'jac-website': 'JAC Website',
      'jewish': 'Jewish',
      'judicial-office-extranet': 'Judicial Office Extranet',
      'judicial-functions': 'The carrying-out of judicial functions of any court or tribunal',
      'judging-your-future-newsletter': 'Judging Your Future Newsletter',
      'lands-chamber': 'Lands Chamber',
      'leadership-non-legal': 'Leadership - non legal',
      'leadership': 'Leadership',
      'legal': 'Legal',
      'linked-in': 'LinkedIn',
      'lord-chancellor': 'Lord Chancellor',
      'lady-chief-justice': 'Lady Chief Justice',
      'lord-chief-justice': 'Lady Chief Justice',
      'male': 'Male',
      'multiple-choice': 'Multiple choice',
      'muslim': 'Muslim',
      'name-blind-paper-sift': 'Name blind paper sift',
      'no': 'No',
      'no-religion': 'No religion',
      'none': 'None',
      'non-legal': 'Non legal',
      'non-uk-educated': 'I did not go to school in the UK',
      'non-university-educated': 'I did not go to university',
      'northern-ireland': 'Northern Ireland',
      'online-and-judge-led': 'Yes - online resources and judge-led discussion group course',
      'online-only': 'Yes - online resources only',
      'open': 'Open',
      'other': 'Other',
      'other-asian': 'Any other Asian background',
      'other-black': 'Any other Black/African/Caribbean background',
      'other-current-legal-role': 'Other',
      'other-ethnic-group': 'Other',
      'other-fee-paid-judicial-office': 'Other fee-paid Judicial Office',
      'other-fee-paid-judicial-office-holder': 'Other fee-paid judicial office holder',
      'other-gender': 'Other',
      'other-mixed': 'Any other mixed or multiple ethnic backgrounds',
      'other-professional-background': 'Other professional background',
      'other-religion': 'Other',
      'other-salaried-judicial-office-holder': 'Other salaried Judicial Office holder',
      'other-white': 'Any other White background',
      'other-sexual-orientation': 'Other',
      'paper-sift': 'Paper sift',
      'pakistani': 'Pakistani',
      'practice-or-employment-as-lawyer': 'Practice or employment as a lawyer',
      'pre-launch': 'Pre launch',
      'prefer-not-to-say': 'Prefer not to say',
      'professional-body-website-or-email': 'Professional body website or email (eg The Law Society)',
      'professional-body-magazine': 'Professional body magazine',
      'property-chamber': 'Property Chamber',
      'ranked-choice': 'Ranked choice',
      'read': 'Read',
      'ready': 'Ready for approval',
      'republic-of-ireland': 'Republic of Ireland',
      'royal-college-of-psychiatrists': 'Royal College of Psychiatrists',
      'royal-institute-of-british-architects': 'Royal Institute of British Architects',
      'royal-institution-of-chartered-surveyors': 'Royal Institution of Chartered Surveyors',
      'salaried': 'Salaried',
      'salaried-court-judge': 'Salaried court judge',
      'salaried-tribunal-judge': 'Salaried tribunal judge',
      'scenario-test-qualifying-test': 'Scenario test qualifying test (QT)',
      'schedule-23': 'Schedule 2(3)',
      'schedule-2d': 'Schedule 2(d)',
      'scotland': 'Scotland',
      'scottish-ministers': 'Scottish ministers',
      'second-tier-immigration-and-asylum-chamber': 'Immigration and Asylum Chamber (second-tier)',
      'self-assessment-with-competencies': 'Self Assessment with competencies',
      'senior-president-of-tribunals': 'Senior President of Tribunals (SPT)',
      'senior': 'Senior',
      'sikh': 'Sikh',
      'single-choice': 'Single choice',
      'situational-judgement-qualifying-test': 'Situational judgement qualifying test (QT)',
      'social-entitlement-chamber': 'Social Entitlement Chamber',
      'solicitor': 'Solicitor',
      'statement-of-eligibility': 'Statement of eligibility',
      'statement-of-suitability-with-competencies': 'Statement of Suitability with competencies',
      'statement-of-suitability-with-skills-and-abilities-and-cv': 'Statement of Suitability with skills and abilities and CV',
      'statement-of-suitability-with-skills-and-abilities': 'Statement of Suitability with skills and abilities',
      's9-1': 's9(1)',
      's9-4': 's9(4)',
      'tax-and-chancery': 'Tax and Chancery',
      'tax-chamber': 'Tax Chamber',
      'teaching-researching-law': 'Teaching or researching law',
      'telephone-assessment': 'Telephone assessment',
      'tribunal': 'Tribunal',
      'twitter': 'Twitter',
      'uk': 'UK',
      'uk-ethnic': 'English, Welsh, Scottish, Northern Ireland, British',
      'uk-independent-fee': 'UK independent or fee-paying school',
      'uk-independent-fee-with-bursary': 'UK independent or fee-paying school with financial assistance (bursary or means-tested scholarship)',
      'uk-state-non-selective': 'UK state school - non-selective',
      'uk-state-selective': 'UK state school - selective',
      'unpaid': 'Unpaid',
      'war-pension-and-armed-forces-compensation-chamber': 'War Pension and Armed Forces Compensation Chamber',
      'welsh-administration-questions': 'Welsh administration questions',
      'welsh-government': 'Welsh Government',
      'welsh-language': 'Welsh language',
      'welsh-reading-writing': 'Read and/or write Welsh',
      'welsh-speaking': 'Speak Welsh',
      'word-of-mouth': 'Word of mouth',
      'white-asian': 'White and Asian',
      'white-black-african': 'White and Black African',
      'white-black-caribbean': 'White and Black Caribbean',
      'write': 'Write',
      'schedule-2-d': 'Schedule 2(d)',
      'schedule-2-3': 'Schedule 2(3)',
      'full-time': 'Full-time',
      'salaried-part-time': 'Salaried part-time',
      'voluntary': 'Voluntary',
      // 'xxx': 'xxx',`
    };

    lookup[QUALIFYING_TEST.STATUS.CREATED] = 'Created';
    lookup[QUALIFYING_TEST.STATUS.SUBMITTED] = 'Submitted for approval';
    lookup[QUALIFYING_TEST.STATUS.APPROVED] = 'Approved';
    lookup[QUALIFYING_TEST.STATUS.INITIALISED] = 'Initialised';
    lookup[QUALIFYING_TEST.STATUS.ACTIVATED] = 'Activated';
    lookup[QUALIFYING_TEST.STATUS.NOT_STARTED] = 'Not started';
    lookup[QUALIFYING_TEST.STATUS.STARTED] = 'Started';
    lookup[QUALIFYING_TEST.STATUS.COMPLETED] = 'Completed';
    lookup[QUALIFYING_TEST.STATUS.PAUSED] = 'Paused';

    lookup[QUALIFYING_TEST.TYPE.SCENARIO] = 'Scenario';
    lookup[QUALIFYING_TEST.TYPE.CRITICAL_ANALYSIS] = 'Critical analysis';
    lookup[QUALIFYING_TEST.TYPE.SITUATIONAL_JUDGEMENT] = 'Situational judgement';

    lookup[ASSESSOR_TYPES.PROFESSIONAL] = 'Professional assessor';
    lookup[ASSESSOR_TYPES.JUDICIAL] = 'Judicial assessor';
    lookup[ASSESSOR_TYPES.PERSONAL] = 'Personal assessor';

    lookup[NOT_COMPLETE_PUPILLAGE_REASONS.TRANSFERRED] = 'Qualified solicitor, qualified lawyer from another jurisdiction, or a legal academic transferred to the Bar';
    lookup[NOT_COMPLETE_PUPILLAGE_REASONS.CALLED_PRE_2002] = 'Called to the Bar prior to 1 January 2002';

    lookup[LANGUAGES.ENGLISH] = 'English';
    lookup[LANGUAGES.WELSH] = 'Cymraeg';

    // assessment methods
    lookup[ASSESSMENT_METHOD.SELF_ASSESSMENT_WITH_COMPETENCIES] = 'Self Assessment with competencies';
    lookup[ASSESSMENT_METHOD.COVERING_LETTER] = 'Covering letter';
    lookup[ASSESSMENT_METHOD.CV] = 'CV';
    lookup[ASSESSMENT_METHOD.STATEMENT_OF_SUITABILITY_WITH_COMPETENCIES] = 'Statement of Suitability with competencies';
    lookup[ASSESSMENT_METHOD.STATEMENT_OF_SUITABILITY_WITH_SKILLS_AND_ABILITIES] = 'Statement of Suitability with skills and abilities';
    lookup[ASSESSMENT_METHOD.STATEMENT_OF_ELIGIBILITY] = 'Statement of eligibility';
    lookup[ASSESSMENT_METHOD.INDEPENDENT_ASSESSMENTS] = 'Independent Assessments';
    lookup[ASSESSMENT_METHOD.LEADERSHIP_JUDGE_ASSESSMENT] = 'Leadership Judge Assessment';

    // task types
    lookup['preSelectionDayQuestionnaire'] = 'Pre Selection Day Questionnaire';

    // form parts
    lookup[APPLICATION_FORM_PARTS.CANDIDATE_AVAILABILITY] = 'Candidate Availability';
    lookup[APPLICATION_FORM_PARTS.PANEL_CONFLICTS] = 'Panel Conflicts';
    lookup[APPLICATION_FORM_PARTS.COMMISSIONER_CONFLICTS] = 'Commissioner Conflicts';
    lookup[APPLICATION_FORM_PARTS.CHARACTER_CHECKS] = 'Character Checks';
    lookup[APPLICATION_FORM_PARTS.REASONABLE_ADJUSTMENTS] = 'Reasonable Adjustments';
    lookup[APPLICATION_FORM_PARTS.WORKING_PREFERENCES] = 'Working Preferences';
    lookup[APPLICATION_FORM_PARTS.WELSH_POSTS] = 'Welsh Posts';

    return lookup[value] || value;
  }
  // Default for unanswered question
  if (typeof value === 'undefined' || value === null) {
    return 'Answer not supplied';
  }
  return value;
};

export {
  capitalize,
  formatDate,
  formatEstimatedDate,
  formatCurrency,
  toYesNo,
  lookup,
  showAlternative,
  showHTMLBreaks,
  hyphenize
};
