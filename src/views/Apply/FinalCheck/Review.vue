<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-full">
        <h1 class="govuk-heading-xl">
          Review your application
        </h1>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Personal details
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'personal-details'}"
          >
            Change
          </router-link>
        </div>

        <dl class="govuk-summary-list">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Full name
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Email address
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Date of birth
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              NI Number
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Citizenship
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>
        </dl>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Character information
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'character-information'}"
          >
            Change
          </router-link>
        </div>

        <dl class="govuk-summary-list">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been cautioned or convicted of a criminal offence
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Received a non-motoring penalty notice
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been disqualified from driving, or convicted for driving under the influence of drink or drugs
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Have any endorsements on your licence, or received any motoring fixed-penalty notices
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been declared bankrupt
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Filed late tax returns or been fined my HMRC
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been subject to professional negligence, wrongful dismissal, discrimination or harassment proceedings
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been subject to complaints or disciplinary action, or been asked to resign from a position
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Have any other issues that you think we should know about when considering your character
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>
        </dl>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Equality and diversity information
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'equality-and-diversity-survey'}"
          >
            Change
          </router-link>
        </div>

        <dl class="govuk-summary-list">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Ethnic group
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Religion or faith are you
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Gender
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Changed gender
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Been declared bankrupt
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Sexual orientation
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Disability
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Attended state or fee-paying school
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Attended Oxbridge universities
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              First generation to go to university
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Professional background
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Current legal role
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Fee-paid judicial role experience
            </dt>
            <dd class="govuk-summary-list__value">
              ... goes here
            </dd>
          </div>
        </dl>

        <div
          v-if="unknownVariable !== 'non-legal'"
          class="govuk-!-margin-top-9"
        >
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Qualifications
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'relevant-qualifications'}"
          >
            Change
          </router-link>
        </div>

        <dl
          v-for="item in qualifications"
          :key="item.name"
          class="govuk-summary-list govuk-!-margin-bottom-8"
        >
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Qualification
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.type }}</li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Location
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.location }}</li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Date qualified
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.date }}</li>
              </ul>
            </dd>
          </div>
        </dl>

        <div
          v-if="unknownVariable === 'non-legal'"
          class="govuk-!-margin-top-9"
        >
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Memberships
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'relevant-qualifications'}"
          >
            Change
          </router-link>
        </div>

        <dl
          class="govuk-summary-list govuk-!-margin-bottom-8"
        >
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Memberships
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list govuk-list--bullet">
                <li
                  v-for="item in memberships"
                  :key="item.name"
                >
                  {{ item }}
                </li>
              </ul>
            </dd>
          </div>
        </dl>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Post-qualification experience
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'post-qualification-work-experience'}"
          >
            Change
          </router-link>
        </div>

        <dl
          v-for="item in experience"
          :key="item.name"
          class="govuk-summary-list govuk-!-margin-bottom-8"
        >
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Job title
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.jobTitle }}</li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Organisation or business
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.buisness }}</li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Dates worked
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list">
                <li>{{ item.startDate }} to {{ item.endDate }}</li>
              </ul>
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Law-related tasks
            </dt>
            <dd class="govuk-summary-list__value">
              <ul class="govuk-list govuk-list--bullet">
                <li
                  v-for="task in item.tasks"
                  :key="task.name"
                >
                  {{ task }}
                </li>
              </ul>
            </dd>
          </div>
        </dl>

        <div class="govuk-!-margin-top-9">
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Independent assessors
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'assessors-details'}"
          >
            Change
          </router-link>
        </div>

        <dl class="govuk-summary-list">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Full name
            </dt>
            <dd class="govuk-summary-list__value">
              ...  Assessor 1's goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Email
            </dt>
            <dd class="govuk-summary-list__value">
              ... Assessor 1's goes here
            </dd>
          </div>

          <hr class="govuk-section-break govuk-section-break--xl">

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Full name
            </dt>
            <dd class="govuk-summary-list__value">
              ...  Assessor 2's goes here
            </dd>
          </div>

          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
              Email
            </dt>
            <dd class="govuk-summary-list__value">
              ... Assessor 2's goes here
            </dd>
          </div>
        </dl>

        <div
          v-if="unknownVariable !== 'non-legal' || unknownVariable !== 'leadership' "
          id="self-competencies-heading"
          class="govuk-!-margin-top-9"
        >
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            Self-assessment competencies
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: 'self-assessment-competencies'}"
          >
            Change
          </router-link>

          <dl class="govuk-summary-list govuk-!-margin-bottom-8">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">
                Finished statements
              </dt>
              <dd class="govuk-summary-list__value">
                <a
                  ref="templateDownloadLink"
                  class="govuk-link govuk-body-m"
                  href="#"
                >
                  fancy-judge-stuff.doc
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div
          v-if="unknownVariable === 'non-legal' || unknownVariable === 'leadership' "
          id="self-competencies-heading"
          class="govuk-!-margin-top-9"
        >
          <h2
            class="govuk-heading-l"
            style="display:inline-block;"
          >
            statement of suitability
          </h2>
          <router-link
            class="govuk-link govuk-body-m change-link"
            style="display:inline-block;"
            :to="{name: ''}"
          >
            Change
          </router-link>

          <dl class="govuk-summary-list govuk-!-margin-bottom-8">
            <div class="govuk-summary-list__row">
              <dd class="govuk-summary-list__value">
                <a
                  class="govuk-link govuk-body-m"
                  href="#"
                >
                  Upload CV
                </a>
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dd class="govuk-summary-list__value">
                <a
                  class="govuk-link govuk-body-m"
                  href="#"
                >
                  upload statement of suitability
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <button class="govuk-button">
          Send application
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      qualifications: [{ type: 'Developer 1', location: 'London', date: '25/10/2019' }, { type: 'Developer 2', location: 'London', date: '25/10/2020' }],
      experience: [{ jobTitle: 'Developer 1', buisness: 'London', startDate: '25/10/2019', endDate: '25/10/2020', tasks: ['Task1', 'Task2', 'Task3'] },
                   { jobTitle: 'Developer 2', buisness: 'London', startDate: '25/10/2021', endDate: '25/10/2022', tasks: ['Task1', 'Task2', 'Task3'] },
                   { jobTitle: 'Developer 3', buisness: 'London', startDate: '25/10/2023', endDate: '25/10/2024', tasks: ['Task1', 'Task2', 'Task3'] }],
      unknownVariable: null,
      memberships: ['Membership 1', 'Membership 2', 'Membership 3'],
    };
  },
};
</script>

<style lang="scss" scoped>
  .govuk-summary-list__value,
  .govuk-summary-list__value:last-child,
  .govuk-summary-list__key {
    @include govuk-media-query($from: tablet) {
      width: auto;
    }
  }

  .change-link {
    float: right;
  }
</style>
