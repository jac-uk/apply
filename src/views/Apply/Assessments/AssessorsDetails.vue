<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Independent assessors
        </h1>

        <ErrorSummary :errors="errors" />
        <WarningSummary :warningObject="warningObject" />

        <p class="govuk-body-l">
          Sometimes called 'referees', your independent assessors will give us
          their opinion on your suitability for this role.
        </p>

        <p class="govuk-body-l">
          You should read the
          <a
            class="govuk-link info-link--independend-assessor--guidance-on-choosing-independent-assessor"
            href="https://judicialappointments.gov.uk/independent-assessments"
            target="_blank"
          >
            guidance on choosing independent assessors
          </a>
          before making your nominations.
        </p>

        <details class="govuk-body-l">
          <summary style="cursor: pointer;">
            Who to choose?
          </summary>
          <div
            class="govuk-body"
            style="margin-top: 8px;"
          >
            <p>It is important that you choose the right assessor.</p>
            <ul>
              <li>if you are a salaried judicial office holder, you need 2 judicial assessors</li>
              <li>if you are a professional with one or more fee-paid judicial roles, you need one professional and one judicial assessor; the judicial assessor should be the judge who can provide examples most relevant to the role for which you are applying</li>
              <li>if you do not hold judicial office and you are employed, you will usually need 2 professional assessors, or for some exercises you can provide one professional and one personal assessor</li>
            </ul>

            <p>For <strong>judicial roles</strong> ideally you should choose someone from your current employment or who has knowledge of your work in a judicial or professional capacity. If you work or practice independently, you may wish to choose someone (such as a judge) who has seen you practice and can provide good examples of your skills in relation to the required competencies.</p>

            <p>A <u>professional assessor</u> could be:</p>
            <ul>
              <li>a senior partner or head of chambers</li>
              <li>a judicial office holder who can give examples of your professional work</li>
              <li>a client (including a local authority official) or a magistrate</li>
              <li>a line manager if you are from a non-legal background; if there is no line manager, then a current or former colleague or client</li>
            </ul>

            <p>A <u>judicial assessor</u> could be:</p>
            <ul>
              <li>the senior judge of the court, jurisdiction or circuit where you sit most often</li>
              <li>the Senior President or Lord President (Scotland) if you are a Chamber/Tribunal President</li>
              <li>the Lord Justice Clerk or Sheriff Principal if you are a Sheriff (Scotland only)</li>
              <li>your appraising judge if you sit on a tribunal</li>
            </ul>

            <p>If you are unable to provide one of the above, consider another judge who has first-hand knowledge of your work. If you are unable to provide any judicial assessor, please contact us giving your reasons writing.</p>
            <p><span>If you are applying for a non-legal role</span> you should choose assessors who know you well and who can give clear examples of your abilities.</p>

            <p>A <u>personal assessor</u> could be:</p>
            <ul>
              <li>a former colleague, manager or client who is familiar with the way you work</li>
              <li>someone for whom you do voluntary work</li>
            </ul>

            <p>If you have been on maternity leave or a career break, there is no time limit on how recently you have worked with your assessor, although where possible within the last 2 years is recommended so they can provide recent examples.</p>

            <p>Do not nominate:</p>
            <ul>
              <li>another individual who is applying for a role in the same exercise</li>
              <li>a JAC commissioner</li>
              <li>a relative (even if you work or have worked with them in a professional capacity)</li>
            </ul>
          </div>
        </details>

        <h2 class="govuk-heading-l">
          First independent assessor
        </h2>

        <Select
          id="first-assessor-type"
          v-model="formData.firstAssessorType"
          :value="formData.firstAssessorType"
          label="Assessor type"
          required
        >
          <option
            v-for="option in assessorTypes"
            :key="option"
            :value="option"
          >
            {{ $filters.lookup(option) }}
          </option>
        </Select>
        <TextField
          id="first-assessor-full-name"
          v-model="formData.firstAssessorFullName"
          label="Full name"
          required
        />
        <TextField
          id="first-assessor-title"
          v-model="formData.firstAssessorTitle"
          label="Title or position"
          required
        />
        <TextField
          id="first-assessor-email"
          v-model="formData.firstAssessorEmail"
          label="Email"
          type="email"
          :warnCPSEmailMsg="assessorEmailWarning"
          required
        />
        <TextField
          id="first-assessor-Phone"
          v-model="formData.firstAssessorPhone"
          label="Phone"
          type="tel"
          required
        />

        <h2 class="govuk-heading-l">
          Second independent assessor
        </h2>

        <Select
          id="second-assessor-type"
          v-model="formData.secondAssessorType"
          :value="formData.secondAssessorType"
          label="Assessor type"
          required
        >
          <option
            v-for="option in assessorTypes"
            :key="option"
            :value="option"
          >
            {{ $filters.lookup(option) }}
          </option>
        </Select>
        <TextField
          id="second-assessor-full-name"
          v-model="formData.secondAssessorFullName"
          label="Full name"
          required
        />
        <TextField
          id="second-assessor-title"
          v-model="formData.secondAssessorTitle"
          label="Title or position"
          required
        />
        <TextField
          id="second-assessor-email"
          v-model="formData.secondAssessorEmail"
          label="Email"
          type="email"
          :warnCPSEmail="assessorEmailWarning"
          required
        />
        <TextField
          id="second-assessor-Phone"
          v-model="formData.secondAssessorPhone"
          label="Phone"
          type="tel"
          required
        />

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--assessor-details--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import ErrorSummary from '@/components/Form/ErrorSummary.vue';
import WarningSummary from '@/components/Form/WarningSummary.vue';
import ApplyMixIn from '../ApplyMixIn';
import TextField from '@/components/Form/TextField.vue';
import BackLink from '@/components/BackLink.vue';
import Select from '@jac-uk/jac-kit/draftComponents/Form/Select.vue';
import { ASSESSOR_TYPES } from '@/helpers/constants';

export default {
  name: 'AssessorsDetails',
  components: {
    ErrorSummary,
    WarningSummary,
    TextField,
    BackLink,
    Select,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      firstAssessorType: null,
      firstAssessorFullName: null,
      firstAssessorTitle: null,
      firstAssessorEmail: null,
      firstAssessorPhone: null,
      secondAssessorType: null,
      secondAssessorFullName: null,
      secondAssessorTitle: null,
      secondAssessorEmail: null,
      secondAssessorPhone: null,
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    return {
      assessorTypes: Object.values(ASSESSOR_TYPES),
      formId: 'assessorsDetails',
      formData: formData,
    };
  },
  created() {
    this.assessorEmailWarning = 'Use of a CPS device causes multiple known issues with the JAC Digital Platform due to the device firewall settings - it is strongly recommended that a non-CPS email address is provided for Independent Assessors.';
  },
};
</script>

<style>
#first-assessor-type, #second-assessor-type {
  width: 100%;
}
</style>
