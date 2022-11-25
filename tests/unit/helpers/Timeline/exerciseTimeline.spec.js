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
                    'dateString': '0 am on 1 January 1999',
                    'entry': 'Return date for independent assessments',
                },
            ]);
        });
    });
    describe('eligibilitySCCDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                eligibilitySCCDate: new Date('2000'),
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
    describe('SelectionDays', () => {
        it('formats and returns', () => {
            timelineArray = { 
                selectionDays: [
                    new Date(),
                ],
            };
            expect(exerciseTimeline(timelineArray)).toEqual([]);
        });
    });
    describe('characterChecksDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                characterChecksDate: new Date('2001'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([{
                'date': new Date('2001'),
                'dateString': '1 January 2001',
                'entry': 'Character checks',
            }]);
        });
    });
    describe('finalOutcome', () => {
        it('formats and returns', () => {
            timelineArray = { 
                finalOutcome: new Date('2002'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([{
                'date': new Date('2002'),
                'dateString': 'January 2002',
                'entry': 'Selection process outcome',
            }]);
        });
    });
    describe('equalMeritSecondStageStartDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                equalMeritSecondStageStartDate: new Date('2003'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([{
                'date': new Date('2003'),
                'dateString': '',
                'entry': 'Equal merit second stage',
            }]);
        });
    });
    describe('eMpSCCDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                eMPSCCDate: new Date('2004'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([{
                'date': new Date('2004'),
                'dateString': '1 January 2004',
                'entry': 'EMP SCC',
            }]);
        });
    });
    describe('eMPOutComeDate', () => {
        it('formats and returns', () => {
            timelineArray = { 
                eMPOutcomeDate: new Date('2005'),
            };
            expect(exerciseTimeline(timelineArray)).toEqual([{
                'date': new Date('2005'),
                'dateString': 'January 2005',
                'entry': 'EMP Outcomes',
            }]);
        });
    });
});

