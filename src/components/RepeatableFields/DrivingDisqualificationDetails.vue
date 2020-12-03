<script>
import CriminalOffenceDetails from './CriminalOffenceDetails';
export default {
  name: 'DrivingDisqualificationDetails',
  extends: CriminalOffenceDetails,
  props: {
    label: {
      required: true,
      type: String,
      default: 'Sentence, penalty or fine',
    },
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your caution here',
    },
  },
};
</script>
