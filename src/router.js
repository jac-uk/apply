import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import SignIn from '@/views/SignIn';
import SignUp from '@/views/SignUp';
import ResetPassword from '@/views/ResetPassword';

// Vacancies
// import Website from '@/Website/Home';

// Vacancies
import Vacancies from '@/views/Vacancies';
import Vacancy from '@/views/Vacancy';
import VacancyDetails from '@/views/Vacancy/VacancyDetails';

//Eligibility
import Eligibility from '@/views/Eligibility/Eligibility';
import EligibilityCheck from '@/views/Eligibility/EligibilityCheck';
import EligibilityPass from '@/views/Eligibility/EligibilityPass';
import EligibilityFail from '@/views/Eligibility/EligibilityFail';

// Applications
import Applications from '@/views/Applications';
import PersonalDetails from '@/views/PersonalDetails';
import CharacterInformation from '@/views/CharacterInformation';
import DiversityInformation from '@/views/DiversityInformation';

// Apply
import Apply from '@/views/Apply/Apply';
import TaskList from '@/views/Apply/TaskList';
import ApplyCharacterInformation from '@/views/Apply/AccountProfile/CharacterInformation';
import MainCharacterInformation from '@/views/Apply/CharacterInformation/MainCharacterInformation';
import Declaration from '@/views/Apply/CharacterInformation/Declaration';
import CriminalOffences from '@/views/Apply/CharacterInformation/CriminalOffences';
import FixedPenaltyNotices from '@/views/Apply/CharacterInformation/FixedPenaltyNotices';
import MotoringOffences from '@/views/Apply/CharacterInformation/MotoringOffences';
import FinancialMatters from '@/views/Apply/CharacterInformation/FinancialMatters';
import ProfessionalConduct from '@/views/Apply/CharacterInformation/ProfessionalConduct';
import FurtherInformation from '@/views/Apply/CharacterInformation/FurtherInformation';
import InformationReview from '@/views/Apply/CharacterInformation/InformationReview';
import EqualityAndDiversitySurvey from '@/views/Apply/AccountProfile/EqualityAndDiversitySurvey';
import PAJE from '@/views/Apply/AccountProfile/PAJE';
import ApplyPersonalDetails from '@/views/Apply/AccountProfile/PersonalDetails';
import AssessorsDetails from '@/views/Apply/Assessments/AssessorsDetails';
import LeadershipJudgeDetails from '@/views/Apply/Assessments/LeadershipJudgeDetails';
import SelfAssessmentCompetencies from '@/views/Apply/Assessments/SelfAssessmentCompetencies';
import JudicialExperience from '@/views/Apply/QualificationsAndExperience/JudicialExperience';
import PostQualificationWorkExperience from '@/views/Apply/QualificationsAndExperience/PostQualificationWorkExperience';
import RelevantQualifications from '@/views/Apply/QualificationsAndExperience/RelevantQualifications';
import RelevantMemberships from '@/views/Apply/QualificationsAndExperience/RelevantMemberships';
import RelevantExperience from '@/views/Apply/QualificationsAndExperience/RelevantExperience';
import EmploymentGaps from '@/views/Apply/QualificationsAndExperience/EmploymentGaps';
import ReasonableLengthOfService from '@/views/Apply/QualificationsAndExperience/ReasonableLengthOfService';
import PartTimeWorkingPreferences from '@/views/Apply/WorkingPreferences/PartTimeWorkingPreferences';
import LocationPreferences from '@/views/Apply/WorkingPreferences/LocationPreferences';
import JurisdictionPreferences from '@/views/Apply/WorkingPreferences/JurisdictionPreferences';
import AdditionalWorkingPreferences from '@/views/Apply/WorkingPreferences/AdditionalWorkingPreferences';
import WelshPosts from '@/views/Apply/WorkingPreferences/WelshPosts';
import LeadershipSuitability from '@/views/Apply/Assessments/LeadershipSuitability';
import StatementOfSuitability from '@/views/Apply/Assessments/StatementOfSuitability';
import StatementOfEligibility from '@/views/Apply/Assessments/StatementOfEligibility';
import CV from '@/views/Apply/Assessments/CV';
import CoveringLetter from '@/views/Apply/Assessments/CoveringLetter';
import Review from '@/views/Apply/FinalCheck/Review';
import Confirmation from '@/views/Apply/FinalCheck/Confirmation';
import AdditionalInformation from '@/views/Apply/AdditionalInformation';

// Character Checks
import CharacterChecks from '@/views/Apply/CharacterChecks/CharacterChecks';
import CharacterChecksIntro from '@/views/Apply/CharacterChecks/Intro';
import CharacterChecksPersonalInformation from '@/views/Apply/CharacterChecks/PersonalInformation';
import CharacterChecksProfessionalBodies from '@/views/Apply/CharacterChecks/ProfessionalBodies';
import CharacterChecksHMRC from '@/views/Apply/CharacterChecks/Hmrc';
import CharacterChecksMoreDetails from '@/views/Apply/CharacterChecks/MoreDetails';
import CharacterChecksReview from '@/views/Apply/CharacterChecks/Review';
import CharacterChecksDeclaration from '@/views/Apply/CharacterChecks/Declaration';
import CharacterChecksFormSubmitted from '@/views/Apply/CharacterChecks/FormSubmitted';

// Online Tests
import QualifyingTests from '@/views/QualifyingTests/QualifyingTests';
import QualifyingTest from '@/views/QualifyingTests/QualifyingTest';
import QualifyingTestInformation from '@/views/QualifyingTests/QualifyingTest/Information';
import QualifyingTestQuestion from '@/views/QualifyingTests/QualifyingTest/Question';
import QualifyingTestScenario from '@/views/QualifyingTests/QualifyingTest/Scenario';
import QualifyingTestReview from '@/views/QualifyingTests/QualifyingTest/Review';
import QualifyingTestSubmitted from '@/views/QualifyingTests/QualifyingTest/Submitted';

// Error pages
import NotFound from '@/views/NotFound.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/vacancies',
    },
    {
      path: '*',
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
      path: '/personal-details',
      name: 'personal-details',
      component: PersonalDetails,
      meta: {
        title: 'Personal details',
      },
    },
    {
      path: '/character-information',
      name: 'character-information',
      component: CharacterInformation,
      meta: {
        title: 'Character information',
      },
    },
    {
      path: '/diversity-information',
      name: 'diversity-information',
      component: DiversityInformation,
      meta: {
        title: 'Diversity information',
      },
    },
    {
      path: '/vacancy/:id',
      component: Vacancy,
      children: [
        {
          path: '',
          component: VacancyDetails,
          name: 'vacancy-details',
          meta: {
            title: 'Vacancy details',
          },
        },
        {
          path: 'eligibility',
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
              },
            },
            {
              path: 'pass',
              component: EligibilityPass,
              name: 'eligibility-pass',
              meta: {
                title: 'Eligibility Pass',
              },
            },
            {
              path: 'fail',
              component: EligibilityFail,
              name: 'eligibility-fail',
              meta: {
                title: 'Eligibility Fail',
              },
            },
          ],
        },
      ],
    },
    {
      path: '/applications',
      name: 'applications',
      component: Applications,
      meta: {
        title: 'Applications',
      },
    },
    {
      path: '/qualifying-tests',
      component: QualifyingTests,
      name: 'qualifying-tests',
      meta: {
        requiresAuth: true,
        title: 'Online Tests | List',
      },
    },
    {
      path: '/qualifying-tests/:qualifyingTestId',
      component: QualifyingTest,
      children: [
        {
          path: 'information',
          component: QualifyingTestInformation,
          name: 'qualifying-test-information',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Information',
          },
        },
        {
          path: 'question/:questionNumber',
          component: QualifyingTestQuestion,
          name: 'qualifying-test-question',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Question',
            fullPageMode: true,
          },
        },
        {
          path: 'scenario/:scenarioNumber/:questionNumber',
          component: QualifyingTestScenario,
          name: 'qualifying-test-scenario',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Scenario',
            fullPageMode: true,
          },
        },
        {
          path: 'review',
          component: QualifyingTestReview,
          name: 'qualifying-test-review',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Review',
            fullPageMode: true,
          },
        },
        {
          path: 'submitted',
          component: QualifyingTestSubmitted,
          name: 'qualifying-test-submitted',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Submitted',
          },
        },
      ],
    },
    // Apply for a role
    {
      path: '/apply/:id',
      component: Apply,
      children: [
        {
          path: '',
          component: TaskList,
          name: 'task-list',
          meta: {
            requiresAuth: true,
            title: 'Apply for a role task list',
          },
        },
        {
          path: 'character-information',
          name: 'apply-character-information',
          meta: {
            requiresAuth: true,
            title: 'Character information',
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
              },
            },
            {
              path: 'declaration',
              component: Declaration,
              name: 'character-information-declaration',
              meta: {
                requiresAuth: true,
                title: 'Character information | Declaration',
              },
            },
            {
              path: 'criminal-offences',
              component: CriminalOffences,
              name: 'character-information-criminal-offences',
              meta: {
                requiresAuth: true,
                title: 'Character information | Criminal offences',
              },
            },
            {
              path: 'fixed-penalty-notices',
              component: FixedPenaltyNotices,
              name: 'character-information-fixed-penalty-notices',
              meta: {
                requiresAuth: true,
                title: 'Character information | Fixed penalty notices',
              },
            },
            {
              path: 'motoring-offences',
              component: MotoringOffences,
              name: 'character-information-motoring-offences',
              meta: {
                requiresAuth: true,
                title: 'Character information | Motoring offences',
              },
            },
            {
              path: 'financial-matters',
              component: FinancialMatters,
              name: 'character-information-financial-matters',
              meta: {
                requiresAuth: true,
                title: 'Character information | Financial matters',
              },
            },
            {
              path: 'professional-conduct',
              component: ProfessionalConduct,
              name: 'character-information-professional-conduct',
              meta: {
                requiresAuth: true,
                title: 'Character information | Professional conduct',
              },
            },
            {
              path: 'further-information',
              component: FurtherInformation,
              name: 'character-information-further-information',
              meta: {
                requiresAuth: true,
                title: 'Character information | Further information',
              },
            },
            {
              path: 'information-review',
              component: InformationReview,
              name: 'character-information-review',
              meta: {
                requiresAuth: true,
                title: 'Character information | Review',
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
          },
        },
        {
          path: 'pre-application-judicial-education',
          component: PAJE,
          name: 'pre-application-judicial-education',
          meta: {
            requiresAuth: true,
            title: 'Pre-application judicial education',
          },
        },
        {
          path: 'personal-details',
          component: ApplyPersonalDetails,
          name: 'apply-personal-details',
          meta: {
            requiresAuth: true,
            title: 'Personal details',
          },
        },
        {
          path: 'assessors-details',
          component: AssessorsDetails,
          name: 'assessors-details',
          meta: {
            requiresAuth: true,
            title: 'Give independent assessors details',
          },
        },
        {
          path: 'leadership-judge-details',
          component: LeadershipJudgeDetails,
          name: 'leadership-judge-details',
          meta: {
            requiresAuth: true,
            title: 'Give Leadership Judge details',
          },
        },
        {
          path: 'additional-information',
          component: AdditionalInformation,
          name: 'additional-information',
          meta: {
            requiresAuth: true,
            title: 'Additional information',
          },
        },
        {
          path: 'self-assessment-competencies',
          component: SelfAssessmentCompetencies,
          name: 'self-assessment-competencies',
          meta: {
            requiresAuth: true,
            title: 'Self-assessment competencies',
          },
        },
        {
          path: 'review',
          component: Review,
          name: 'review',
          meta: {
            requiresAuth: true,
            title: 'Review application',
          },
        },
        {
          path: 'judicial-experience',
          component: JudicialExperience,
          name: 'judicial-experience',
          meta: {
            requiresAuth: true,
            title: 'Judicial experience',
          },
        },
        {
          path: 'post-qualification-work-experience',
          component: PostQualificationWorkExperience,
          name: 'post-qualification-work-experience',
          meta: {
            requiresAuth: true,
            title: 'Post-qualification work experience',
          },
        },
        {
          path: 'relevant-qualifications',
          component: RelevantQualifications,
          name: 'relevant-qualifications',
          meta: {
            requiresAuth: true,
            title: 'Relevant qualifications',
          },
        },
        {
          path: 'relevant-memberships',
          component: RelevantMemberships,
          name: 'relevant-memberships',
          meta: {
            requiresAuth: true,
            title: 'Relevant memberships',
          },
        },
        {
          path: 'relevant-experience',
          component: RelevantExperience,
          name: 'relevant-experience',
          meta: {
            requiresAuth: true,
            title: 'Relevant experience',
          },
        },
        {
          path: 'employment-gaps',
          component: EmploymentGaps,
          name: 'employment-gaps',
          meta: {
            requiresAuth: true,
            title: 'Employment gaps',
          },
        },
        {
          path: 'reasonable-length-of-service',
          component: ReasonableLengthOfService,
          name: 'reasonable-length-of-service',
          meta: {
            requiresAuth: true,
            title: 'Reasonable length of service',
          },
        },
        {
          path: 'part-time-working-preferences',
          component: PartTimeWorkingPreferences,
          name: 'part-time-working-preferences',
          meta: {
            requiresAuth: true,
            title: 'Part-time working preferences',
          },
        },
        {
          path: 'location-preferences',
          component: LocationPreferences,
          name: 'location-preferences',
          meta: {
            requiresAuth: true,
            title: 'Location preferences',
          },
        },
        {
          path: 'jurisdiction-preferences',
          component: JurisdictionPreferences,
          name: 'jurisdiction-preferences',
          meta: {
            requiresAuth: true,
            title: 'Jurisdiction preferences',
          },
        },
        {
          path: 'additional-working-preferences',
          component: AdditionalWorkingPreferences,
          name: 'additional-working-preferences',
          meta: {
            requiresAuth: true,
            title: 'Additional working preferences',
          },
        },
        {
          path: 'welsh-posts',
          component: WelshPosts,
          name: 'welsh-posts',
          meta: {
            requiresAuth: true,
            title: 'Welsh posts',
          },
        },
        {
          path: 'leadership-statement-of-suitability',
          component: LeadershipSuitability,
          name: 'leadership-statement-of-suitability',
          meta: {
            requiresAuth: true,
            title: 'Statement of suitability',
          },
        },
        {
          path: 'statement-of-suitability',
          component: StatementOfSuitability,
          name: 'statement-of-suitability',
          meta: {
            requiresAuth: true,
            title: 'Statement of suitability',
          },
        },
        {
          path: 'statement-of-eligibility',
          component: StatementOfEligibility,
          name: 'statement-of-eligibility',
          meta: {
            requiresAuth: true,
            title: 'Statement of eligibility',
          },
        },
        {
          path: 'cv',
          component: CV,
          name: 'cv',
          meta: {
            requiresAuth: true,
            title: 'Curriculum vitae (CV)',
          },
        },
        {
          path: 'covering-letter',
          component: CoveringLetter,
          name: 'covering-letter',
          meta: {
            requiresAuth: true,
            title: 'Covering Letter',
          },
        },
        {
          path: 'confirmation',
          component: Confirmation,
          name: 'confirmation',
          meta: {
            requiresAuth: true,
            title: 'Confirmation',
          },
        },
        {
          path: 'character-checks',
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
              path: 'professional-bodies',
              component: CharacterChecksProfessionalBodies,
              name: 'character-checks-professional-bodies',
              meta: {
                requiresAuth: true,
                title: 'Consent to character checks | Professional bodies',
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
              path: 'more-details',
              component: CharacterChecksMoreDetails,
              name: 'character-checks-more-details',
              meta: {
                requiresAuth: true,
                title: 'Consent to character checks | More details',
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
              path: 'declaration',
              component: CharacterChecksDeclaration,
              name: 'character-checks-declaration',
              meta: {
                requiresAuth: true,
                title: 'Consent to character checks | Declaration',
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
        },
      ],
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
  ],
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
    // @todo Save destination so we can navigate there after sign-in
    return next({ name: 'sign-in' });
  } else {
    return next();
  }
});

// Global after hook to set an appropriate title for the page
router.afterEach((to) => {
  document.title = `${to.meta.title} | Judicial Appointments Commission`;
});

export default router;
