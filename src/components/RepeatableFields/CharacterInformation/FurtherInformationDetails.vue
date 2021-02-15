<script>
import RequestedToResignFromPositionDetails from './RequestedToResignFromPositionDetails';
export default {
  name: 'FurtherInformationDetails',
  extends: RequestedToResignFromPositionDetails,
  props: {
    label: {
      required: false,
      type: String,
      default: 'Date',
    },
    hint: {
      required: false,
      type: String,
      default: 'Please add details of any other issues here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'further-info',
    },
  },
};
</script>
