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
      />
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
import TextareaInput from '@/components/Form/TextareaInput';
import FormFieldError from '@/components/Form/FormFieldError';

export default {
  name: 'LawRelatedTasks',
  components: {
    CheckboxItem,
    CheckboxGroup,
    TextareaInput,
    FormFieldError,
  },
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
  data() {
    return {
      errorMessage: '',
    };
  },
  computed: {
    hasError() {
      return this.errorMessage ? true :  false;
    },
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
  mounted: function () {
    this.$root.$on('validate', this.validate);
  },
  beforeDestroy: function() {
    this.setError('');
    this.$root.$off('validate', this.validate);
  },
  methods: {
    setError(message) {
      this.errorMessage = message;
      this.$root.$emit('handle-error', { id: this.id, message: this.errorMessage });
    },
    validate() {
      this.setError('');
      if (this.required && this.localTasks.length === 0) {
        this.setError('Select at least one task you do in this role');
      }
    },
  },
};
</script>
