<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails';
export default {
  name: 'WrongfulDismissalDetails',
  extends: ProfessionalMisconductFieldDetails,
  props: {
    label: {
      required: false,
      type: String,
      default: 'Date of offence',
    },
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
