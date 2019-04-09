<template>
  <div>
    <div class="form-group">
      <label :for="inputIds.offence">Offence</label>
      <input type="text" class="form-control" :id="inputIds.offence" v-model="row.offence">
    </div>
    <div class="form-group">
      <label>Date of offence</label>
      <DateInput v-model="row.offence_date" type="month" />
    </div>
    <div class="form-group">
      <label :for="inputIds.sentence">Sentence or penalty</label>
      <input type="text" class="form-control" :id="inputIds.sentence" v-model="row.sentence">
    </div>
    <div class="form-group">
      <label>Date of sentence or penalty</label>
      <DateInput v-model="row.sentence_date" type="month" />
    </div>
    <div class="form-group">
      <label :for="inputIds.circumstances">Circumstances</label>
      <div class="fieldset-text">Give any circumstances you want to be taken into account when we consider your application</div>
      <textarea class="form-control" :id="inputIds.circumstances" v-model="row.circumstances" rows="3"></textarea>
    </div>
    <slot name="removeButton"></slot>
  </div>
</template>

<script>
  import DateInput from '@/components/DateInput';
  let uid = 0;

  export default {
    name: 'OffenceDetails',
    components: {
      DateInput,
    },
    props: [
      'row',
      'index',
    ],
    data() {
      return {
        inputIds: {
          offence: `offence_${uid}_offence`,
          sentence: `offence_${uid}_sentence`,
          circumstances: `offence_${uid}_circumstances`,
        }
      };
    },
    created() {
      uid++;
    },
  }
</script>
