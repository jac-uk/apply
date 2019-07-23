<template>
  <div>
    <div class="form-group">
      <label :for="inputIds.title">Title</label>
      <input
        :id="inputIds.title"
        v-model="row.title"
        type="text"
        class="form-control"
      >
    </div>

    <div class="form-group">
      <label>From</label>
      <div class="fieldset-text">
        For example, 02 2017
      </div>
      <DateInput
        v-model="row.date_from"
        type="month"
      />
    </div>

    <div class="custom-control custom-checkbox mb-3">
      <input
        :id="inputIds.currentlyInJob"
        v-model="row.currently_in_job"
        type="checkbox"
        class="custom-control-input"
      >
      <label
        class="custom-control-label"
        :for="inputIds.currentlyInJob"
      >I currently work in this job</label>
    </div>

    <div
      v-if="!row.currently_in_job"
      class="form-group"
    >
      <label>To</label>
      <div class="fieldset-text">
        For example, 02 2017
      </div>
      <DateInput
        v-model="row.date_to"
        type="month"
      />
    </div>

    <div class="form-group">
      <label v-if="presentTense">Is this job a judicial appointment?</label>
      <label v-if="pastTense">Was this job a judicial appointment?</label>
      <BooleanInput v-model="row.is_judicial_appointment" />
    </div>

    <div v-if="row.is_judicial_appointment === true">
      <div class="form-group">
        <label v-if="presentTense">Is the appointment salaried or fee-paid?</label>
        <label v-if="pastTense">Was the appointment salaried or fee-paid?</label>
        <SelectList
          :id="inputIds.appointmentType"
          v-model="row.appointment_type"
          :options="selectListOptions.appointmentTypes"
        />
      </div>

      <div class="form-group">
        <label
          v-if="presentTense"
          :for="inputIds.jurisdiction"
        >What’s your jurisdiction?</label>
        <label
          v-if="pastTense"
          :for="inputIds.jurisdiction"
        >What was your jurisdiction?</label>
        <input
          :id="inputIds.jurisdiction"
          v-model="row.jurisdiction"
          type="text"
          class="form-control"
        >
      </div>

      <div class="form-group">
        <label v-if="presentTense">Which circuit do you work on?</label>
        <label v-if="pastTense">Which circuit did you work on?</label>
        <SelectList
          :id="inputIds.circuit"
          v-model="row.circuit"
          :options="selectListOptions.circuits"
        />
      </div>

      <div class="form-group">
        <label
          v-if="presentTense"
          :for="inputIds.region"
        >Which region do you work in?</label>
        <label
          v-if="pastTense"
          :for="inputIds.region"
        >Which region did you work in?</label>
        <input
          :id="inputIds.region"
          v-model="row.region"
          type="text"
          class="form-control"
        >
      </div>

      <div class="form-group">
        <label
          v-if="presentTense"
          :for="inputIds.daysSat"
        >How many days have you sat in this appointment?</label>
        <label
          v-if="pastTense"
          :for="inputIds.daysSat"
        >How many days did you sit in this appointment?</label>
        <input
          :id="inputIds.daysSat"
          v-model.number="row.days_sat"
          type="number"
          class="form-control"
          style="max-width: 6rem;"
        >
      </div>
    </div>

    <div v-if="row.is_judicial_appointment === false">
      <div class="form-group">
        <label v-if="presentTense">Is this job in the Government Legal Service or Crown Prosecution Service?</label>
        <label v-if="pastTense">Was this job in the Government Legal Service or Crown Prosecution Service?</label>
        <BooleanInput v-model="row.is_public_employee" />
      </div>

      <div class="form-group">
        <label :for="inputIds.company">Company or organisation</label>
        <input
          :id="inputIds.company"
          v-model="row.company"
          type="text"
          class="form-control"
        >
      </div>

      <div class="form-group">
        <label v-if="presentTense">What law-related activities do you do?</label>
        <label v-if="pastTense">What law-related activities did you do?</label>
        <div class="fieldset-text">
          Select all that apply
        </div>
        <SelectList
          :id="inputIds.activities"
          v-model="row.activities"
          :multiple="true"
          :options="selectListOptions.activities"
        />
        <div class="custom-control custom-checkbox">
          <input
            :id="inputIds.activitiesOther"
            v-model="row.activities_has_other"
            type="checkbox"
            class="custom-control-input"
          >
          <label
            class="custom-control-label"
            :for="inputIds.activitiesOther"
          >Other activity that may be considered law-related</label>
          <input
            v-if="row.activities_has_other"
            v-model="row.activities_other"
            type="text"
            class="form-control"
          >
        </div>
      </div>

      <div class="form-group">
        <label :for="inputIds.mainDuties">Main duties</label>
        <textarea
          :id="inputIds.mainDuties"
          v-model="row.main_duties"
          class="form-control"
          rows="3"
        />
      </div>

      <div class="form-group">
        <label :for="inputIds.specialisms">Specialism/s</label>
        <textarea
          :id="inputIds.specialisms"
          v-model="row.specialisms"
          class="form-control"
          rows="3"
        />
      </div>
    </div>

    <slot name="removeButton" />
  </div>
</template>

<script>
import DateInput from '@/components/DateInput';
import BooleanInput from '@/components/BooleanInput';
import SelectList from '@/components/SelectList';

export default {
  name: 'Experience',
  components: {
    SelectList,
    BooleanInput,
    DateInput,
  },
  props: [
    'row',
    'index',
  ],
  data() {
    return {
      inputIds: {
        title: `experience_${this.index}_title`,
        currentlyInJob: `experience_${this.index}_currently_in_job`,
        appointmentType: `experience_${this.index}_appointment_type`,
        jurisdiction: `experience_${this.index}_jurisdiction`,
        circuit: `experience_${this.index}_circuit`,
        region: `experience_${this.index}_region`,
        daysSat: `experience_${this.index}_days_sat`,
        company: `experience_${this.index}_company`,
        activities: `experience_${this.index}_activities`,
        activitiesOther: `experience_${this.index}_activities_other`,
        mainDuties: `experience_${this.index}_main_duties`,
        specialisms: `experience_${this.index}_specialisms`,
      },
      selectListOptions: {
        appointmentTypes: [
          'Salaried',
          'Fee-paid',
        ],
        circuits: [
          'London and south east',
          'Western',
          'Midlands',
          'Northern',
          'North eastern',
          'Wales',
        ],
        activities: [
          'Carrying out of judicial functions of any court or tribunals',
          'Acting as an arbitrator',
          'Practising or being employed as a lawyer',
          'Advising (whether or not in the course of such practice or employment as a lawyer) on the application of the law',
          'Assisting (whether or not in the course of such practice) persons involved in proceedings for the resolution of issues arising under the law',
          'Acting (whether or not in the course of such practice) as a mediator in connection with attempts to resolve issues that are the subject of proceedings or could be, if not resolved',
          'Drafting (whether or not in the course of such practice) documents intended to affect persons’ rights and obligations',
          'Teaching or researching law',
        ],
      },
    };
  },
  computed: {
    presentTense() {
      return !!this.row.currently_in_job;
    },
    pastTense() {
      return !this.row.currently_in_job;
    },
  },
};
</script>
