<script>
import CriminalOffenceDetails from './CharacterInformation/CriminalOffenceDetails';
export default {
  name: 'DrivingUnderInfluenceConvictionDetails',
  extends: CriminalOffenceDetails,
  props: {
    label: {
      required: false,
      type: String,
      default: 'Sentence, penalty or fine',
    },
    hint: {
      required: false,
      type: String,
      default: 'Please add details of your conviction here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
  },
};
</script>
