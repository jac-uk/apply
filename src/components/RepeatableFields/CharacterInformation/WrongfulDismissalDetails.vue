<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails.vue';
export default {
  name: 'WrongfulDismissalDetails',
  extends: ProfessionalMisconductFieldDetails,
  props: {
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your wrongful dismissal here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'dismissal',
    },
  },
};
</script>
