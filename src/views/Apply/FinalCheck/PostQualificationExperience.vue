<template>
  <div>
    <dl
      v-for="item in application.experience"
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
            <li>{{ item.orgBusinessName }}</li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Dates worked
        </dt>
        <dd class="govuk-summary-list__value">
          <ul
            v-if="item.startDate"
            class="govuk-list"
          >
            <li v-if="item.endDate">
              {{ item.startDate | formatDate }} to {{ item.endDate | formatDate }}
            </li>
            <li v-else>
              {{ item.startDate | formatDate }} — current
            </li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Law-related tasks
        </dt>
        <dd class="govuk-summary-list__value">
          <ul
            v-if="item.tasks && item.tasks.length"
            class="govuk-list"
          >
            <li
              v-for="task in item.tasks"
              :key="task.name"
            >
              {{ task.name }}
              <p class="govuk-body govuk-!-margin-bottom-0">
                {{ task | lookup }}
              </p>
              <p
                v-if="task == 'other'"
                class="govuk-body govuk-!-margin-bottom-0"
              >
                {{ item.otherTasks }}
              </p>
              <div
                v-if="task == 'judicial-functions' 
                  && item.judicialFunctions"
                class="govuk-body govuk-!-margin-bottom-0"
              >
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Legal Experience:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.legalExperience }}
                  </dd>
                </div>
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Date:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.date | formatDate }}
                  </dd>
                </div>
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Category of Law:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.categoryOfLaw }}
                  </dd>
                </div>
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Time engaged in this activity:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    <ul
                      class="govuk-list"
                    >
                      <li v-if="item.judicialFunctions.timeEngagedEnd">
                        {{ item.judicialFunctions.timeEngagedStart | formatDate }} to {{ item.judicialFunctions.timeEngagedEnd | formatDate }}
                      </li>
                      <li v-else>
                        {{ item.judicialFunctions.timeEngagedStart | formatDate }} — current
                      </li>
                    </ul>
                  </dd>
                </div>
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Judicial Office:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.judicialOffice | toYesNo }}
                  </dd>
                </div>
                <div 
                  v-if="item.judicialFunctions.judicialOffice"
                  class="govuk-summary-list__row"
                >
                  <dt class="govuk-summary-list__key">
                    Previous Judicial Office Type:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.judicialOfficeType }}
                  </dd>
                </div>
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Judicial Appointment Date:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.judicialAppointmentDate | formatDate }}
                  </dd>
                </div>
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Nature of Appointment:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.natureOfAppointment }}
                  </dd>
                </div>
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Circuit or Region:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.circuitOrRegion }}
                  </dd>
                </div>
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Jurisdiction:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.jurisdiction }}
                  </dd>
                </div>
                <div class="govuk-summary-list__row">
                  <dt class="govuk-summary-list__key">
                    Tribunal:
                  </dt>
                  <dd class="govuk-summary-list__value">
                    {{ item.judicialFunctions.tribunal }}
                  </dd>
                </div>
              </div>
              <hr>
            </li>
          </ul>
          <div v-else>
            No Answers provided
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    application: {
      type: Object,
      required: true,
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
  .change-link {
    float: right;
  }
</style>
