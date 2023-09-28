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
        <Select
          id="judicial-functions-type"
          v-model="localJudicialFunctions.type"
          label="Is this a judicial or quasi-judicial post?"
          required
        >
          <option
            v-for="option in ['judicial-post', 'quasi-judicial-post']"
            :key="option"
            :value="$filters.lookup(option)"
          >
            {{ $filters.lookup(option) }}
          </option>
        </Select>

        <TextField
          id="judicial-functions-duration"
          v-model="localJudicialFunctions.duration"
          type="number"
          label="How many days have you sat in this role/post (excluding training and/or sick days)?"
          required
        />

        <Select
          id="judicial-functions-is-legal-qualification"
          v-model="localJudicialFunctions.isLegalQualification"
          label="Is a legal qualification a requisite for appointment?"
          required
        >
          <option
            v-for="option in ['true', 'false']"
            :key="option"
            :value="$filters.lookup(option)"
          >
            {{ $filters.lookup(option) }}
          </option>
        </Select>

        <TextareaInput
          id="judicial-functions-details"
          v-model="localJudicialFunctions.details"
          label="Please outline the powers, procedures and main responsibilities"
        />
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
import CheckboxItem from '@/components/Form/CheckboxItem.vue';
import CheckboxGroup from '@/components/Form/CheckboxGroup.vue';
import Select from '@jac-uk/jac-kit/draftComponents/Form/Select.vue';
import TextField from '@/components/Form/TextField.vue';
import TextareaInput from '@/components/Form/TextareaInput.vue';
import FormFieldError from '@/components/Form/FormFieldError.vue';
import FormField from '@/components/Form/FormField.vue';
import { updateLangToTextNode } from '@/helpers/language';

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
  },
  emits: ['update:tasks', 'update:otherTasks', 'update:taskDetails', 'update:judicialFunctions'],
  data() {
    return {
      localJudicialFunctions: { ...this.judicialFunctions },
      localTaskDetails: { ...this.taskDetails },
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
    language() {
      return this.$store.state.application.language;
    },
  },
  watch: {
    localJudicialFunctions: {
      handler: function(after) {
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
