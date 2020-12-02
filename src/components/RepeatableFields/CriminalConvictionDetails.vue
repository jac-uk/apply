<script>
import CriminalOffenceDetails from './CriminalOffenceDetails';
export default {
  name: 'CriminalConvictionDetailsVue',
  extends: CriminalOffenceDetails,
  props: {
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your conviction here',
    },
  },
};
</script>
