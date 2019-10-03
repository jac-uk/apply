<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">
        092 Registrar of Criminal Appeals, Master of the Crown Office and Queen’s Coroner &amp;
        Attorney
      </h1>

      <p><span class="govuk-body govuk-!-font-weight-bold">Number of vacancies:</span> <span class="govuk-body"> 1</span></p>
      <p><span class="govuk-body govuk-!-font-weight-bold">Location:</span> <span class="govuk-body"> Royal Courts of Justice, London</span></p>
      <p><span class="govuk-body govuk-!-font-weight-bold">Salary:</span> <span class="govuk-body"> Salary Group 6, £134,841 a year</span></p>
      <p class="govuk-!-margin-bottom-8">
        <span class="govuk-body govuk-!-font-weight-bold">Contact:</span> <span class="govuk-body"> 092@jac.gov.uk</span>
      </p>

      <h2 class="govuk-heading-l">
        Timeline
      </h2>
      <Timeline :data="timeline" />

      <h2 class="govuk-heading-l">
        Overview of the role
      </h2>

      <p class="govuk-body">
        As Registrar of Criminal Appeals the post holder has responsibility for ensuring that
        applications and appeals
        received by the Court of Appeal Criminal Division are placed before the court in good time in accordance with
        the statutory powers conferred on them.
      </p>

      <p class="govuk-body">
        In exercising these powers, the Registrar must be able to demonstrate a deep understanding of criminal law,
        procedure and sentencing. The role entails providing judicial leadership to the legal and administrative staff
        of the Criminal Appeal Office; exercising their duty of active case management by giving directions for the
        progression of cases; holding directions hearings in open court; identifying, on a termly basis, which judges
        of the Court of Appeal are to sit in the Criminal Division; and liaising with, and seeking the direction of
        the Lord Chief Justice, the Vice President and other senior judges of the court. As Registrar of the Court
        Martial Appeal Court the post holder will exercise similar functions in relation to that court.
      </p>

      <h2 class="govuk-heading-l">
        The selection process
      </h2>

      <p class="govuk-body">
        There are 3 stages to the selection process.
      </p>

      <h3 class="govuk-heading-m">
        1. Check if you're eligible
      </h3>
      <p class="govuk-body">
        Check you meet all the eligibility requirements for this
        role. It's not a guarantee you're eligible – it's to give you an idea of whether you
        might be.
      </p>

      <h3 class="govuk-heading-m">
        2. The application form
      </h3>

      <p class="govuk-body">
        You'll need to complete your:
      </p>
      <ul class="govuk-list govuk-list--bullet">
        <li>qualifications</li>
        <li>work experience</li>
        <li> self-assessment competency statements</li>
        <li>independent assessors' details</li>
      </ul>

      <h3 class="govuk-heading-m">
        3. Selection day
      </h3>
      <p class="govuk-body">
        Shortlisted candidates are invited to selection days. These
        allow us to meet you in person to assess your suitability for the role. If you’re selected, we’ll email you a
        week before with
        details about what you’ll need to prepare for the day.
      </p>

      <button
        class="govuk-button"
      >
        Check if you're eligible and apply
      </button>

      <p class="govuk-body">
        <a href="#">Or get email updates about this role</a>
      </p>
    </div>

    <div class="govuk-grid-column-one-third">
      <h2 class="govuk-heading-m">
        Related content
      </h2>
      <p class="govuk-body">
        <a
          href="https://www.judicialappointments.gov.uk/overview-selection-process"
          target="_blank"
        >How we shortlist
          candidates</a>
      </p>
      <p class="govuk-body">
        <a
          href="https://www.judicialappointments.gov.uk/completing-your-self-assessment"
          target="_blank"
        >How to
          write your self-assessment competency statements</a>
      </p>
      <p class="govuk-body">
        <a
          href="https://www.judicialappointments.gov.uk/references-guidance-candidates"
          target="_blank"
        >How to
          choose your independent assessors</a>
      </p>
      <hr class="govuk-section-break govuk-section-break--xl govuk-section-break--visible">
    </div>
  </div>
</template>

<script>
import Timeline from '@/components/Page/Timeline';


export default {
  components: {
    Timeline,
  },
  computed: {

    timeline() {
      return [
        {
          'entry': 'Application deadline', 'date': '13:00 Wednesday 11 October 2019',
        },
        {
          'entry': 'Selection day', 'date': '22 to 24 November 2019, London. 28 to 30 November 2019, Birmingham',
        },
        {
          'entry': 'Candidates notified about appointment decision', 'date': 'January 2020',
        },
      ];
    },
  },
};

</script>
