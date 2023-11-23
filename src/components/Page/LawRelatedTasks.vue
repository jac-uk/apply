<template>
  <div
    :class="{'govuk-form-group--error': hasError}"
  >
    <CheckboxGroup
      :id="id"
      v-model="localTasks"
      label="Law-related tasks in this role"
      :required="required"
    >
      <FormFieldError
        :id="id"
        :error-message="errorMessage"
      />
      <p class="govuk-hint govuk-!-margin-top-0">
        {{ hintText }} These are defined in the
        <a
          class="govuk-link"
          href="http://www.legislation.gov.uk/ukpga/2007/15/section/52"
          target="_blank"
        >
          Tribunals, Courts and Enforcement Act 2007.
        </a>
      </p>

      <template v-if="isApplicationVersionGreaterThan2 && isAppointment">
        <CheckboxItem
          value="judicial-functions"
          label="The carrying-out of judicial functions of any court or tribunal"
        >
          <Select
            id="judicial-functions-type"
            v-model="localJudicialFunctions.type"
            label="Is this a judicial or quasi-judicial post?"
            hint="Quasi-judicial refers to a role similar to that of a judge, such as the chair of an equivalent body for which a legal qualification is required. An equivalent body is one of a quasi-judicial nature for which the powers and procedures should resemble those of a court of law and involve highly complex matters, requiring its members objectively to determine the facts and draw conclusions to reach a reasoned decision. Such decisions could result in the imposition of a penalty, and they are likely to affect the legal rights, duties or privileges of specific parties. Examples could include, but are not restricted to, disciplinary tribunals and conduct hearings for professional standards bodies, the parole board, arbitration and chairs of statutory inquiries."
            required
          >
            <option
              v-for="option in ['judicial-post', 'quasi-judicial-post']"
              :key="option"
              :value="option"
            >
              {{ $filters.lookup(option) }}
            </option>
          </Select>

          <TextField
            id="judicial-functions-duration"
            v-model="localJudicialFunctions.duration"
            type="non-negative-number"
            label="How many sitting days have you accumulated in this post?"
            hint="Only numerical digits can be input into the sitting days field. If the number of days is 100 or more, an approximate figure will suffice."
            required
          />

          <Select
            id="judicial-functions-is-legal-qualification-required"
            v-model="localJudicialFunctions.isLegalQualificationRequired"
            label="Is a legal qualification a requisite for appointment?"
            required
          >
            <option
              v-for="option in [true, false]"
              :key="option"
              :value="option"
            >
              {{ $filters.lookup(option.toString()) }}
            </option>
          </Select>

          <TextareaInput
            v-if="localJudicialFunctions.type === 'quasi-judicial-post'"
            id="judicial-functions-details"
            v-model="localJudicialFunctions.details"
            label="Please outline the powers, procedures and main responsibilities"
          />
        </CheckboxItem>
      </template>
      <template v-else>
        <CheckboxItem
          value="judicial-functions"
          label="The carrying-out of judicial functions of any court or tribunal"
        />
      </template>

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
import CheckboxItem from '@/components/Form/CheckboxItem.vue';
import CheckboxGroup from '@/components/Form/CheckboxGroup.vue';
import Select from '@jac-uk/jac-kit/draftComponents/Form/Select.vue';
import TextField from '@/components/Form/TextField.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import FormFieldError from '@/components/Form/FormFieldError.vue';
import FormField from '@/components/Form/FormField.vue';
import { updateLangToTextNode } from '@/helpers/language';
import { isApplicationVersionGreaterThan } from '@/helpers/exerciseHelper';

export default {
  name: 'LawRelatedTasks',
  components: {
    CheckboxItem,
    CheckboxGroup,
    Select,
    TextField,
    TextareaInput,
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
    showtaskDetails: {
      required: false,
      type: Boolean,
      default: () => false,
    },
    otherTasks: {
      type: String,
      default: '',
      required: true,
    },
    taskDetails: {
      type: Object,
      default: () => {},
      required: false,
    },
    judicialFunctions: {
      type: Object,
      default: () => {},
      required: false,
    },
    isAppointment: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  emits: ['update:tasks', 'update:otherTasks', 'update:taskDetails', 'update:judicialFunctions'],
  data() {
    return {
      localJudicialFunctions: { ...this.judicialFunctions },
      localTaskDetails: { ...this.taskDetails },
    };
  },
  computed: {
    hintText() {
      if (this.isAppointment) {
        return 'Select all tasks you do in this role.';
      } else {
        return 'If you were engaged in law related activities during this time, please select all the relevant tasks.';
      }
    },
    vacancy() {
      return this.$store.state.vacancy.record;
    },
    isApplicationVersionGreaterThan2() {
      return isApplicationVersionGreaterThan(this.vacancy, 2);
    },
    localTasks: {
      get() {
        return this.tasks;
      },
      set(val) {
        if (Array.isArray(val) && !val.includes('judicial-functions')) {
          this.localJudicialFunctions = {};
        }
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
    language() {
      return this.$store.state.application.language;
    },
  },
  watch: {
    localJudicialFunctions: {
      handler: function(after) {
        if (after.type === 'judicial-post') {
          after.details = ''; // reset details when judicial is selected
        }
        this.$emit('update:judicialFunctions', after);
      },
      deep: true,
    },
    localTaskDetails: {
      handler: function(after) {
        this.$emit('update:taskDetails', after);
      },
      deep: true,
    },
  },
  updated: async function() {
    setTimeout(() => {
      updateLangToTextNode(document.querySelector('#main-content'), this.language);
    }, 100);
  },
  methods: {
    validate() {
      this.setError('');
      if (this.localTasks) {
        if (this.required && this.localTasks.length === 0) {
          this.setError('Select at least one task you do in this role');
        }
      }
    },
  },
};
</script>
