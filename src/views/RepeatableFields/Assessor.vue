<template>
  <div>
    <div class="form-group">
      <label>Is this assessor professional or judicial?</label>
      <SelectList
        :id="inputIds.type"
        v-model="row.type"
        :options="selectListOptions.types"
      />
    </div>
    <div class="form-group">
      <label :for="inputIds.relationship">What is the assessor’s relationship to you?</label>
      <input
        :id="inputIds.relationship"
        v-model="row.relationship"
        class="form-control"
        type="text"
      >
    </div>
    <div class="form-group">
      <label :for="inputIds.relationship">Assessor’s name</label>
      <input
        :id="inputIds.relationship"
        v-model="row.name"
        class="form-control"
        type="text"
      >
    </div>
    <div class="form-group">
      <label :for="inputIds.position">Assessor’s position</label>
      <input
        :id="inputIds.position"
        v-model="row.position"
        class="form-control"
        type="text"
      >
    </div>
    <div class="form-group">
      <label :for="inputIds.email">Assessor’s email</label>
      <input
        :id="inputIds.email"
        v-model="row.email"
        class="form-control"
        type="email"
      >
    </div>
    <div class="form-group">
      <label :for="inputIds.phone">Assessor’s telephone number</label>
      <input
        :id="inputIds.phone"
        v-model="row.phone"
        class="form-control"
        type="tel"
      >
    </div>
    <slot name="removeButton" />
  </div>
</template>

<script>
import SelectList from '@/components/SelectList';

export default {
  components: {
    SelectList,
  },
  props: [
    'row',
    'index',
  ],
  data() {
    return {
      inputIds: {
        type: `assessor_${this.index}_type`,
        relationship: `assessor_${this.index}_relationship`,
        name: `assessor_${this.index}_name`,
        position: `assessor_${this.index}_position`,
        email: `assessor_${this.index}_email`,
        phone: `assessor_${this.index}_phone`,
      },
      selectListOptions: {
        types: [
          'Professional',
          'Judicial',
        ],
      },
    };
  },
};
</script>
