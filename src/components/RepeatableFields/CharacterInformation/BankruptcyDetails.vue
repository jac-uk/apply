<script>
import FinancialDetails from '../FinancialDetails.vue';
export default {
  name: 'BankruptcyDetails',
  extends: FinancialDetails,
  props: {
    label1: {
      required: false,
      type: String,
      default: 'Financial year',
    },
    label2: {
      required: false,
      type: String,
      default: 'Date of declaration of bankruptcy',
    },
    hint1: {
      required: false,
      type: String,
      default: 'e.g. 2021/2022',
    },
    hint2: {
      required: false,
      type: String,
      default: 'Please add details of your bankruptcy here',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'bankruptcies',
    },
  },
};
</script>
