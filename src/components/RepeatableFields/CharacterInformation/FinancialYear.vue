<script>
import TextField from '@/components/Form/TextField';
import { validateFinancialYear } from '../../../helpers/date';

export default {
  name: 'FinancialYear',
  components: {
    TextField,
  },
  extends: TextField,
  methods: {
    validate() {
      this.setError('');
      if (!validateFinancialYear(this.value)) {
        this.setError('Please fill in Financial year e.g. 2021/2022');
      }
    },
  },
};
</script>

