<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails';
export default {
  name: 'NegligenceDetails',
  extends: ProfessionalMisconductFieldDetails,
  props: {
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your negligence here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'negligenceDetails',
    },
  },
};
</script>
