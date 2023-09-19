<script>
import ProfessionalMisconductFieldDetails from './ProfessionalMisconductFieldDetails.vue';
export default {
  name: 'HarassmentDetails',
  extends: ProfessionalMisconductFieldDetails,
  props: {
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
