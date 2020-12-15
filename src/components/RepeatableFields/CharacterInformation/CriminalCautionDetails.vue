<script>
import CriminalOffenceDetails from '../CriminalOffenceDetails';
export default {
  name: 'CriminalCautionDetails',
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
      default: 'Please add details of your caution here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'cautions',
    },
  },
};
</script>

