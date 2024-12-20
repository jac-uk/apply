<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <label
      :for="id"
      class="govuk-heading-m govuk-!-margin-bottom-2"
    >
      {{ label }}
    </label>
    <span
      v-if="hint"
      class="govuk-hint"
    >
      {{ hint }}
    </span>
    <FormFieldError
      :id="id"
      :error-message="errorMessage"
    />
    <p
      v-if="haveFile && !isReplacing && !file"
      class="govuk-body-m"
    >
      Your file has been received.
      <button
        class="govuk-file-upload govuk-!-margin-left-2"
        @click="replaceFile"
      >
        Replace
      </button>
      <a
        v-if="fileName && downloadUrl"
        class="govuk-link govuk-!-margin-left-2"
        :download="fileName"
        :href="downloadUrl"
      >
        {{ fileName }}
      </a>
    </p>
    <p v-else-if="isUploading">
      Uploading...
    </p>
    <div
      v-else
      :class="{'govuk-input--error': hasError}"
    >
      <button
        class="govuk-file-upload"
        style="margin-left: 0;"
        @click="handleUpload"
      >
        Choose file
      </button>
      No file chosen
      <input
        :id="id"
        ref="file"
        type="file"
        :accept="acceptableExtensions"
        class="govuk-file-upload"
        :class="{'govuk-input--error': hasError}"
        style="display: none;"
        @change="fileSelected"
      >
      <p>Acceptable file types: {{ acceptableExtensions.join(', ') }}</p>
    </div>
  </div>
</template>
<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import FormField from './FormField.vue';
import FormFieldError from './FormFieldError.vue';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'FileUpload',
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    path: {
      type: String,
      required: true,
      default: '',
    },
    modelValue: {
      default: '',
      type: String,
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    messages: {
      type: Object,
      default: () => {
        return {
          required: 'Please choose a file to upload',
        };
      },
    },
    acceptableExtensions: {
      type: Array,
      default: () => {
        return ['docx', 'doc', 'odt', 'txt', 'fodt'];
      },
    },
  },
  emits: ['update:modelValue', 'uploadedFullPath'],
  data() {
    return {
      file: '',
      isReplacing: false,
      isUploading: false,
      downloadUrl: null,
    };
  },
  computed: {
    haveFile() {
      return this.modelValue ? true : false;
    },
    fileName: {
      get() {
        return this.modelValue;
      },
      set(val) {
        if (val) {
          this.$emit('update:modelValue', val);
        }
      },
    },
  },
  async mounted () {
    if (typeof this.fileName === 'string' && this.fileName.length) {
      const isUploaded = await this.verifyFile(this.fileName);

      if (!isUploaded) {
        this.fileName = '';
        this.resetFile();
      }
    }
  },
  methods: {
    handleUpload(e) {
      e.preventDefault();
      this.$refs.file.click();
    },
    replaceFile() {
      this.isReplacing = true;
    },
    fileSelected() {
      const file = this.$refs.file.files[0];
      this.setError('');
      return this.upload(file);
    },
    generateFileName(originalName) {
      const parts = originalName.split('.');
      if ( parts.length === 1 || ( parts[0] === '' && parts.length === 2 )) {
        return this.name;
      }

      return [this.name, parts.pop()].join('.');
    },
    validFileExtension(originalName){
      const parts = originalName.split('.');

      if (parts.length < 2){
        return false;
      }

      if (this.acceptableExtensions.includes(parts.pop())){
        return true;
      }
      return false;
    },
    fileIsEmpty(size){
      return size <= 0;
    },
    fileIsTooBig(size){
      const megabyteSize = size / 1024 / 1024; // in MB
      return megabyteSize > 2;
    },
    resetFile() {
      this.isUploading = false;
    },
    async upload(file) {

      console.log('============= Uploading file =============');

      // @todo return more useful error messages
      if (!file) {
        this.setError('File upload failed, please try again');
        return false;
      }
      if (!this.validFileExtension(file.name)) {
        this.setError(`Invalid file type. Choose from: ${this.acceptableExtensions}`);
        return false;
      }
      if (this.fileIsEmpty(file.size)){
        this.setError('File is empty.');
        return false;
      }
      if (this.fileIsTooBig(file.size)){
        this.setError('File is too large. Limit: 2MB');
        return false;
      }

      this.isUploading = true;
      const fileName = this.generateFileName(file.name);

      const uploadedFullPath = `${this.path}/${fileName}`;
      const storage = getStorage();
      const fileRef = ref(storage , uploadedFullPath);

      console.log(`fileName: ${fileName}`);
      console.log(`store to path/generatedFilename: ${uploadedFullPath}`);

      // Delete the current file in file storage
      if (this.haveFile && this.enableDelete) {
        this.deleteFile(this.path, this.modelValue);
      }

      try {
        await uploadBytes(fileRef, file);
        this.isReplacing = false;
        this.fileName = fileName;

        this.downloadUrl = await getDownloadURL(fileRef);

        console.log(`Donwload url: ${this.downloadUrl}`);

        this.$emit('uploadedFilePath', uploadedFullPath);

        return true;
      } catch (e) {
        this.setError('File upload failed, please try again [3]');

        return false;
      } finally {
        this.resetFile();
      }
    },
    async verifyFile(fileName) {
      if (!fileName) {
        return false;
      }

      const storage = getStorage();
      const fileRef = ref(storage, `${this.path}/${fileName}`);

      // Check if file exists in storage
      try {
        this.downloadUrl = await getDownloadURL(fileRef);

        if (typeof downloadUrl === 'string' && this.downloadUrl.length) {
          return true;
        }
        return false;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return false;
      }
    },
  },
};
</script>
