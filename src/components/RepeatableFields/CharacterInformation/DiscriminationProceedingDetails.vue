<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails.vue';
export default {
  name: 'DiscriminationProceedingDetails',
  extends: ProfessionalMisconductFieldDetails,
  props: {
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
