<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails.vue';
export default {
  name: 'ProfessionalMisconductDetails',
  extends: ProfessionalMisconductFieldDetails,
  props: {
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your professional misconduct here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'misconduct',
    },
  },
};
</script>

