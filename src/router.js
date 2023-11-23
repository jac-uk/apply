import {
  createWebHistory,
  createRouter
} from 'vue-router';

import store from '@/store';

import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import ConfirmResetPassword from '@/views/ConfirmResetPassword.vue';

// Vacancies
// import Website from '@/Website/Home';

// Vacancies
import Vacancies from '@/views/Vacancies.vue';
import Vacancy from '@/views/Vacancy.vue';
import VacancyDetails from '@/views/Vacancy/VacancyDetails.vue';

// Profile
import ProfileView from '@/views/Profile/View.vue';
import ProfileEdit from '@/views/Profile/Edit.vue';
import ProfilePasswordEdit from '@/views/Profile/PasswordEdit.vue';

//Eligibility
import Eligibility from '@/views/Eligibility/Eligibility.vue';
import EligibilityCheck from '@/views/Eligibility/EligibilityCheck.vue';
import EligibilityPass from '@/views/Eligibility/EligibilityPass.vue';
import EligibilityFail from '@/views/Eligibility/EligibilityFail.vue';

//GDPR
import GDPR from '@/views/GDPR/GDPR.vue';
import GDPRCheck from '@/views/GDPR/GDPRCheck.vue';

// Applications
import Applications from '@/views/Applications';

// Apply
import Apply from '@/views/Apply/Apply.vue';
import TaskList from '@/views/Apply/TaskList.vue';
import ApplyCharacterInformation from '@/views/Apply/AccountProfile/CharacterInformation.vue';
import MainCharacterInformation from '@/views/Apply/CharacterInformation/MainCharacterInformation.vue';
import Declaration from '@/views/Apply/CharacterInformation/Declaration.vue';
import CriminalOffences from '@/views/Apply/CharacterInformation/CriminalOffences.vue';
import FixedPenaltyNotices from '@/views/Apply/CharacterInformation/FixedPenaltyNotices.vue';
import MotoringOffences from '@/views/Apply/CharacterInformation/MotoringOffences.vue';
import FinancialMatters from '@/views/Apply/CharacterInformation/FinancialMatters.vue';
import ProfessionalConduct from '@/views/Apply/CharacterInformation/ProfessionalConduct.vue';
import FurtherInformation from '@/views/Apply/CharacterInformation/FurtherInformation.vue';
import InformationReview from '@/views/Apply/CharacterInformation/InformationReview.vue';
import EqualityAndDiversitySurvey from '@/views/Apply/AccountProfile/EqualityAndDiversitySurvey.vue';
import PAJE from '@/views/Apply/AccountProfile/PAJE.vue';
import ApplyPersonalDetails from '@/views/Apply/AccountProfile/PersonalDetails.vue';
import AssessorsDetails from '@/views/Apply/Assessments/AssessorsDetails.vue';
import LeadershipJudgeDetails from '@/views/Apply/Assessments/LeadershipJudgeDetails.vue';
import SelfAssessmentCompetencies from '@/views/Apply/Assessments/SelfAssessmentCompetencies.vue';
import JudicialExperience from '@/views/Apply/QualificationsAndExperience/JudicialExperience.vue';
import PostQualificationWorkExperience from '@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience.vue';
import RelevantQualifications from '@/views/Apply/QualificationsAndExperience/RelevantQualifications.vue';
import RelevantMemberships from '@/views/Apply/QualificationsAndExperience/RelevantMemberships.vue';
import RelevantExperience from '@/views/Apply/QualificationsAndExperience/RelevantExperience.vue';
import EmploymentGaps from '@/views/Apply/QualificationsAndExperience/EmploymentGaps.vue';
import ReasonableLengthOfService from '@/views/Apply/QualificationsAndExperience/ReasonableLengthOfService.vue';
import PartTimeWorkingPreferences from '@/views/Apply/WorkingPreferences/PartTimeWorkingPreferences.vue';
import LocationPreferences from '@/views/Apply/WorkingPreferences/LocationPreferences.vue';
import JurisdictionPreferences from '@/views/Apply/WorkingPreferences/JurisdictionPreferences.vue';
import AdditionalWorkingPreferences from '@/views/Apply/WorkingPreferences/AdditionalWorkingPreferences.vue';
import WelshPosts from '@/views/Apply/WorkingPreferences/WelshPosts.vue';
import LeadershipSuitability from '@/views/Apply/Assessments/LeadershipSuitability.vue';
import StatementOfSuitability from '@/views/Apply/Assessments/StatementOfSuitability.vue';
import StatementOfEligibility from '@/views/Apply/Assessments/StatementOfEligibility.vue';
import CV from '@/views/Apply/Assessments/CV.vue';
import CoveringLetter from '@/views/Apply/Assessments/CoveringLetter.vue';
import Review from '@/views/Apply/FinalCheck/Review.vue';
import Confirmation from '@/views/Apply/FinalCheck/Confirmation.vue';
import AdditionalInformation from '@/views/Apply/AdditionalInformation.vue';

// Character Checks
import CharacterChecks from '@/views/Apply/CharacterChecks/CharacterChecks.vue';
import CharacterChecksIntro from '@/views/Apply/CharacterChecks/Intro.vue';
import CharacterChecksPersonalInformation from '@/views/Apply/CharacterChecks/PersonalInformation.vue';
import CharacterChecksProfessionalDetails from '@/views/Apply/CharacterChecks/ProfessionalDetails.vue';
import CharacterChecksProfessionalDetailsMagistrate from '@/views/Apply/CharacterChecks/ProfessionalDetailsMagistrate.vue';
import CharacterChecksHMRC from '@/views/Apply/CharacterChecks/Hmrc.vue';
import CharacterChecksOtherProfessionalBodies from '@/views/Apply/CharacterChecks/OtherProfessionalBodies.vue';
import CharacterChecksReview from '@/views/Apply/CharacterChecks/Review.vue';
import CharacterChecksConsent from '@/views/Apply/CharacterChecks/Consent.vue';
import CharacterChecksFormSubmitted from '@/views/Apply/CharacterChecks/FormSubmitted.vue';

// Candidate Forms
import CandidateFormIndex from '@/views/Apply/Forms/Index.vue';
import CandidateFormTaskList from '@/views/Apply/Forms/TaskList.vue';
import CandidateFormReview from '@/views/Apply/Forms/Review.vue';
import CandidateFormConfirmation from '@/views/Apply/Forms/Confirmation.vue';
import CandidateFormCandidateAvailability from '@/views/Apply/Forms/Parts/CandidateAvailability.vue';
import CandidateFormPanelConflicts from '@/views/Apply/Forms/Parts/PanelConflicts.vue';
import CandidateFormCommissionerConflicts from '@/views/Apply/Forms/Parts/CommissionerConflicts.vue';
import CandidateFormCharacterChecks from '@/views/Apply/Forms/Parts/CharacterChecks.vue';
import CandidateFormReasonableAdjustments from '@/views/Apply/Forms/Parts/ReasonableAdjustments.vue';
import CandidateFormWorkingPreferences from '@/views/Apply/Forms/Parts/WorkingPreferences.vue';
import CandidateFormWelshPosts from '@/views/Apply/Forms/Parts/WelshPosts.vue';

// Error pages
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    redirect: { name: 'vacancies' },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    name: 'not-found',
    meta: {
      title: 'Error',
    },
  },
  {
    path: '/vacancies',
    name: 'vacancies',
    component: Vacancies,
    meta: {
      title: 'Vacancies',
    },
  },
  {
    path: '/vacancy/:id/',
    component: Vacancy,
    children: [
      {
        path: '',
        component: VacancyDetails,
        name: 'vacancy-details',
        meta: {
          title: 'Vacancy details',
          isMultilanguage: true,
        },
      },
      {
        path: 'eligibility/',
        component: Eligibility,
        meta: {
          title: 'Eligibility Checker',
        },
        children: [
          {
            path: '',
            component: EligibilityCheck,
            name: 'eligibility',
            meta: {
              title: 'Eligibility Check',
              isMultilanguage: true,
            },
          },
          {
            path: 'pass',
            component: EligibilityPass,
            name: 'eligibility-pass',
            meta: {
              title: 'Eligibility Pass',
              isMultilanguage: true,
            },
          },
          {
            path: 'fail',
            component: EligibilityFail,
            name: 'eligibility-fail',
            meta: {
              title: 'Eligibility Fail',
              isMultilanguage: true,
            },
          },
        ],
      },
      {
        path: 'GDPR/',
        component: GDPR,
        children: [
          {
            path: '',
            component: GDPRCheck,
            name: 'GDPR',
            meta: {
              title: 'GDPR Check',
              isMultilanguage: true,
            },
          },
        ],
        meta: {
          title: 'GDPR',
        },
      },
    ],
    meta: {
      title: 'Vacancy',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
      title: 'Your Profile',
    },
  },
  {
    path: '/profile-edit',
    name: 'profile-edit',
    component: ProfileEdit,
    meta: {
      requiresAuth: true,
      title: 'Your Profile',
    },
  },
  {
    path: '/profile-password-edit',
    name: 'profile-password-edit',
    component: ProfilePasswordEdit,
    meta: {
      requiresAuth: true,
      title: 'Your Profile',
    },
  },
  {
    path: '/applications',
    name: 'applications',
    component: Applications,
    meta: {
      requiresAuth: true,
      title: 'Applications',
    },
  },
  // Apply for a role
  {
    path: '/apply/:id/',
    component: Apply,
    children: [
      {
        path: '',
        component: TaskList,
        name: 'task-list',
        meta: {
          requiresAuth: true,
          title: 'Apply for a role task list',
          isMultilanguage: true,
        },
      },
      {
        path: 'character-information/',
        name: 'apply-character-information',
        meta: {
          requiresAuth: true,
          title: 'Character information',
          breadcrumbRoute: 'character-information-review',
          isMultilanguage: true,
        },
        component: MainCharacterInformation,
        children: [
          {
            path: 'form-v1',
            component: ApplyCharacterInformation,
            name: 'character-information-form-v1',
            meta: {
              requiresAuth: true,
              title: 'Character information',
              isMultilanguage: true,
            },
          },
          {
            path: 'declaration',
            component: Declaration,
            name: 'character-information-declaration',
            meta: {
              requiresAuth: true,
              title: 'Character information | Declaration',
              isMultilanguage: true,
            },
          },
          {
            path: 'criminal-offences',
            component: CriminalOffences,
            name: 'character-information-criminal-offences',
            meta: {
              requiresAuth: true,
              title: 'Character information | Criminal offences',
              isMultilanguage: true,
            },
          },
          {
            path: 'fixed-penalty-notices',
            component: FixedPenaltyNotices,
            name: 'character-information-fixed-penalty-notices',
            meta: {
              requiresAuth: true,
              title: 'Character information | Fixed penalty notices',
              isMultilanguage: true,
            },
          },
          {
            path: 'motoring-offences',
            component: MotoringOffences,
            name: 'character-information-motoring-offences',
            meta: {
              requiresAuth: true,
              title: 'Character information | Motoring offences',
              isMultilanguage: true,
            },
          },
          {
            path: 'financial-matters',
            component: FinancialMatters,
            name: 'character-information-financial-matters',
            meta: {
              requiresAuth: true,
              title: 'Character information | Financial matters',
              isMultilanguage: true,
            },
          },
          {
            path: 'professional-conduct',
            component: ProfessionalConduct,
            name: 'character-information-professional-conduct',
            meta: {
              requiresAuth: true,
              title: 'Character information | Professional conduct',
              isMultilanguage: true,
            },
          },
          {
            path: 'further-information',
            component: FurtherInformation,
            name: 'character-information-further-information',
            meta: {
              requiresAuth: true,
              title: 'Character information | Further information',
              isMultilanguage: true,
            },
          },
          {
            path: 'information-review',
            component: InformationReview,
            name: 'character-information-review',
            meta: {
              requiresAuth: true,
              title: 'Character information | Review',
              isMultilanguage: true,
            },
          },
        ],
      },
      {
        path: 'equality-and-diversity-survey',
        component: EqualityAndDiversitySurvey,
        name: 'equality-and-diversity-survey',
        meta: {
          requiresAuth: true,
          title: 'Take the equality and diversity survey',
          isMultilanguage: true,
        },
      },
      {
        path: 'pre-application-judicial-education',
        component: PAJE,
        name: 'pre-application-judicial-education',
        meta: {
          requiresAuth: true,
          title: 'Pre-application judicial education',
          isMultilanguage: true,
        },
      },
      {
        path: 'personal-details',
        component: ApplyPersonalDetails,
        name: 'apply-personal-details',
        meta: {
          requiresAuth: true,
          title: 'Personal details',
          isMultilanguage: true,
        },
      },
      {
        path: 'assessors-details',
        component: AssessorsDetails,
        name: 'assessors-details',
        meta: {
          requiresAuth: true,
          title: 'Give independent assessors details',
          isMultilanguage: true,
        },
      },
      {
        path: 'leadership-judge-details',
        component: LeadershipJudgeDetails,
        name: 'leadership-judge-details',
        meta: {
          requiresAuth: true,
          title: 'Give Leadership Judge details',
          isMultilanguage: true,
        },
      },
      {
        path: 'additional-information',
        component: AdditionalInformation,
        name: 'additional-information',
        meta: {
          requiresAuth: true,
          title: 'Additional information',
          isMultilanguage: true,
        },
      },
      {
        path: 'self-assessment-competencies',
        component: SelfAssessmentCompetencies,
        name: 'self-assessment-competencies',
        meta: {
          requiresAuth: true,
          title: 'Self-assessment competencies',
          isMultilanguage: true,
        },
      },
      {
        path: 'review',
        component: Review,
        name: 'review',
        meta: {
          requiresAuth: true,
          title: 'Review application',
          isMultilanguage: true,
        },
      },
      {
        path: 'judicial-experience',
        component: JudicialExperience,
        name: 'judicial-experience',
        meta: {
          requiresAuth: true,
          title: 'Judicial experience',
          isMultilanguage: true,
        },
      },
      {
        path: 'post-qualification-work-experience',
        component: PostQualificationWorkExperience,
        name: 'post-qualification-work-experience',
        meta: {
          requiresAuth: true,
          title: 'Post-qualification work experience',
          isMultilanguage: true,
        },
      },
      {
        path: 'relevant-qualifications',
        component: RelevantQualifications,
        name: 'relevant-qualifications',
        meta: {
          requiresAuth: true,
          title: 'Relevant qualifications',
          isMultilanguage: true,
        },
      },
      {
        path: 'relevant-memberships',
        component: RelevantMemberships,
        name: 'relevant-memberships',
        meta: {
          requiresAuth: true,
          title: 'Relevant memberships',
          isMultilanguage: true,
        },
      },
      {
        path: 'relevant-experience',
        component: RelevantExperience,
        name: 'relevant-experience',
        meta: {
          requiresAuth: true,
          title: 'Relevant experience',
          isMultilanguage: true,
        },
      },
      {
        path: 'employment-gaps',
        component: EmploymentGaps,
        name: 'employment-gaps',
        meta: {
          requiresAuth: true,
          title: 'Employment gaps',
          isMultilanguage: true,
        },
      },
      {
        path: 'reasonable-length-of-service',
        component: ReasonableLengthOfService,
        name: 'reasonable-length-of-service',
        meta: {
          requiresAuth: true,
          title: 'Reasonable length of service',
          isMultilanguage: true,
        },
      },
      {
        path: 'part-time-working-preferences',
        component: PartTimeWorkingPreferences,
        name: 'part-time-working-preferences',
        meta: {
          requiresAuth: true,
          title: 'Part-time working preferences',
          isMultilanguage: true,
        },
      },
      {
        path: 'location-preferences',
        component: LocationPreferences,
        name: 'location-preferences',
        meta: {
          requiresAuth: true,
          title: 'Location preferences',
          isMultilanguage: true,
        },
      },
      {
        path: 'jurisdiction-preferences',
        component: JurisdictionPreferences,
        name: 'jurisdiction-preferences',
        meta: {
          requiresAuth: true,
          title: 'Jurisdiction preferences',
          isMultilanguage: true,
        },
      },
      {
        path: 'additional-working-preferences',
        component: AdditionalWorkingPreferences,
        name: 'additional-working-preferences',
        meta: {
          requiresAuth: true,
          title: 'Additional working preferences',
          isMultilanguage: true,
        },
      },
      {
        path: 'welsh-posts',
        component: WelshPosts,
        name: 'welsh-posts',
        meta: {
          requiresAuth: true,
          title: 'Welsh posts',
          isMultilanguage: true,
        },
      },
      {
        path: 'leadership-statement-of-suitability',
        component: LeadershipSuitability,
        name: 'leadership-statement-of-suitability',
        meta: {
          requiresAuth: true,
          title: 'Statement of suitability',
          isMultilanguage: true,
        },
      },
      {
        path: 'statement-of-suitability',
        component: StatementOfSuitability,
        name: 'statement-of-suitability',
        meta: {
          requiresAuth: true,
          title: 'Statement of suitability',
          isMultilanguage: true,
        },
      },
      {
        path: 'statement-of-eligibility',
        component: StatementOfEligibility,
        name: 'statement-of-eligibility',
        meta: {
          requiresAuth: true,
          title: 'Statement of eligibility',
          isMultilanguage: true,
        },
      },
      {
        path: 'cv',
        component: CV,
        name: 'cv',
        meta: {
          requiresAuth: true,
          title: 'Curriculum vitae (CV)',
          isMultilanguage: true,
        },
      },
      {
        path: 'covering-letter',
        component: CoveringLetter,
        name: 'covering-letter',
        meta: {
          requiresAuth: true,
          title: 'Covering Letter',
          isMultilanguage: true,
        },
      },
      {
        path: 'confirmation',
        component: Confirmation,
        name: 'confirmation',
        meta: {
          requiresAuth: true,
          title: 'Confirmation',
          isMultilanguage: true,
        },
      },
      {
        path: 'character-checks/',
        component: CharacterChecks,
        children: [
          {
            path: '',
            component: CharacterChecksIntro,
            name: 'character-checks-intro',
            meta: {
              requiresAuth: true,
              title: 'Consent to character checks',
            },
          },
          {
            path: 'personal-information',
            component: CharacterChecksPersonalInformation,
            name: 'character-checks-personal-information',
            meta: {
              requiresAuth: true,
              title: 'Consent to character checks | Personal information',
            },
          },
          {
            path: 'professional-details',
            component: CharacterChecksProfessionalDetails,
            name: 'character-checks-professional-details',
            meta: {
              requiresAuth: true,
              title: 'Consent to character checks | Professional details',
            },
          },
          {
            path: 'professional-details-magistrate',
            component: CharacterChecksProfessionalDetailsMagistrate,
            name: 'character-checks-professional-details-magistrate',
            meta: {
              requiresAuth: true,
              title: 'Consent to character checks | Professional details',
            },
          },
          {
            path: 'HMRC',
            component: CharacterChecksHMRC,
            name: 'character-checks-HMRC',
            meta: {
              requiresAuth: true,
              title: 'Consent to character checks | HMRC',
            },
          },
          {
            path: 'other-professional-bodies',
            component: CharacterChecksOtherProfessionalBodies,
            name: 'character-checks-other-professional-bodies',
            meta: {
              requiresAuth: true,
              title: 'Consent to character checks | Other professional bodies',
            },
          },
          {
            path: 'review',
            component: CharacterChecksReview,
            name: 'character-checks-review',
            meta: {
              requiresAuth: true,
              title: 'Consent to character checks | Review',
            },
          },
          {
            path: 'consent',
            component: CharacterChecksConsent,
            name: 'character-checks-consent',
            meta: {
              requiresAuth: true,
              title: 'Consent to character checks | Consent',
            },
          },
          {
            path: 'form-submitted',
            component: CharacterChecksFormSubmitted,
            name: 'character-checks-form-submitted',
            meta: {
              requiresAuth: true,
              title: 'Consent to character checks | Form Submitted',
            },
          },
        ],
        meta: {
          title: 'Consent to character checks',
        },
      },
    ],
    meta: {
      title: 'Apply',
    },
  },
  {
    path: '/forms/:formId/',
    component: CandidateFormIndex,
    children: [
      {
        path: '',
        component: CandidateFormTaskList,
        name: 'candidate-form-task-list',
        meta: {
          requiresAuth: true,
          title: 'Pre Selection Day Questionnaire',
          isMultilanguage: true,
        },
      },
      {
        path: 'review',
        component: CandidateFormReview,
        name: 'candidate-form-review',
        meta: {
          requiresAuth: true,
          title: 'Review',
          isMultilanguage: true,
        },
      },
      {
        path: 'confirmation',
        component: CandidateFormConfirmation,
        name: 'candidate-form-confirmation',
        meta: {
          requiresAuth: true,
          title: 'Confirmation',
          isMultilanguage: true,
        },
      },
      // Parts
      {
        path: 'candidate-availability',
        component: CandidateFormCandidateAvailability,
        name: 'candidate-form-tasks-candidateAvailability',
        meta: {
          requiresAuth: true,
          title: 'Candidate availability',
        },
      },
      {
        path: 'panellist-conflicts',
        component: CandidateFormPanelConflicts,
        name: 'candidate-form-tasks-panelConflicts',
        meta: {
          requiresAuth: true,
          title: 'Panellist conflicts',
        },
      },
      {
        path: 'commissioner-conflicts',
        component: CandidateFormCommissionerConflicts,
        name: 'candidate-form-tasks-commissionerConflicts',
        meta: {
          requiresAuth: true,
          title: 'Commissioner conflicts',
        },
      },
      {
        path: 'character-checks',
        component: CandidateFormCharacterChecks,
        name: 'candidate-form-tasks-characterChecks',
        meta: {
          requiresAuth: true,
          title: 'Character checks',
        },
      },
      {
        path: 'reasonable-adjustments',
        component: CandidateFormReasonableAdjustments,
        name: 'candidate-form-tasks-reasonableAdjustments',
        meta: {
          requiresAuth: true,
          title: 'Reasonsable adjustments',
        },
      },
      {
        path: 'jurisdiction',
        component: CandidateFormWorkingPreferences,
        name: 'candidate-form-tasks-workingPreferences',
        meta: {
          requiresAuth: true,
          title: 'Jurisdiction',
        },
      },
      {
        path: 'welsh-posts',
        component: CandidateFormWelshPosts,
        name: 'candidate-form-tasks-welshPosts',
        meta: {
          requiresAuth: true,
          title: 'Welsh posts',
        },
      },
    ],
    meta: {
      title: 'Questionnaire',
    },
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
    meta: {
      title: 'Sign In',
    },
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    meta: {
      title: 'Create an account',
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    meta: {
      title: 'Reset your password',
    },
  },
  {
    path: '/confirm-reset-password',
    name: 'confirm-reset-password',
    component: ConfirmResetPassword,
    meta: {
      title: 'Confirm your password reset',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Global before guard to verify if a user can have access to other than sign-in pages.
// It redirects unauthorized users to a sign-in page.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const isSignedIn = store.getters['auth/isSignedIn'];
  if (requiresAuth && !isSignedIn) {
    next({ name: 'sign-in', query: { nextPage: to.path } });
  } else {
    next();
  }
});

// Global after hook to set an appropriate title for the page
router.afterEach((to) => {
  document.title = `${to.meta.title} | Judicial Appointments Commission`;
});

export default router;
