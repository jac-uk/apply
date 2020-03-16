<template>
  <a
    v-if="linkHref"
    class="govuk-link govuk-body-m"
    :class="{'download-visited' : visited }"
    :download="fileName"
    :href="linkHref"
  >
    {{ linkText }}
  </a>
  <span
    v-else
  >
    {{ linkText }}
  </span>
</template>

<script>
import firebase from '@firebase/app';
import '@firebase/storage';
export default {
  props: {
    fileName: {
      required: true,
      type: String,
      default: '',
    },
    exerciseId: {
      required: true,
      type: String,
      default: '',
    },
    title: {
      required: false,
      type: String,
      default: '',
    },
  },
  data () {
    return {
      visited: false,
      linkHref: '',
    };
  },
  computed: {
    linkText() {
      return this.title ? this.title : this.fileName;
    },
  },
  async mounted() {
    const downloadUrl = await this.getDownloadURL();

    if (downloadUrl) {
      this.linkHref = downloadUrl;
    }
  },
  methods: {
    async getDownloadURL() {
      const fileRef = firebase.storage().ref(`exercise/${this.exerciseId}/${this.fileName}`);

      try {
        const downloadUrl = await fileRef.getDownloadURL();

        if (typeof downloadUrl === 'string' && downloadUrl.length) {
          return downloadUrl;
        }
        return false;
      } catch (e) {
        return false;
      }
    },
  },
};
</script>

<style scoped>
  .download-visited {
    color: #4c2c92;
  }
</style>
