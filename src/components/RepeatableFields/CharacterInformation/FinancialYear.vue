<script>
import TextField from '@/components/Form/TextField.vue';
import { validateFinancialYear } from '../../../helpers/date';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'FinancialYear',
  components: {
    TextField,
  },
  extends: TextField,
  methods: {
    validate() {
      this.setError('');
      if (!validateFinancialYear(this.modelValue)) {
        this.setError('Please fill in Financial year e.g. 2021/2022');
      }
    },
  },
};
</script>

