<template>
  <div class="govuk-grid-row">
    <form @submit.prevent="save">
      <div class="govuk-grid-column-full">

        <h1 class="govuk-heading-xl">
          Review your application
        </h1>

        <h2 class="govuk-heading-l">
          Personal details
        </h2>

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

        <h2 class="govuk-heading-l govuk-!-margin-top-9">
          Character information
        </h2>

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

        <h2 class="govuk-heading-l govuk-!-margin-top-9">
          Equality and diversity information
        </h2>

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

        <h2 class="govuk-heading-l"> Qualifications </h2>
        <dl class="govuk-summary-list">

          <ul class="govuk-list">
            <li v-for="item in qualifications" class="govuk-!-margin-bottom-8">

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Qualification
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>type</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Location
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>location</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Date qualified
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>Date</li>
                  </ul>
                </dd>
              </div>

            </li>
          </ul>
        </dl>

        <h2 class="govuk-heading-l"> Post-qualification experience </h2>
        <dl class="govuk-summary-list">

          <ul class="govuk-list">
            <li v-for="item in experience">

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Job title
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>job title</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Organisation or business
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>org/buisness</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Dates worked
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list">
                    <li>date to date</li>
                  </ul>
                </dd>
              </div>

              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">
                  Law-related tasks
                </dt>
                <dd class="govuk-summary-list__value">
                  <ul class="govuk-list govuk-list--bullet">
                    <li>task</li>
                    <li>task</li>
                    <li>task</li>
                  </ul>
                </dd>
              </div>
              <hr class="govuk-section-break govuk-section-break--l">

            </li>
          </ul>
        </dl>

      </dl>

      <h2 class="govuk-heading-l govuk-!-margin-top-9">
        Independent assessors
      </h2>

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

      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      qualifications: [1,2,],
      experience: [1,2,3],
    };
  },
  computed: {
    exercise() {

    },
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

  .govuk-summary-list__row {
    width: 100%;
  }


</style>
