<script>
import Form from '@/components/Form/Form';

export default {
  name: 'CharacterInformationForm',
  extends: Form,
  methods: {
    updateProgress() {
      this.application.progress.characterInformation =
        this.characterInformation.criminalCautions !== undefined &&
        this.characterInformation.criminalConvictions !== undefined &&
        this.characterInformation.fixedPenalties !== undefined;
    },
  },
};
</script>

