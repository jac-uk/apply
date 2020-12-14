<template>
  <div>
    <img
      src="@/assets/info.svg"
      alt="Good character guidance"
      width="46"
      height="46"
      @click.prevent="openModal"
    >
    <InfoModal
      ref="openInfoModalRef"
      title="Guidance"
      button-text="Close"
      :cancelable="false"
      message="Visit this link to read further guidance for this question:"
      :url="url"
    />
  </div>
</template>
<script>
import InfoModal from '@/components/Page/InfoModal';

export default {
  name: 'InfoIcon',
  components: {
    InfoModal,
  },
  props: {
    url: {
      required: true,
      type: String,
      default: '',
    },
  },
  methods: {
    openModal() {
      this.$refs.openInfoModalRef.openModal();
    },
  },
};
</script>
