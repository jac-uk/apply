<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails';
export default {
  name: 'HarassmentDetails',
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
      default: 'Please add details of your harassment proceeding here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'harassment',
    },
  },
};
</script>
