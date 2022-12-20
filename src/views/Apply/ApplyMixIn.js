/*
The purpose of this Mix-in is to share code between TaskList.vue and Review.vue
*/

import Countdown from '@/components/Page/Countdown';
import { mapGetters } from 'vuex';
import {
  isLegal,
  isNonLegal,
  isWelshAdministrationRequired,
  isSpeakWelshRequired,
  isReadWriteWelshRequired,
  isApplyingForWelshPost,
  applicationParts,
  currentApplicationParts,
  isMoreInformationNeeded,
  isApplicationComplete,
  hasApplicationProcess,
  hasStatementOfEligibility
} from '@/helpers/exerciseHelper';
import { updateLangToTextNode } from '@/helpers/language';

export default {
  components: {
    Countdown,
  },
  data() {
    return {
      isVacancyOpen: false, // see mounted() for more info
    };
  },
  computed: {
    ...mapGetters('vacancy', [
      'getOpenDate',
      'getCloseDate',
      'isOpen',
    ]),
    language() {
      return this.$store.state.application.language;
    },
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    applicationId() {
      return this.$route.params.applicationId;
    },
    application() {
      return this.$store.state.application.record;
    },
    userId() {
      return this.$store.state.auth.currentUser.uid;
    },
    uploadPath() {
      return `/exercise/${this.vacancy.id}/user/${this.userId}`;
    },
    isLegal() {
      return isLegal(this.vacancy);
    },
    isNonLegal() {
      return isNonLegal(this.vacancy);
    },
    isWelshAdministrationRequired() {
      return isWelshAdministrationRequired(this.vacancy);
    },
    isSpeakWelshRequired() {
      return isSpeakWelshRequired(this.vacancy);
    },
    isReadWriteWelshRequired() {
      return isReadWriteWelshRequired(this.vacancy);
    },
    isApplyingForWelshPost() {
      return isApplyingForWelshPost(this.vacancy, this.application);
    },
    applicationParts() {
      return applicationParts(this.vacancy);
    },
    currentApplicationParts() {
      return currentApplicationParts(this.vacancy);
    },
    isMoreInformationNeeded() {
      return isMoreInformationNeeded(this.vacancy, this.application);
    },
    isVacancyClosed() {
      if (!hasApplicationProcess(this.vacancy) && !this.isVacancyOpen) {
        return true;
      }
      return false;
    },
    hasStatementOfEligibility() {
      return hasStatementOfEligibility(this.vacancy);
    },
    isApplicationComplete() {
      return isApplicationComplete(this.vacancy, this.application);
    },
    vacancyCloseTime() {  // TODO check how this differs from simply calling getCloseDate
      const applicationCloseDate = this.$store.getters['vacancy/getCloseDate'];
      const candidateDateExtension = this.application.dateExtension;
      return candidateDateExtension ? candidateDateExtension : applicationCloseDate;
    },
    isDraftApplication() {
      return this.application.status === 'draft';
    },
    canApply () {
      if (this.isDraftApplication && this.isVacancyOpen && this.isApplicationComplete) {
        return true;
      } else if (this.isMoreInformationNeeded && this.isApplicationComplete) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    // isVacancyOpen should flick to 'false' automatically when the deadline is reached
    this.isVacancyOpen = this.$store.getters['vacancy/isOpen']();
    if (this.isVacancyOpen) {
      const self = this;
      setInterval(() => {
        self.isVacancyOpen = self.$store.getters['vacancy/isOpen']();
      }, 60 * 1000);
    }
  },
  updated: async function() {
    if (this.$route.meta.isMultilanguage) {
      this.$nextTick(() => {
        updateLangToTextNode(document.querySelector('#main-content'), this.language);
      });
    }
  },
  methods: {
    canSave(formId) {
      if (this.isDraftApplication && this.isVacancyOpen) {  // vacancy is draft & open
        return true;
      } else if (this.isMoreInformationNeeded && this.currentApplicationParts[formId]) { // vacancy needs more info and current form is part of that info
        return true;
      } else {
        return false;
      }
    },
    async save() {
      this.validate();
      if (this.isValid() && this.formId) {
        this.formData.progress[this.formId] = true;
        await this.$store.dispatch('application/save', this.formData);
        this.logEventAfterSave();
        this.$router.push({ name: 'task-list' });
      }
    },
    logEventAfterSave() {
      // do nothing - can be overriden in parent class
    },
  },
};
