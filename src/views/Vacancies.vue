<template>
  <div>
    <div class="govuk-grid-row">
      <div
        v-if="isSignedIn"
        class="govuk-grid-column-one-quarter"
      >
        <nav
          class="moj-side-navigation"
          aria-label="Side navigation"
        >
          <ul class="moj-side-navigation__list">
            <li
              class="moj-side-navigation__item"
              :class="this.$route.name === 'vacancies' ? 'moj-side-navigation__item--active' : null"
            >
              <RouterLink
                class="govuk-link info-link--nav-vacancies--vacancies"
                :aria-current="this.$route.name === 'vacancies' ? 'active' : null"
                :to="{ name: 'vacancies' }"
              >
                Vacancies
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-vacancies--applications"
                :to="{ name: 'applications' }"
              >
                Applications
              </RouterLink>
            </li>
            <li class="moj-side-navigation__item">
              <RouterLink
                class="govuk-link info-link--nav-vacancies--qualifying-tests"
                :to="{ name: 'qualifying-tests' }"
              >
                Online tests
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="govuk-!-padding-top-4"
        :class="{ 'govuk-grid-column-three-quarters': isSignedIn, 'govuk-grid-column-full': !isSignedIn }"
      >
        <div class="openApplicationsList">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-6 govuk-!-margin-top-6">
            Open for applications
          </h1>

          <p
            v-if="!openVacancies.length"
            class="govuk-body govuk-!-margin-bottom-6"
          >
            No open vacancies at the moment.
          </p>

          <ul
            v-else
            class="govuk-list"
          >
            <li
              v-for="vacancy in openVacancies"
              :key="vacancy.id"
              class="govuk-!-margin-top-4"
            >
              <div v-if="!vacancy.inviteOnly">
                <RouterLink
                  v-if="vacancy.aboutTheRole && !isAdvertTypeListing(vacancy.advertType)"
                  class="govuk-link govuk-heading-m govuk-!-font-weight-bold"
                  :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                >
                  {{ vacancy.name }}
                </RouterLink>

                <a
                  v-else-if="vacancy.externalLink"
                  class="govuk-link govuk-heading-m govuk-!-font-weight-bold"
                  :href="vacancy.externalLink"
                  target="_blank"
                >
                  {{ vacancy.name }}
                </a>

                <span
                  v-else
                  class="govuk-heading-m govuk-!-font-weight-bold"
                >
                  {{ vacancy.name }}
                </span>
                <p>
                  <span
                    class="govuk-body govuk-!-font-weight-bold"
                  >
                    <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
                  </span>
                  <span
                    v-if="vacancy.applicationOpenDate"
                    class="govuk-body"
                  >
                    {{ vacancy.applicationOpenDate | formatDate('datetime') }}
                  </span>
                  <span
                    v-else
                    class="govuk-body"
                  >
                    {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                  </span>
                </p>
                <p v-if="vacancy.applicationCloseDate">
                  <span
                    class="govuk-body govuk-!-font-weight-bold"
                  >
                    <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
                  </span>
                  <span
                    class="govuk-body"
                  >
                    {{ vacancy.applicationCloseDate | formatDate('datetime') }}
                  </span>
                </p>
                <CustomHTML
                  v-if="vacancy.roleSummary"
                  :value="vacancy.roleSummary"
                />
                <hr>
              </div>

              <div v-if="vacancy.welshPosts">
                <div v-if="!vacancy.inviteOnly">
                  <p>
                    <span
                      class="govuk-body govuk-!-font-weight-bold"
                    >
                      <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad lansio: </span>
                    </span>
                    <span
                      v-if="vacancy.applicationOpenDate"
                      class="govuk-body"
                    >
                      {{ vacancy.applicationOpenDate | formatDate('datetime') }}
                    </span>
                    <span
                      v-else
                      class="govuk-body"
                    >
                      {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                    </span>
                  </p>
                  <p v-if="vacancy.applicationCloseDate">
                    <span
                      class="govuk-body govuk-!-font-weight-bold"
                    >
                      <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad cau: </span>
                    </span>
                    <span
                      class="govuk-body"
                    >
                      {{ vacancy.applicationCloseDate | formatDate('datetime') }}
                    </span>
                  </p>
                  <CustomHTML
                    v-if="vacancy.roleSummaryWelsh"
                    :value="vacancy.roleSummaryWelsh"
                  />
                  <hr>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="futureApplicationsList">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-6 govuk-!-margin-top-6">
            Future applications
          </h1>

          <p
            v-if="!futureVacancies.length"
            class="govuk-body govuk-!-margin-bottom-6"
          >
            No future vacancies at the moment.
          </p>

          <ul
            v-else
            class="govuk-list"
          >
            <li
              v-for="vacancy in futureVacancies"
              :key="vacancy.id"
              class="govuk-!-margin-top-4"
            >
              <span class="govuk-heading-m govuk-!-font-weight-bold">{{ vacancy.name }}</span>
              <p>
                <span
                  class="govuk-body govuk-!-font-weight-bold"
                >
                  <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
                </span>
                <span
                  v-if="vacancy.applicationOpenDate"
                  class="govuk-body"
                >
                  {{ vacancy.applicationOpenDate | formatDate('datetime') }}
                </span>
                <span
                  v-else
                  class="govuk-body"
                >
                  {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                </span>
              </p>
              <CustomHTML
                v-if="vacancy.roleSummary"
                :value="vacancy.roleSummary"
              />
              <p
                v-if="vacancy.subscriberAlertsUrl"
                class="govuk-body govuk-!-margin-bottom-5"
              >
                <a
                  class="govuk-link govuk-body"
                  :href="vacancy.subscriberAlertsUrl"
                  target="_blank"
                >Sign up</a> for an alert about this exercise
              </p>
              <p>
                <RouterLink
                  v-if="vacancy.aboutTheRole"
                  class="govuk-link govuk-body"
                  :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                >
                  Find out more
                </RouterLink>

                <a
                  v-if="vacancy.externalLink"
                  class="govuk-link govuk-body"
                  :href="vacancy.externalLink"
                  target="_blank"
                >Find out more</a>
              </p>
              <hr>
              <div v-if="vacancy.welshPosts">
                <p>
                  <span
                    class="govuk-body govuk-!-font-weight-bold"
                  >
                    <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad lansio: </span>
                  </span>
                  <span
                    v-if="vacancy.applicationOpenDate"
                    class="govuk-body"
                  >
                    {{ vacancy.applicationOpenDate | formatDate('datetime') }}
                  </span>
                  <span
                    v-else
                    class="govuk-body"
                  >
                    {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                  </span>
                </p>
                <CustomHTML
                  v-if="vacancy.roleSummaryWelsh"
                  :value="vacancy.roleSummaryWelsh"
                />
                <p
                  v-if="vacancy.subscriberAlertsUrl"
                  class="govuk-body govuk-!-margin-bottom-5"
                >
                  <a
                    class="govuk-link govuk-body"
                    :href="vacancy.subscriberAlertsUrl"
                    target="_blank"
                  >Ymunwch</a> os ydych am gael rhybudd am y swyddi uchod
                </p>
                <p>
                  <RouterLink
                    v-if="vacancy.aboutTheRole"
                    class="govuk-link govuk-body"
                    :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                  >
                    I ddarganfod mwy
                  </RouterLink>

                  <a
                    v-if="vacancy.externalLink"
                    class="govuk-link govuk-body"
                    :href="vacancy.externalLink"
                    target="_blank"
                  >I ddarganfod mwy</a>
                </p>
                <hr>
              </div>
            </li>
          </ul>
        </div>

        <div class="inProgressApplicationsList">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-6">
            Closed for applications
          </h1>

          <ul class="govuk-list">
            <li
              v-for="vacancy in inProgressVacancies"
              :key="vacancy.id"
              class="govuk-!-margin-top-4"
            >
              <span class="govuk-heading-m govuk-!-font-weight-bold">{{ vacancy.name }}</span>
              <p>
                <span
                  class="govuk-body govuk-!-font-weight-bold"
                >
                  <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
                </span>
                <span
                  v-if="vacancy.applicationOpenDate"
                  class="govuk-body"
                >
                  {{ vacancy.applicationOpenDate | formatDate('datetime') }}
                </span>
                <span
                  v-else
                  class="govuk-body"
                >
                  {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                </span>
              </p>
              <p v-if="vacancy.applicationCloseDate">
                <span
                  class="govuk-body govuk-!-font-weight-bold"
                >
                  <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
                </span>
                <span
                  class="govuk-body"
                >
                  {{ vacancy.applicationCloseDate | formatDate('datetime') }}
                </span>
              </p>
              <CustomHTML
                v-if="vacancy.roleSummary"
                :value="vacancy.roleSummary"
              />
              <p>
                <RouterLink
                  v-if="vacancy.aboutTheRole"
                  class="govuk-link govuk-body"
                  :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                >
                  Find out more
                </RouterLink>

                <a
                  v-if="vacancy.externalLink"
                  class="govuk-link govuk-body"
                  :href="vacancy.externalLink"
                  target="_blank"
                >Find out more</a>
              </p>
              <hr class="govuk-section-break govuk-section-break--visible">

              <div v-if="vacancy.welshPosts">
                <p>
                  <span
                    class="govuk-body govuk-!-font-weight-bold"
                  >
                    <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad lansio: </span>
                  </span>
                  <span
                    v-if="vacancy.applicationOpenDate"
                    class="govuk-body"
                  >
                    {{ vacancy.applicationOpenDate | formatDate('datetime') }}
                  </span>
                  <span
                    v-else
                    class="govuk-body"
                  >
                    {{ vacancy.estimatedLaunchDate | formatEstimatedDate }}
                  </span>
                </p>
                <p v-if="vacancy.applicationCloseDate">
                  <span
                    class="govuk-body govuk-!-font-weight-bold"
                  >
                    <span class="govuk-body govuk-!-font-weight-bold"> Dyddiad cau: </span>
                  </span>
                  <span
                    class="govuk-body"
                  >
                    {{ vacancy.applicationCloseDate | formatDate('datetime') }}
                  </span>
                </p>

                <CustomHTML
                  v-if="vacancy.roleSummaryWelsh"
                  :value="vacancy.roleSummaryWelsh"
                />
                <p>
                  <RouterLink
                    v-if="vacancy.aboutTheRole"
                    class="govuk-link govuk-body"
                    :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
                  >
                    I ddarganfod mwy
                  </RouterLink>

                  <a
                    v-if="vacancy.externalLink"
                    class="govuk-link govuk-body"
                    :href="vacancy.externalLink"
                    target="_blank"
                  >I ddarganfod mwy</a>
                </p>
                <hr class="govuk-section-break govuk-section-break--visible">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ADVERT_TYPES } from '@/helpers/constants';
import CustomHTML from '@/components/CustomHTML';

export default {
  components: {
    CustomHTML,
  },
  computed: {
    ...mapGetters('vacancies', [
      'openVacancies',
      'inProgressVacancies',
      'futureVacancies',
    ]),
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
  },
  created() {
    this.$store.dispatch('vacancies/bind');
  },
  methods: {
    isAdvertTypeListing(value) {
      const returnValue = value && value === ADVERT_TYPES.LISTING;
      return returnValue;
    },
  },
};
</script>
