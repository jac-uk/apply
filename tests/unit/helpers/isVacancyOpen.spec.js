import isVacancyOpen from '@/helpers/isVacancyOpen';

let today = new Date();
const dateInTheFuture = new Date(today.setDate(today.getDate() + 7));
today = new Date();
const dateInThePast = new Date(today.setDate(today.getDate() - 7));
const dateInThePastLong = new Date(today.setDate(today.getDate() - 30));

// console.log('dateInTheFuture', dateInTheFuture);
// console.log('dateInThePast', dateInThePast);
// console.log('dateInThePastLong', dateInThePastLong);

// isVacancyOpen(openDate, closeDate, extensionDate)

describe('Helpers isVacancyOpen', () => {

  describe('Vacancy is Open', () => {
    it('OpenDate in the past and close date in the future', () => {
      expect(isVacancyOpen(dateInThePastLong, dateInTheFuture, undefined)).toBe(true);
    });

    it('ExtendedDate in the future overrides closeDate', () => {
      expect(isVacancyOpen(dateInThePastLong, dateInThePast, dateInTheFuture)).toBe(true);
    });
  });

  describe('Vacancy is Closed', () => {

    it('Open and close dates in the past', () => {
      expect(isVacancyOpen(dateInThePastLong, dateInThePast, undefined)).toBe(false);
    });

    it('ExtendedDate in the past overrides closeDate', () => {
      expect(isVacancyOpen(dateInThePastLong, dateInThePast, dateInThePastLong)).toBe(false);
    });

    it('no openDate', () => {
      expect(isVacancyOpen('', dateInThePast, dateInTheFuture)).toBe(false);
    });

    it('no closeDate', () => {
      expect(isVacancyOpen(dateInThePastLong, '', dateInTheFuture)).toBe(false);
    });

    it('null values', () => {
      expect(isVacancyOpen(null, null, null)).toBe(false);
    });

    it('empty values', () => {
      expect(isVacancyOpen('', '', '')).toBe(false);
    });

    it('undefined values', () => {
      expect(isVacancyOpen(undefined, undefined, undefined)).toBe(false);
    });
  });
});
