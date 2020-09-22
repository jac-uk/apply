<template>
  <div class="jac-scenario">
    <form
      ref="formRef"
      class="js-enabled"
      @submit.prevent="save"
    >
      <h1 
        class="govuk-heading-l"
      >
        {{ newScenario.title }}
      </h1>
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <div 
            class="govuk-character-count"
          >
            <TextareaInput
              id="scenario-question"
              v-model="response.text"
              :label="`${questionNumber}. ${question.answer}`"
              hint="Answer below:"
              rows="10"
              required
            />
            <div class="govuk-body">
              <span>{{ wordsCounter }}</span>
              <span>/</span>
              <span>{{ question.words }}</span>
              <span> words {{ reachMaxWords }}</span>
            </div>
          </div>

          <div class="moj-button-menu">
            <div class="moj-button-menu__wrapper">
              <button
                class="moj-button-menu__item govuk-button govuk-button--secondary govuk-!-margin-right-2"
                type="button"
                @click="skip"
              >
                Skip
              </button>
              <button class="moj-button-menu__item govuk-button">
                Save and continue
              </button>
            </div>
          </div>
        </div>

        <div class="govuk-grid-column-one-third">
          <div class="jac-scenario__additional">
            <dl ref="accordion">
              <dt 
                class="govuk-heading-m open"
                @click.prevent="clickAdditional(0)"
              >
                {{ newScenario.title }}
                <button>
                  <img 
                    src="@/assets/plus.png" 
                  >
                </button>
              </dt>
              <dd>{{ newScenario.details }}</dd>
              <span 
                v-for="(additional, index) of newScenario.additional"
                :key="index"
                :class="{closed: additional.active}"
              >
                <dt 
                  class="govuk-heading-m close"
                  @click.prevent="clickAdditional(index + 1)"
                >
                  {{ additional.title }}
                  <button>
                    <img 
                      src="@/assets/plus.png"
                    >
                  </button>
                </dt>
                <dd>{{ additional.content }}</dd>
              </span>
            </dl>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TextareaInput from '@/components/Form/TextareaInput';
import { QUALIFYING_TEST } from '@/helpers/constants';

export default {
  components: {
    TextareaInput,
  },
  data() {
    const scenarioNumber = this.$route.params.scenarioNumber;
    // eslint-disable-next-line no-console
    console.log('scenarioNumber', scenarioNumber);
    const questionNumber = this.$route.params.questionNumber;
    
    const qualifyingTestResponse = this.$store.getters['qualifyingTestResponse/data']();

    // const scenario = qualifyingTestResponse.testQuestions.questions[scenarioNumber - 1];
    const scenario = {
      'details': "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
      'options': [
        { 'answer': 'Do you agree with Question 1?' },
        { 'answer': 'Expand for question 2' },
      ],
      'responses': [
        {
          'completed': 1600691961483,
          'started': 1600691937286,
          'text': 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old to write some more words until it reaches 39.',
        },
        {
          'completed': null,
          'started': 1600702668088,
          'text': null,
        },
      ],
    };

    if (!scenario.responses) {
      scenario.responses = new Array(scenario.options.length).fill().map(() => ({
        text: null,
        started: null,
        completed: null,
      }));
    }

    const response = scenario.responses[questionNumber - 1];

    return {
      qualifyingTestResponse,
      scenario,
      response,
      showDetails: true,
    };
  },
  computed: {
    scenarioNumber() {
      return parseInt(this.$route.params.scenarioNumber);
    },
    questionNumber() {
      return parseInt(this.$route.params.questionNumber);
    },
    isLastScenario() {
      return this.scenarioNumber === this.qualifyingTestResponse.testQuestions.questions.length;
    },
    isLastQuestion() {
      return this.questionNumber === this.scenario.options.length;
    },
    introduction() {
      return this.qualifyingTestResponse.qualifyingTest.questions.introduction;
    },
    newScenario() {
      return {
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mauris tellus, placerat id blandit et, pellentesque id nibh. Curabitur congue justo odio, ac aliquam urna efficitur vitae. Nam ullamcorper porta dui, sit amet gravida urna pulvinar sit amet. Pellentesque vulputate aliquam fermentum. Suspendisse ac magna sed sem ornare dignissim. Praesent mollis velit ut enim mollis, vitae congue sapien pretium. Donec sed lectus lacus.',
        title: 'The Language Scenario',
        additional: [
          {
            content: 'Additionl 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mauris tellus, placerat id blandit et, pellentesque id nibh. Curabitur congue justo odio, ac aliquam urna efficitur vitae. Nam ullamcorper porta dui, sit amet gravida urna pulvinar sit amet. Pellentesque vulputate aliquam fermentum. Suspendisse ac magna sed sem ornare dignissim. Praesent mollis velit ut enim mollis, vitae congue sapien pretium. Donec sed lectus lacus.',
            title: 'Additional Material 1',
          },
          {
            content: 'Additionl 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mauris tellus, placerat id blandit et, pellentesque id nibh. Curabitur congue justo odio, ac aliquam urna efficitur vitae. Nam ullamcorper porta dui, sit amet gravida urna pulvinar sit amet. Pellentesque vulputate aliquam fermentum. Suspendisse ac magna sed sem ornare dignissim. Praesent mollis velit ut enim mollis, vitae congue sapien pretium. Donec sed lectus lacus.',
            title: 'Additional Material 2',
          },
        ],
      };
    },
    question() {
      // return this.scenario.options[this.questionNumber - 1].answer;
      // questions
      return {
        answer: 'What does Lord Thomas think about the length of time it took to enact the Law Reform(Miscelaneous Provisions) Act 1934?',
        words: 230,
      };
    },
    nextPage() {
      if (this.isLastScenario && this.isLastQuestion) {
        return {
          name: 'qualifying-test-review',
        };
      }

      return {
        name: 'qualifying-test-scenario',
        params: {
          scenarioNumber: this.isLastQuestion ? this.scenarioNumber + 1 : this.scenarioNumber,
          questionNumber: this.isLastQuestion ? 1 : this.questionNumber + 1,
        },
      };
    },
    wordsCounter() {
      let content = this.response.text;
      if (content === '' || content === null) {
        return 0;
      }
      content = content.trim().split(/[\s]+/);
      const words = content.length;
      return words;
    },
    reachMaxWords () {
      const maxWords = this.question.words;
      const reachedMaxWords = this.wordsCounter > maxWords;
      return reachedMaxWords;
    },
  },
  created() {
    if (this.qualifyingTestResponse.qualifyingTest.type !== QUALIFYING_TEST.TYPE.SCENARIO) {
      return this.$router.replace({ name: 'qualifying-tests' });
    }

    this.response.started = Date.now();
  },
  methods: {
    toggleAccordion() {
      this.showDetails = !this.showDetails;
    },
    async skip() {
      await this.$store.dispatch('qualifyingTestResponse/save', this.qualifyingTestResponse);

      this.$router.push(this.nextPage);
    },
    async save() {
      this.response.completed = Date.now();

      await this.$store.dispatch('qualifyingTestResponse/save', this.qualifyingTestResponse);

      this.$router.push(this.nextPage);
    },
    clickAdditional(index) {
      const elList = this.$refs.accordion.querySelectorAll('dt');
      elList.forEach((item, i) => {
        item.classList.remove('open');   
        item.classList.add('close');
        if (index === i) {
          item.classList.remove('close');   
          item.classList.add('open');
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>

.jac-scenario__additional {
  border: 1px solid silver;
}

.jac-scenario__additional dl {
  padding: 0;
  margin: 0;
}

.jac-scenario__additional dt {
  padding: 15px 20px 10px 20px;
  margin: 0;
  border-bottom: 1px solid silver;
  color: #1d70b8;
  position: relative;
  cursor: pointer;
}

.jac-scenario__additional dt.open + dd {
  display: block;
}

.jac-scenario__additional dt.close + dd {
  display: none;
}

.jac-scenario__additional dt button {
  padding: 0;
  position: absolute;
  top: 20px;
  right: 10px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

.jac-scenario__additional dt button img {
  width: 50%;
}

.jac-scenario__additional dd {
  padding: 20px;
  margin: 0;
  border-bottom: 1px solid silver;
}

</style>
