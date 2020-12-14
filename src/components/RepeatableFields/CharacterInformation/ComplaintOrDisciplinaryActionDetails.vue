<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails';
export default {
  name: 'ComplaintOrDisciplinaryActionDetails',
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
      default: 'Please add details of your complaint or disciplinary action here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'disciplinaryAction',
    },
  },
};
</script>

