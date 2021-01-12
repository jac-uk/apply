<script>
import CriminalOffenceDetails from '../CriminalOffenceDetails';
export default {
  name: 'FixedPenaltyDetails',
  extends: CriminalOffenceDetails,
  props: {
    label: {
      required: false,
      type: String,
      default: 'Penalty or fine',
    },
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your fixed penalty notice here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'fixed-penalties',
    },
  },
};
</script>
