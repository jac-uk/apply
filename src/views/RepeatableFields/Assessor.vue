<template>
  <div>
    <div class="form-group">
      <label>Is this assessor professional or judicial?</label>
      <SelectList :options="selectListOptions.types" v-model="row.type" :id="inputIds.type" />
    </div>
    <div class="form-group">
      <label :for="inputIds.relationship">What is your relationship to the assessor?</label>
      <input class="form-control" type="text" :id="inputIds.relationship" v-model="row.relationship" />
    </div>
    <div class="form-group">
      <label :for="inputIds.relationship">Assessor’s name</label>
      <input class="form-control" type="text" :id="inputIds.relationship" v-model="row.name" />
    </div>
    <div class="form-group">
      <label :for="inputIds.position">Assessor’s position</label>
      <input class="form-control" type="text" :id="inputIds.position" v-model="row.position" />
    </div>
    <div class="form-group">
      <label :for="inputIds.email">Assessor’s email</label>
      <input class="form-control" type="email" :id="inputIds.email" v-model="row.email" />
    </div>
    <div class="form-group">
      <label :for="inputIds.phone">Assessor’s telephone number</label>
      <input class="form-control" type="tel" :id="inputIds.phone" v-model="row.phone" />
    </div>
    <slot name="removeButton"></slot>
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
    }
  }
</script>
