<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails';
export default {
  name: 'DiscriminationProceedingDetails',
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
      default: 'Please add details of your discrimination proceeding here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'discrimination',
    },
  },
};
</script>
