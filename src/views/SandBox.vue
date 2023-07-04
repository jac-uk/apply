<template>
  <div>
    <input
      type="file"
      accept=".docx"
      @change="handleFileUpload"
    >
    <textarea
      v-model="parsedContent"
      rows="10"
      cols="50"
    />
  </div>
</template>
  <script>
import mammoth from 'mammoth';

export default {
  data() {
    return {
      parsedContent: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onerror = (error) => {
          // Handle file read error
          console.error('Error occurred while reading the file:', error);
        };

        reader.onload = () => {
          try {
            this.parseDocument(reader.result);
          } catch (error) {
            // Handle document parsing error
            console.error('Error occurred while parsing the document:', error);
          }
        };

        reader.readAsArrayBuffer(file);
      } else {
        console.error('No file selected.');
      }
    }
    ,
    parseDocument(fileData) {
      const options = {
        arrayBuffer: fileData,
      };

      mammoth.extractRawText(options)
        .then((result) => {
          this.parsedContent = result.value;
        })
        .catch((error) => {
          console.error('Error occurred while parsing the document:', error);
        });
    }
    ,
  },
};
  </script>
