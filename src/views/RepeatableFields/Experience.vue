<template>
  <div>
    <div class="form-group">
      <label :for="inputIds.title">Title</label>
      <input type="text" class="form-control" :id="inputIds.title" v-model="row.title">
    </div>

    <div class="form-group">
      <label>From</label>
      <div class="fieldset-text">
        For example, 02 2017
      </div>
      <DateInput v-model="row.date_from" type="month" />
    </div>

    <div class="custom-control custom-checkbox mb-3">
      <input type="checkbox" class="custom-control-input" :id="inputIds.currentlyInJob" v-model="row.currently_in_job">
      <label class="custom-control-label" :for="inputIds.currentlyInJob">I currently work in this job</label>
    </div>

    <div class="form-group" v-if="!row.currently_in_job">
      <label>To</label>
      <div class="fieldset-text">
        For example, 02 2017
      </div>
      <DateInput v-model="row.date_to" type="month" />
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
        <SelectList :options="selectListOptions.appointmentTypes" v-model="row.appointment_type" :id="inputIds.appointmentType" />
      </div>

      <div class="form-group">
        <label v-if="presentTense" :for="inputIds.jurisdiction">What’s your jurisdiction?</label>
        <label v-if="pastTense" :for="inputIds.jurisdiction">What was your jurisdiction?</label>
        <input type="text" class="form-control" :id="inputIds.jurisdiction" v-model="row.jurisdiction">
      </div>

      <div class="form-group">
        <label v-if="presentTense">Which circuit do you work on?</label>
        <label v-if="pastTense">Which circuit did you work on?</label>
        <SelectList :options="selectListOptions.circuits" v-model="row.circuit" :id="inputIds.circuit" />
      </div>

      <div class="form-group">
        <label v-if="presentTense" :for="inputIds.region">Which region do you work in?</label>
        <label v-if="pastTense" :for="inputIds.region">Which region did you work in?</label>
        <input type="text" class="form-control" :id="inputIds.region" v-model="row.region">
      </div>

      <div class="form-group">
        <label v-if="presentTense" :for="inputIds.daysSat">How many days have you sat in this appointment?</label>
        <label v-if="pastTense" :for="inputIds.daysSat">How many days did you sit in this appointment?</label>
        <input type="number" class="form-control" :id="inputIds.daysSat" v-model.number="row.days_sat" style="max-width: 6rem;">
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
        <input type="text" class="form-control" :id="inputIds.company" v-model="row.company">
      </div>

      <div class="form-group">
        <label v-if="presentTense">What law-related activities do you do?</label>
        <label v-if="pastTense">What law-related activities did you do?</label>
        <div class="fieldset-text">Select all that apply</div>
        <SelectList :multiple="true" :options="selectListOptions.activities" v-model="row.activities" :id="inputIds.activities" />
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" :id="inputIds.activitiesOther" v-model="row.activities_has_other">
          <label class="custom-control-label" :for="inputIds.activitiesOther">Other activity that may be considered law-related</label>
          <input v-if="row.activities_has_other" type="text" class="form-control" v-model="row.activities_other">
        </div>
      </div>

      <div class="form-group">
        <label :for="inputIds.mainDuties">Main duties</label>
        <textarea class="form-control" :id="inputIds.mainDuties" rows="3" v-model="row.main_duties"></textarea>
      </div>

      <div class="form-group">
        <label :for="inputIds.specialisms">Specialism/s</label>
        <textarea class="form-control" :id="inputIds.specialisms" rows="3" v-model="row.specialisms"></textarea>
      </div>
    </div>

    <slot name="removeButton"></slot>
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
      'index'
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
            'Fee-paid'
          ],
          circuits: [
            'London and south east',
            'Western',
            'Midlands',
            'Northern',
            'North eastern',
            'Wales'
          ],
          activities: [
            'Carrying out of judicial functions of any court or tribunals',
            'Acting as an arbitrator',
            'Practising or being employed as a lawyer',
            'Advising (whether or not in the course of such practice or employment as a lawyer) on the application of the law',
            'Assisting (whether or not in the course of such practice) persons involved in proceedings for the resolution of issues arising under the law',
            'Acting (whether or not in the course of such practice) as a mediator in connection with attempts to resolve issues that are the subject of proceedings or could be, if not resolved',
            'Drafting (whether or not in the course of such practice) documents intended to affect persons’ rights and obligations',
            'Teaching or researching law'
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
