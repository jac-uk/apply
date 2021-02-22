<script>
import CriminalOffenceDetails from '../CriminalOffenceDetails';
export default {
  name: 'DrivingDisqualificationDetails',
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
      default: 'Please add details of your disqualification here including the dates of your disqualification period',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'driving-disqualifications',
    },
  },
};
</script>
