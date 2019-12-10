{% extends "layout_unbranded.html" %}

{% block pageTitle %}
Add new exercise
{% endblock %}

{% block content %}

<div class="govuk-width-container">

  {% include "includes/header.html" %}

  <!--MAIN WRAPPER-->
  <main class="govuk-main-wrapper">


    <!--PAGE TITLE-->
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-full" style="text-align:right">
        <p class="govuk-body"><a href="#">Sign out</a></p>
      </div>
    </div>

    <div class="govuk-grid-row">

      <!--SIDE NAV-->
      <div class="govuk-grid-column-one-quarter">
        <ul class="dwp-vertical-navigation">
          <li>
            <a aria-current="page" href="tab-applications?current=tab-applications">
              Applications
            </a>
          </li>
          <li>
            <a href="tab-personal-details?current=tab-personal-details">
              Personal details
            </a>
          </li>
          <li>
            <a href="tab-diversity?current=tab-diversity">
              Diversity information
            </a>
          </li>
          <li>
            <a href="tab-character?current=tab-character">
              Character information
            </a>
          </li>
        </ul>
      </div>

      <div class="govuk-grid-column-three-quarters">

        <!--HEADER-->
        <h1 class="govuk-heading-xl">Applications</h1>

        <!--GREY PANEL-->
        <h2 class="govuk-heading-m">Current applications</h2>
        <div class="govuk-panel--s govuk-panel--grey">
          <p class="govuk-body-l">114 Judge of the First-tier Tribunal for England and
            Wales</p>
          <p class="govuk-body"><a href="#">Continue with
              application</a></p>
        </div>
        <br><br>

        <h2 class="govuk-heading-m">Previous applications</h2>
        <!--TABLE-->
        <table class="govuk-table">
          <tr class="govuk-table__row">
            <td class="govuk-table__cell"><a href="../../apply-pre-shortlisting//v1-2-court/form-personal.html">086
                Circuit judge</a></td>
            <td class="govuk-table__cell">Closed 17 February 2018</td>
            <td class="govuk-table__cell">Selected</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell"><a href="../../apply-pre-shortlisting//v1-2-court/form-personal.html">086
                Recorder</a></td>
            <td class="govuk-table__cell">Closed 12 April 2017</td>
            <td class="govuk-table__cell">Not selected</td>
          </tr>
          </tbody>
        </table>

        <!--END MAIN WRAPPER-->
      </div>
    </div>
  </main>

  {% include "includes/footer.html" %}

</div>

{% endblock %}
