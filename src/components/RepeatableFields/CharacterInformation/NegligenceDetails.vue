<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails.vue';
export default {
  name: 'NegligenceDetails',
  extends: ProfessionalMisconductFieldDetails,
  props: {
    label: {
      required: false,
      type: String,
      default: 'Is the investigation ongoing?',
    },
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
