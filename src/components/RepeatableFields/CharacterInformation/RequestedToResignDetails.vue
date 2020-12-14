<script>
import RequestedToResignFromPositionDetails from './RequestedToResignFromPositionDetails';
export default {
  name: 'RequestedToResignDetails',
  extends: RequestedToResignFromPositionDetails,
  props: {
    label: {
      required: false,
      type: String,
      default: 'Date of request to resign',
    },
    hint: {
      required: false,
      type: String,
      default: 'Please add details here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'resignations',
    },
  },
};
</script>
