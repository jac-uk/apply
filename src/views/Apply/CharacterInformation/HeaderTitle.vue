<template>
  <div>
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-three-quarters">
        <h1
          class="govuk-heading-xl"
        >
          {{ title }}
        </h1>
      </div>
      <div class="govuk-grid-column-one-quarter">
        <img
          src="@/assets/info.svg"
          alt="Good character guidance"
          width="46"
          height="46"
          @click.prevent="openModal"
        >
      </div>
    </div>
    <InfoModal
      ref="openInfoModalRef"
      title="Guidance"
      button-text="Close"
      :cancelable="false"
      message="Visit this link to read further guidance for this question:"
      :url="urlToGoodCharacterSection"
    />
  </div>
</template>

<script>
import InfoModal from '@/components/Page/InfoModal';

export default {
  name: 'HeaderTitle',
  components: {
    InfoModal,
  },
  props: {
    title: {
      required: true,
      type: String,
      default: '',
    },
    urlToGoodCharacterSection: {
      required: true,
      type: String,
      default: '',
    },
  },
  methods: {
    openModal(){
      this.$refs.openInfoModalRef.openModal();
    },
  },
};
</script>
