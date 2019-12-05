import Vue from 'vue';
import firebase from 'firebase';

Vue.mixin({
    methods: {
      upload(item) {
        //console.log('upload function called');
        //console.log(`item.name = ${item.name}`);
        //console.log(`item.type = ${item.type}`);
        //console.log('item = ', item);      
        const file = item.file;
        const fileExtension = file.name.split('.')[1];
      
        const fileNameMap = new Map([
          ['suitability-statement-file', 'suitability-statement'],
          ['leadership-suitability-assessment-file', 'leadership-suitability-assessment'],
          ['cv-file', 'cv'],
          ['self-assessment-file', 'self-assessment'],
        ]);
      
        const fileName = fileNameMap.get(item.type);
        
        // set the file path in Firebase storage here
        const fileSavePath = `exercise-${this.application.exerciseId}/userid-${this.userId}/${fileName}.${fileExtension}`;
      
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
                  // set proper Firestore value depending on the file name in the download url
                  if (downloadURL.includes('suitability-statement')) {
                    this.application.uploadedSuitabilityStatement = 'suitability-statement';
                  } else if (downloadURL.includes('leadership-suitability-assessment')) {
                    this.application.uploadedLeadershipSustainabilityAssessment = 'leadership-suitability-assessment';
                  } else if (downloadURL.includes('cv')) {
                    this.application.uploadedCV = 'cv';
                  } else if (downloadURL.includes('self-assessment')) {
                    this.application.uploadedSelfAssessment = 'self-assessment';
                  }

                  // don't forget to save
                  this.$store.dispatch('application/save', this.application);
                });
              });
        },
        fileSelected(event) {  
          if (event.target.files.length > 0) {
            const file = event.target.files[0];
    
            const data = {
              name: file.name,
              file: file,
              type: event.target.id,
            };
    
            this.files[data.type] = data;
          }
        },         
    },
  });
