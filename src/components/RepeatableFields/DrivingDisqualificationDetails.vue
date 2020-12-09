<script>
import CriminalOffenceDetails from './CriminalOffenceDetails';
export default {
  name: 'DrivingDisqualificationDetails',
  extends: CriminalOffenceDetails,
  props: {
    label: {
      required: false,
      type: String,
      default: 'Sentence, penalty or fine',
    },
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your disqualification here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
  },
};
</script>
