import exerciseTimeline from '@/helpers/Timeline/exerciseTimeline';

let timelineArray;

describe('helpers/Form/exerciseTimeline', () => {
    describe('applicationOpenDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                applicationOpenDate: new Date('1995'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([
                {
                    'date': new Date('1995'),
                    'dateString': '1 January 1995',
                    'entry': 'Open for applications',
                },
            ]);
        });
    });
    describe('applicationCloseDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                applicationCloseDate: new Date('1996'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([
                {
                    'date': new Date('1996'),
                    'dateString': '1 January 1996',
                    'entry': 'Closed for applications',
                },
            ]);
        });
    });
    describe('shortlistingMethods', () => {
        it('formats and returns', () => {
            timelineArray = { 
                shortlistingMethods: [
                    'name-blind-paper-sift',
                    'telephone-assessment',
                ],
            };
            expect(exerciseTimeline(timelineArray)).toEqual([
                {
                    'date': undefined,
                    'dateString': '',
                    'entry': 'Name-blind sift',
                },
                {
                    'date': undefined,
                    'dateString': '',
                    'entry': 'Telephone assessment',
                },
            ]);
        });
    });
    describe('shortlistingOutcomeDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                shortlistingOutcomeDate: new Date('1997'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([
                {
                    'date': new Date('1997'),
                    'dateString': 'January 1997',
                    'entry': 'Shortlisting outcome',
                },
            ]);
        });
    });
    describe('contactIndependentAssessors', () => {
        it('formats and returns', () => {
            timelineArray = { 
                contactIndependentAssessors: new Date('1998'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([
                {
                    'date': new Date('1998'),
                    'dateString': '1 January 1998',
                    'entry': 'JAC Contacts Independent Assessors',
                },
            ]);
        });
    });
    describe('independentAssessmentsReturnDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                independentAssessmentsReturnDate: new Date('1999'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([
                {
                    'date': new Date('1999'),
                    'dateString': '1 January 1999',
                    'entry': 'Return date for independent assessments',
                },
            ]);
        });
    });
    describe('independentAssessmentsReturnDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                eligibilitySCCDate: new Date('2000'),
                // selectionDays: [
                //     new Date(),
                // ],
                // characterChecksDate: new Date(),
                // finalOutcome: new Date(),
                // equalMeritSecondStageStartDate: new Date,
                // eMPSCCDate: new Date(),
                // eMPOutcomeDate: new Date(),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([
                {
                    'date': new Date('2000'),
                    'dateString': '1 January 2000',
                    'entry': 'Eligibility SCC',
                },
            ]);
        });
    });
});

