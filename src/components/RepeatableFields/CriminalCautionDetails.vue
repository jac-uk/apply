<script>
import CriminalOffenceDetails from './CriminalOffenceDetails';

export default {
  name: 'CriminalCautionDetailsVue',
  extends: CriminalOffenceDetails,
  props: {
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your caution here',
    },
  },
};
</script>

