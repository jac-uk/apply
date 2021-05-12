<template>
  <div
    :class="{'govuk-form-group--error': hasError}"
  >
    <CheckboxGroup
      :id="id"
      v-model="localTasks"
      label="Law-related tasks in this role"
    >
      <FormFieldError
        :id="id"
        :error-message="errorMessage"
      />
      <p class="govuk-hint govuk-!-margin-top-0">
        Select all tasks you do in this role. These are defined in the
        <a
          class="govuk-link"
          href="http://www.legislation.gov.uk/ukpga/2007/15/section/52"
          target="_blank"
        >
          Tribunals, Courts and Enforcement Act 2007.
        </a>
      </p>

      <CheckboxItem
        value="judicial-functions"
        label="The carrying-out of judicial functions of any court or tribunal"
      >
        <TextField
          :id="`${id}_legal_experience`"
          v-model="judicialFunctions.legalExperience"
          label="Legal Experience:"
        />

        <DateInput
          :id="`${id}_date`"
          v-model="judicialFunctions.date"
          label="Date:"
        />

        <TextField
          :id="`${id}_category_of_law`"
          v-model="judicialFunctions.categoryOfLaw"
          label="Category of Law:"
        />

        <DateInput
          :id="`${id}_time_engaged_start`"
          v-model="judicialFunctions.timeEngagedStart"
          label="Time engaged in this activity:"
          hint="Start date"
        />

        <DateInput
          :id="`${id}_time_engaged_end`"
          v-model="judicialFunctions.timeEngagedEnd"
          hint="End date"
        />

        <Checkbox
          :id="`${id}_judicial_office`"
          v-model="judicialFunctions.judicialOffice"
          label="Judicial Office:"
        >
          <div
            v-if="judicialFunctions.judicialOffice"
          >
            <TextField
              :id="`${id}_office_type`"
              v-model="judicialFunctions.judicialOfficeType"
              label="Previous Judicial Office Type:"
            />

            <DateInput
              :id="`${id}_judicial_appointment_date`"
              v-model="judicialFunctions.judicialOfficeType"
              label="Judicial Appointment:"
            />

            <TextField
              :id="`${id}_nature_of_appointment`"
              v-model="judicialFunctions.natureOfAppointment"
              label="Nature of Appointment:"
              hint="eg. 'fee-paid tribunal judge'"
            />

            <TextField
              :id="`${id}_circuit_or_region`"
              v-model="judicialFunctions.circuitOrRegion"
              label="Circuit or Region:"
            />

            <TextField
              :id="`${id}_juristictions`"
              v-model="judicialFunctions.jurisdictions"
              label="Jurisdiction:"
            />

            <TextField
              :id="`${id}_tribunal`"
              v-model="judicialFunctions.tribunal"
              label="Tribunal:"
            />
          </div>
        </Checkbox>
      </CheckboxItem>
      <CheckboxItem
        value="acting-arbitrator"
        label="Acting as an arbitrator"
      />
      <CheckboxItem
        value="practice-or-employment-as-lawyer"
        label="Practice or employment as a lawyer"
      />
      <CheckboxItem
        value="advising-application-of-law"
        label="Advising on the application of the law"
      />
      <CheckboxItem
        value="assisting-in-proceedings-for-resolution-of-issues-under-law"
        label="Assisting persons involved in proceedings for the resolution of issues arising under the law"
      />
      <CheckboxItem
        value="acting-mediator-in-resolving-issues-that-are-of-proceedings"
        label="Acting as mediator in connection with attempts to resolve issues that are, or if not resolved could be, the subject of proceedings"
      />
      <CheckboxItem
        value="drafting-documents-that-affect-rights-obligations"
        label="Drafting documents intended to affect persons' rights or obligations"
      />
      <CheckboxItem
        value="teaching-researching-law"
        label="Teaching or researching law"
      />
      <CheckboxItem
        value="other"
        label="None of the above - Any activity that, in the relevant decision-maker's opinion, is of a broadly similar nature to those listed above"
      >
        <TextareaInput
          :id="`${id}_other_tasks`"
          v-model="localOtherTasks"
          label="List your different law-related tasks"
          rows="2"
        />
      </CheckboxItem>
    </CheckboxGroup>
  </div>
</template>

<script>
import CheckboxItem from '@/components/Form/CheckboxItem';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import Checkbox from '@/components/Form/Checkbox';
import TextField from '@/components/Form/TextField';
import TextareaInput from '@/components/Form/TextareaInput';
import DateInput from '@/components/Form/DateInput';
import FormFieldError from '@/components/Form/FormFieldError';
import FormField from '@/components/Form/FormField';

export default {
  name: 'LawRelatedTasks',
  components: {
    CheckboxItem,
    CheckboxGroup,
    Checkbox,
    TextField,
    TextareaInput,
    DateInput,
    FormFieldError,
  },
  extends: FormField,
  props: {
    required: {
      default: false,
      type: Boolean,
    },
    tasks: {
      required: true,
      validator: (value) => (value instanceof Array || value === null || value === undefined),
    },
    id: {
      required: true,
      type: String,
      default: null,
    },
    otherTasks: {
      required: true,
      type: String,
      default: '',
    },
  },
  data(){
    return {
      judicialFunctions: {},
    };
  },
  computed: {
    localTasks: {
      get() {
        return this.tasks;
      },
      set(val) {
        this.$emit('update:tasks', val);
      },
    },
    localOtherTasks: {
      get() {
        return this.otherTasks;
      },
      set(val) {
        this.$emit('update:otherTasks', val);
      },
    },
  },
  methods: {
    validate() {
      this.setError('');
      if (this.required && this.localTasks.length === 0) {
        this.setError('Select at least one task you do in this role');
      }
    },
  },
};
</script>
