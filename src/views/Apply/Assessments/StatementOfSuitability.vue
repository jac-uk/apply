<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">
          Statement of suitability
        </h1>

        <p class="govuk-body-l">
          Intro text provided by team.
        </p>

        <RadioGroup
          id="meet-requirements"
          v-model="meetRequirements"
          label="Do you meet this requirement?"
        >
          <RadioItem
            :value="true"
            label="Yes"
          />
          <RadioItem
            :value="false"
            label="No"
          />
        </RadioGroup>

        <p class="govuk-body">
          In 250 words tell us how.
        </p>

        <p class="govuk-body">
          Come back to this page to upload your statement of suitability.
        </p>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Download Statement Of Suitability template
          </h2>

          <a
            ref="templateDownloadLink"
            class="govuk-link govuk-body-m"
            href="#"
          >
            statement-of-suitability-template.doc
          </a>
        </div>

        <div class="govuk-form-group">
          <h2 class="govuk-heading-m">
            Upload Statement of Suitability
          </h2>
          <input
            id="file-upload-2"
            ref="suitabilityStatementFile"
            class="govuk-file-upload"
            type="file"
          >
          <div>
            <button @click="uploadFile('file-upload-2')">
              Upload Statement Of Suitability 
            </button>
          </div>            
        </div>

        <button class="govuk-button">
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';

export default {
  components: {
    RadioGroup,
    RadioItem,
  },
  data(){
    const defaults = {
      statementOfSuitabilityUrl: null,
    };
    const data = this.$store.getters['application/data']();
    const application = { ...defaults, ...data };
    return {
      application: application,
    };
  },
  methods: {
    save() {

    },
    uploadFile(elementId) {
      //console.log('uploadFile function fired');
      const file = document.querySelector(`#${elementId}`).files[0];
      //console.log(file);

      // These are the folder names set up in Firebase Storage
      const folderNameMap = new Map([
        ['file-upload-2', 'candidate-suitability-statement'],
      ]);

      const folderName = folderNameMap.get(elementId);

      // set the Firebase Storage file path and name here
      // e.g. candidate-cvs/myFile.docx
      const fileSavePath = `${folderName}/${file.name}`;

      const storageRef = firebase.storage().ref();

      let uploadTask = storageRef.child(fileSavePath).put(file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask
        .on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              //let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              //console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                //console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                //console.log('Upload is running');
                break;
              }
            }, (error) => {

              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

              case 'storage/canceled':
                // User canceled the upload
                break;

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
              }
            }, () => {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                //console.log('File available at', downloadURL);
                if (downloadURL.includes('candidate-suitability-statement')) {
                  this.application.suitabilityStatementUrl = downloadURL;
                  this.$store.dispatch('application/save', this.application);
                  alert('SUCCESS: file uploaded');
                }
              });
            });
    },     
  },
};
</script>
