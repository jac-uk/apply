<script>
import FinancialDetails from '../FinancialDetails';
export default {
  name: 'LateVatReturnDetails',
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
      default: 'Date of late VAT return',
    },
    hint1: {
      required: false,
      type: String,
      default: 'e.g. 2021/2022',
    },
    hint2: {
      required: false,
      type: String,
      default: 'Please add details of your late VAT return and provide details of any penalties or ' +
        'surcharges applied. Please write one declaration per financial year, this includes any penalties ' +
        'against you or company or firm that you have personal responsibility for ',
    },
    url: {
      required: false,
      type: String,
      default: '',
    },
    name: {
      required: false,
      type: String,
      default: 'vat-issues',
    },
  },
};
</script>

