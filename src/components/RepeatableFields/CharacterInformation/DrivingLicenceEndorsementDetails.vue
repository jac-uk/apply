<script>
import CriminalOffenceDetails from '../CriminalOffenceDetails';
export default {
  name: 'DrivingLicenceEndorsementDetails',
  extends: CriminalOffenceDetails,
  props: {
    label: {
      required: false,
      type: String,
      default: 'Sentence, penalty, number of penalty points or fine',
    },
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your endorsement here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'driving-licence-endorsements',
    },
  },
};
</script>
