/*
The purpose of this Mix-in is to share code between TaskList.vue and Review.vue
*/

import Countdown from '@/components/Page/Countdown';
import { mapGetters } from 'vuex';
import { isLegal, isNonLegal, applicationParts, currentApplicationParts, isMoreInformationNeeded, isApplicationComplete } from '@/helpers/exerciseHelper';

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
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    isLegal() {
      return isLegal(this.vacancy);
    },
    isNonLegal() {
      return isNonLegal(this.vacancy);
    },
    applicationParts() {
      return applicationParts(this.vacancy);
    },
    currentApplicationParts() {
      return currentApplicationParts(this.vacancy);
    },
    isMoreInformationNeeded() {
      return isMoreInformationNeeded(this.vacancy);
    },
    isApplicationComplete() {
      return isApplicationComplete(this.vacancy);
    },
    application () {
      return this.$store.state.application.record;
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
      return this.isDraftApplication && this.isVacancyOpen && this.isApplicationComplete;
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
};
