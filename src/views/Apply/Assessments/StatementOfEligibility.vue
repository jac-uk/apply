<template>
  <div class="govuk-grid-row">
    <form
      ref="formRef"
      @submit.prevent="save"
    >
      <div class="govuk-grid-column-two-thirds">
        <BackLink />
        <h1 class="govuk-heading-xl">
          Statement of eligibility
        </h1>

        <ErrorSummary :errors="errors" />

        <div v-if="vacancy.aSCApply && vacancy.selectionCriteria">
          <div
            v-for="(item, index) in formData.selectionCriteriaAnswers"
            :key="index"
          >
            <p
              class="govuk-heading-m govuk-!-font-weight-bold"
            >
              {{ item.title }}
            </p>
            <!-- eslint-disable -->
            <div
              class="govuk-body"
              v-html="item.text"
            />
            <!-- eslint-enable -->

            <RadioGroup
              :id="`meet_requirements_${index}`"
              v-model="item.answer"
              label="Do you meet this requirement?"
            >
              <RadioItem
                :value="true"
                label="Yes"
              >
                <TextareaInput
                  :id="`meet_requirements_details${index}`"
                  v-model="item.answerDetails"
                  :word-limit="250"
                  required
                />
              </RadioItem>
              <RadioItem
                :value="false"
                label="No"
              />
            </RadioGroup>
          </div>
        </div>

        <button
          :disabled="!canSave(formId)"
          class="govuk-button info-btn--statement-of-eligibility--save-and-continue"
        >
          Save and continue
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Form from '@/components/Form/Form';
import ErrorSummary from '@/components/Form/ErrorSummary';
import ApplyMixIn from '../ApplyMixIn';
import RadioGroup from '@/components/Form/RadioGroup';
import RadioItem from '@/components/Form/RadioItem';
import TextareaInput from '@/components/Form/TextareaInput';
import BackLink from '@/components/BackLink';

export default {
  components: {
    ErrorSummary,
    RadioGroup,
    RadioItem,
    TextareaInput,
    BackLink,
  },
  extends: Form,
  mixins: [ApplyMixIn],
  data(){
    const defaults = {
      selectionCriteriaAnswers: [],
      progress: {},
    };
    const data = this.$store.getters['application/data'](defaults);
    const formData = { ...defaults, ...data };
    if (formData.selectionCriteriaAnswers.length === 0) {
      const vacancy = this.$store.state.vacancy.record;
      if (vacancy && vacancy.aSCApply && vacancy.selectionCriteria) {
        for (let i = 0, len = vacancy.selectionCriteria.length; i < len; ++i) {
          formData.selectionCriteriaAnswers.push({
            title: vacancy.selectionCriteria[i].title,
            text: vacancy.selectionCriteria[i].text,
            answer: null,
            answerDetails: null,
          });
        }
      }
    }
    return {
      formId: 'statementOfEligibility',
      formData: formData,
    };
  },
};
</script>
