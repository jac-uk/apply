/*
The purpose of this Mix-in is to share code between TaskList.vue and Review.vue
*/

import Countdown from '@/components/Page/Countdown';
import { mapGetters } from 'vuex';

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
      'isLegal',
      'isNonLegal',
      'applicationParts',
      'isApplicationComplete',
    ]),
    vacancy() {
      return this.$store.state.vacancy.record;
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
