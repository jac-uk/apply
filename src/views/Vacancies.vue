<template>
  <div>
    <div class="govuk-grid-row">
      <div
        v-if="isSignedIn"
        class="govuk-grid-column-one-quarter"
      >
        <ul class="dwp-vertical-navigation">
          <li>
            <RouterLink
              class="govuk-link"
              aria-current="page"
              :to="{ name: 'vacancies' }"
            >
              Vacancies
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="govuk-link"
              :to="{ name: 'applications' }"
            >
              Applications
            </RouterLink>
          </li>
          <!-- <li>
    <RouterLink
    class="govuk-link"
    :to="{ name: 'personal-details' }"
    >
    Personal Details
  </RouterLink>
</li>
<li>
<RouterLink
class="govuk-link"
:to="{ name: 'diversity-information' }"
>
Diversity Information
</RouterLink>
</li>
<li>
<RouterLink
class="govuk-link"
:to="{ name: 'character-information' }"
>
Character Information
</RouterLink>
</li> -->
        </ul>
      </div>

      <div :class="{ 'govuk-grid-column-three-quarters': isSignedIn, 'govuk-grid-column-full': !isSignedIn }">
        <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
          Open vacancies
        </h1>
        <ul class="govuk-list">
          <!-- <li

      class="govuk-!-margin-top-7"
      >
      <a
      class="govuk-link govuk-heading-m govuk-!-font-weight-bold"
      href="https://www.judicialappointments.gov.uk/vacancies/151"
      >
      Deputy Chairman of the Agricultural Land Tribunal for Wales
    </a>

    <p>
      <span
      class="govuk-body govuk-!-font-weight-bold"
      >
      <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
    </span>
    <span
    class="govuk-body"
    >
    28 October 2019 - 13:00
  </span>
</p>
<p>
  <span
  class="govuk-body govuk-!-font-weight-bold"
  >
  <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
</span>
<span
class="govuk-body"
>
28 November 2019 - 13:00
</span>
</p>
<p> Insert a Summary about the role - This advert is on Jars</p>

<p class="govuk-body govuk-!-margin-bottom-7">
  <a
  class="govuk-link govuk-body"
  href="#"
  >
  Sign up
</a>
for an alert about this exercise
</p>
<hr>
</li> -->

          <li
            v-for="vacancy in records"
            :key="vacancy.id"
            class="govuk-!-margin-top-7"
          >
            <RouterLink
              v-if="vacancy.aboutTheRole"
              class="govuk-link govuk-heading-m govuk-!-font-weight-bold"
              :to="{ name: 'vacancy-details', params: { id: vacancy.id } }"
            >
              {{ vacancy.name }}
            </RouterLink>

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
                {{ vacancy.applicationOpenDate | dateFormatter }} - 13:00
              </span>
              <span
                v-else
                class="govuk-body"
              >
                {{ vacancy.estimatedLaunchDate | dateFormatter('month') }}
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
                {{ vacancy.applicationCloseDate | dateFormatter }} - 13:00
              </span>
            </p>
            <p>{{ vacancy.roleSummary }}</p>
            <p
              v-if="showSignUp(vacancy)"
              class="govuk-body govuk-!-margin-bottom-7"
            >
              <a
                class="govuk-link govuk-body"
                :href="vacancy.subscriberAlertsUrl"
                target="_blank"
              >Sign up</a> for an alert about this exercise
            </p>
            <hr>
          </li>
        </ul>

        <div class="futureApplicationsList">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
            Future applications
          </h1>

          <ul class="govuk-list">
            <li class="govuk-!-margin-top-7">
              <span class="govuk-heading-m govuk-!-font-weight-bold">
                Fee-paid Financially Qualified Tribunal Member of the First-tier Tribunal, Social Entitlement Chamber, (SEC) Social Security and Child Support (SSCS) jurisdiction
              </span>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body"> 24 March 2020 at 13:00
                </span>
              </p>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span class="govuk-body"> 7 April 2020 at 13:00</span>
              </p>
              <p>
                <a
                  class="govuk-link govuk-body"
                  href="https://www.judicialappointments.gov.uk/vacancies/162"
                  target="_blank"
                >Find out more</a>
              </p>
            </li>
            <hr>
            <li class="govuk-!-margin-top-7">
              <span class="govuk-heading-m govuk-!-font-weight-bold">
                Judge of the First-tier Tribunal
              </span>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body"> 31 March 2020 at 13:00
                </span>
              </p>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span class="govuk-body"> 14 April 2020 at 13:00</span>
              </p>
              <p>
                <a
                  class="govuk-link govuk-body"
                  href="https://www.judicialappointments.gov.uk/vacancies/157"
                  target="_blank"
                >Find out more</a>
              </p>
              <hr>
            </li><li class="govuk-!-margin-top-7">
              <hr>

              <span class="govuk-heading-m govuk-!-font-weight-bold">
                Fee Paid Specialist Lay Members of the First-tier Tribunal Health,
                Education and Social Care (HESC) and Mental Health Review Tribunal
                for Wales (MHRT)
              </span>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body"> 26 March 2020 at 13:00
                </span>
              </p>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span class="govuk-body"> 9 April 2020 at 13:00</span>
              </p>
              <p>
                <a
                  class="govuk-link govuk-body"
                  href="https://www.judicialappointments.gov.uk/vacancies/159"
                  target="_blank"
                >Find out more</a>
              </p>
            </li>
            <hr>
            <li class="govuk-!-margin-top-7">
              <span class="govuk-heading-m govuk-!-font-weight-bold">
                Fee-paid Legal Members Mental Health Review Tribunal Wales
              </span>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body"> 20 February 2020
                </span>
              </p>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span class="govuk-body"> 5 March 2020 at 13:00</span>
              </p>
              <p>
                <a
                  class="govuk-link govuk-body"
                  href="https://www.judicialappointments.gov.uk/vacancies/161"
                  target="_blank"
                >Find out more</a>
              </p>
            </li>
            <hr>

            <li class="govuk-!-margin-top-7">
              <span class="govuk-heading-m govuk-!-font-weight-bold"> Chancery Master
              </span>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body">  13 February 2020 at 13:00
                </span>
              </p>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span class="govuk-body">   27 February 2020 at 13:00</span>
              </p><p>
                <a

                  class="govuk-link govuk-body"
                  href="https://www.judicialappointments.gov.uk/vacancies/182"
                  target="_blank"
                >Find out more</a>
              </p>
            </li>
            <hr>

            <li class="govuk-!-margin-top-7">
              <span class="govuk-heading-m govuk-!-font-weight-bold"> Deputy Chancery Masters
              </span>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body">  13 February 2020 at 13:00
                </span>
              </p>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span class="govuk-body">   27 February 2020 at 13:00</span>
              </p><p>
                <a
                  class="govuk-link govuk-body"
                  href="https://www.judicialappointments.gov.uk/vacancies/181"
                  target="_blank"
                >Find out more</a>
              </p>
            </li>
            <hr>

            <li class="govuk-!-margin-top-7">
              <span class="govuk-heading-m govuk-!-font-weight-bold"> Specialist Civil Circuit Judge
              </span>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body">  21 January 2020 at 13:00
                </span>
              </p>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span class="govuk-body">   4 February 2020 at 13:00</span>
              </p><p>
                <a
                  class="govuk-link govuk-body"
                  href="https://www.judicialappointments.gov.uk/vacancies/179"
                  target="_blank"
                >Find out more</a>
              </p>
            </li>
            <hr>

            <li class="govuk-!-margin-top-7">
              <span class="govuk-heading-m govuk-!-font-weight-bold">
                Fee-paid Disability Qualified Tribunal Member of the First-tier Tribunal Social Entitlement Chamber
              </span>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body"> 11 March 2020 at 13:00</span>
              </p><p>
                <a
                  class="govuk-link govuk-body"
                  href="https://www.judicialappointments.gov.uk/vacancies/156"
                  target="_blank"
                >Find out more</a>
              </p>
            </li>
            <hr>

            <li class="govuk-!-margin-top-7">
              <span class="govuk-heading-m govuk-!-font-weight-bold"> Senior Circuit Judge, Designated Family Judge
              </span>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body">  21 January 2020 at 13:00
                </span>
              </p>
              <p>
                <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span class="govuk-body">   4 February 2020 at 13:00</span>
              </p><p>
                <a
                  class="govuk-link govuk-body"
                  href="https://www.judicialappointments.gov.uk/vacancies/178"
                  target="_blank"
                >Find out more</a>
              </p>
            </li>
            <hr>
          </ul>
        </div>
      </div>

      <div class="inProgressApplicationsList">
        <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
          Exercises in progress
        </h1>

        <ul class="govuk-list">
          <li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold"> Circuit Judge 2020
            </span>
            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span class="govuk-body">  25 February 2020 at 13:00
              </span>
            </p>
            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span class="govuk-body">   17 March 2020 at 13:00</span>
            </p><p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/155"
                target="_blank"
              >Find out more</a>
            </p>
          </li>
          <hr>

          <li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Deputy District Judge (Civil)
            </span>
            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
              <span>20 March 2019</span>
            </p>

            <p><span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span> 3 April 2019 </span></p><p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/116"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li>
          <li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Fee-paid Judge of the First-tier Tribunal and Fee-paid Judge of the Employment Tribunal for England and Wales
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
              <span>  15 August 2019 at 13:00 </span>
            </p>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span> 5 September 2019 at 13:00</span>
            </p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/114"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li>
          <li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">

              Recorder 2019
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span>  6 August 2019 at 13:00 </span>
            </p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/133"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">

              Fee-Paid (Specialist Information Rights) Member of the Upper Tribunal assigned to the Administrative Appeals Chamber and First-tier Tribunal General Regulatory Chamber (Information Rights) jurisdiction
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
              <span>  15 August 2019 at 13:00 </span>
            </p>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
              <span> 5 September 2019 at 13:00 </span>
            </p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/140"
                target="_blank"
              >Find out more
              </a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">

              Chair of the Valuation Tribunal for England
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
              <span>  3 September 2019 at 13:00 </span>
            </p>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date:</span>
              <span> 17 September 2019 at 13:00</span>
            </p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/143"
                target="_blank"
              >Find out more
              </a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">

              Regional Employment Judge
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span>  26 September 2019 at 13:00
              </span>
            </p><p><span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span> 10 October 2019 at 13:00 </span></p><p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/139"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Senior Circuit Judge, Designated Civil Judge
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span>  10 October 2019 at 13:00 </span>
            </p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/177"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Fee-paid Appointed Person, Appeal Tribunal, Trade Marks and Fee-paid Appointed Person, Appeal Tribunal, Registered and Unregistered Design
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span>  16 October 2019 at 13:00 </span>
            </p><p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/142"
                target="_blank"
              >
                Find out more
              </a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">

              Chamber President of the First-tier Tribunal, Health, Education and Social Care Chamber
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span>  2 October 2019
              </span>
            </p>
            <p><span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span> 16 October 2019 </span></p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/183"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">

              s9(1) Authorisation to act as a High Court Judge
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span>  16 October 2019 at 13:00 </span>
            </p><p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/144"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">

              Fee-paid Education Panel Members for the Special Educational Needs Tribunal for Wales (SENTW)
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span>  29 October 2019 at 13:00 </span>
            </p><p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/174"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              District Judge
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span>  30 October 2019 at 13:00 </span>
            </p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/145"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Deputy Queens Bench Master
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
              <span>  14 November 2019 at 13:00 </span>
            </p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/153"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Senior Circuit Judge, Resident Judge
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span>  20 November 2019 at 13:00 </span>
            </p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/176"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              High Court Judge
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span><span>  Early October 2019
              </span>
            </p>
            <p><span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span> 26 November 2019 at 13:00 </span></p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/149"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Fee-paid Medical Members, First-tier Tribunal, Social Entitlement Chamber (Social Security and Child Support)
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span>  27 November 2019 at 13:00 </span>
            </p>
            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/148"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Fee-paid Medical Members First-tier Tribunal, Health, Education and Social Care Chamber (Mental Health)
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
              <span>  13 November 2019 at 13:00</span>
            </p>

            <p><span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span><span> 27 November 2019 at 13:00 </span></p>

            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/150"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Deputy Chairman of the Agricultural Land Tribunal for Wales
            </span>
            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
              <span>  14 November 2019 at 13:00 </span>
            </p>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
              <span> 28 November 2019 at 13:00 </span>
            </p>

            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/151"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Judge Advocate General
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Launch Date: </span>
              <span>19 November 2019</span>
            </p>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
              <span> 3 December 2019 at 13:00 </span>
            </p>

            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/147"
                target="_blank"
              >Find out more</a>
            </p>

            <hr>
          </li><li class="govuk-!-margin-top-7">
            <span class="govuk-heading-m govuk-!-font-weight-bold">
              Senior Circuit Judge of the Employment Appeal Tribunal
            </span>

            <p>
              <span class="govuk-body govuk-!-font-weight-bold"> Closing Date: </span>
              <span>  17 December 2019 at 13:00 </span>
            </p>

            <p>
              <a
                class="govuk-link govuk-body"
                href="https://www.judicialappointments.gov.uk/vacancies/184"
                target="_blank"
              >Find out more</a>
            </p>
            <hr>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  filters: {
    dateFormatter (date, type) {
      switch (type) {
      case 'month':
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getUTCFullYear()}`;
      default:
        return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
      }
    },
  },
  computed: {
    ...mapState('vacancies', [
      'records',
    ]),
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
  },
  created() {
    this.$store.dispatch('vacancies/bind');
  },
  methods: {
    showSignUp(vacancy) {
      if (vacancy.subscriberAlertsUrl) {
        if (vacancy.applicationOpenDate) {
          const today = new Date();
          return vacancy.applicationOpenDate > today;
        }
        return true;
      }
      return false;
    },
  },
};
</script>
