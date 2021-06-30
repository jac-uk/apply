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
        <div
          v-if="showJudicialFunctions"
        >
          <TextField
            :id="`${id}_legal_experience`"
            v-model="localJudicialFunctions.legalExperience"
            label="Legal Experience:"
            required
          />

          <DateInput
            :id="`${id}_date`"
            v-model="localJudicialFunctions.date"
            label="Date:"
            required
          />

          <TextField
            :id="`${id}_category_of_law`"
            v-model="localJudicialFunctions.categoryOfLaw"
            label="Category of Law:"
            required
          />

          <DateInput
            :id="`${id}_time_engaged_start`"
            v-model="localJudicialFunctions.timeEngagedStart"
            label="Dates Engaged In This Activity:"
            hint="Start date"
            required
          />

          <DateInput
            :id="`${id}_time_engaged_end`"
            v-model="localJudicialFunctions.timeEngagedEnd"
            hint="End date"
            required
          /> 

          <Select
            :id="`${id}_working_basis`"
            v-model="localJudicialFunctions.workingBasis"
            :value="localJudicialFunctions.workingBasis"
            label="Working Basis"
            hint="Number of days a month"
            required
          >
            <option
              v-for="option in ['Full Time', 'Part Time', 'Other']"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </Select>
          <TextField
            v-if="['Other', 'Part Time'].some((element) => element === localJudicialFunctions.workingBasis)"
            :id="`${id}_working_basis_days`"
            v-model="localJudicialFunctions.workingBasisDays"
            hint="Please Indicate Your Engagement In Days per Month"
            type="number"
          />

          <Checkbox
            :id="`${id}_judicial_office`"
            v-model="localJudicialFunctions.judicialOffice"
            label="Judicial Office:"
          >
            <div
              v-if="localJudicialFunctions.judicialOffice"
            >
              <TextField
                :id="`${id}_office_type`"
                v-model="localJudicialFunctions.judicialOfficeType"
                label="Previous Judicial Office Type:"
                required
              />

              <DateInput
                :id="`${id}_judicial_appointment_date`"
                v-model="localJudicialFunctions.judicialAppointmentDate"
                label="Judicial Appointment date:"
                required
              />

              <TextField
                :id="`${id}_nature_of_appointment`"
                v-model="localJudicialFunctions.natureOfAppointment"
                label="Nature of Appointment:"
                hint="eg. 'fee-paid tribunal judge'"
                required
              />

              <TextField
                :id="`${id}_circuit_or_region`"
                v-model="localJudicialFunctions.circuitOrRegion"
                label="Circuit or Region:"
                required
              />

              <TextField
                :id="`${id}_juristiction`"
                v-model="localJudicialFunctions.jurisdiction"
                label="Jurisdiction:"
                required
              />

              <TextField
                :id="`${id}_tribunal`"
                v-model="localJudicialFunctions.tribunal"
                label="Tribunal:"
                required
              />
            </div>
          </Checkbox> 
        </div>
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

      <div
        v-if="!showJudicialFunctions && localTasks.length"
      >
        <Select
          :id="`${id}_working_basis`"
          v-model="localTasks.workingBasis"
          :value="localTasks.workingBasis"
          label="Engagement basis "
          required
        >
          <option
            v-for="option in ['Full Time', 'Part Time', 'Other']"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </Select>

        <TextField
          v-if="['Other', 'Part Time'].some((element) => element === localTasks.workingBasis)"
          :id="`${id}_working_basis_days`"
          v-model="localTasks.workingBasisDays"
          hint="Please Indicate Your Engagement In Days per Month"
          type="number"
          required
        />
      </div>
    </CheckboxGroup>
  </div>
</template>

<script>
import Checkbox from '@/components/Form/Checkbox';
import DateInput from '@/components/Form/DateInput';
import CheckboxItem from '@/components/Form/CheckboxItem';
import CheckboxGroup from '@/components/Form/CheckboxGroup';
import TextField from '@/components/Form/TextField';
import TextareaInput from '@/components/Form/TextareaInput';
import FormFieldError from '@/components/Form/FormFieldError';
import FormField from '@/components/Form/FormField';
import Select from '@jac-uk/jac-kit/draftComponents/Form/Select.vue';

export default {
  name: 'LawRelatedTasks',
  components: {
    Checkbox,
    DateInput,
    CheckboxItem,
    CheckboxGroup,
    TextField,
    TextareaInput,
    FormFieldError,
    Select,
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
    showJudicialFunctions: {
      required: false,
      type: Boolean,
      default: () => false,
    },
    otherTasks: {
      type: String,
      default: '',
      required: true,
    },
    judicialFunctions: {
      type: Object,
      default: () => {},
      required: false,
    },
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
    localJudicialFunctions: {
      get() {
        return this.judicialFunctions;
      },
    },
  },
  watch: {
    localJudicialFunctions: {
      handler(val){
        this.$emit('update:judicialFunctions', val);
      },
      deep: true,
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
