import vacancies from '@/store/vacancies';

describe('store/vacancies', () => {
  const getters = vacancies.getters;
  let state;

  const pastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const pastDate2 = new Date(new Date().setFullYear(new Date().getFullYear() - 2));
  const futureDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  const mockVacancies = [
    {
      name: 'OPEN VACANCY',
      applicationOpenDate: pastDate,
      applicationCloseDate: futureDate,
    },
    {
      name: 'FUTURE VACANCY',
      applicationOpenDate: futureDate,
      applicationCloseDate: futureDate,
    },
    {
      name: 'PROGRESS VACANCY',
      applicationOpenDate: pastDate,
      applicationCloseDate: pastDate,
    },
  ];

  beforeEach(() => {
    state = {
      records: [],
      allRecords: [],
    };
  });

  describe('getters', () => {
    describe('vacancies', () => {
      it('returns all records', () => {
        state.records = mockVacancies;

        expect(getters.vacancies(state)).toEqual(mockVacancies);
      });
    });

    describe('openVacancies', () => {
      it('returns only open vacancies', () => {
        const openVacancies = getters.openVacancies(state, { allVacancies: mockVacancies });

        expect(openVacancies.length).toEqual(1);
        expect(openVacancies[0].name).toEqual('OPEN VACANCY');
      });

      it('checks estimatedLaunchDate if applicationStartDate not supplied', () => {
        const mockName = 'OPEN VACANCY WITHOUT START DATE';
        const mockOpenVacancy = {
          name: mockName,
          estimatedLaunchDate: pastDate2,
          applicationCloseDate: futureDate,
        };

        const openVacancies = getters.openVacancies(state, { allVacancies: [mockOpenVacancy, ...mockVacancies] });

        expect(openVacancies.length).toEqual(2);
        expect(openVacancies[0].name).toEqual(mockName);
      });

      it('includes vacancies without set close date', () => {
        const mockName = 'OPEN VACANCY WITHOUT CLOSE DATE';
        const mockOpenVacancy = {
          name: mockName,
          applicationOpenDate: pastDate,
        };

        const openVacancies = getters.openVacancies(state, { allVacancies: [mockOpenVacancy, ...mockVacancies] });

        expect(openVacancies.length).toEqual(2);
        expect(openVacancies[0].name).toEqual(mockName);
      });
    });
    describe('futureVacancies', () => {
      it('returns only future vacancies', () => {

        const futureVacancies = getters.futureVacancies(state, { allVacancies: mockVacancies });

        expect(futureVacancies.length).toEqual(1);
        expect(futureVacancies[0].name).toEqual('FUTURE VACANCY');
      });

      it('checks estimatedLaunchDate if applicationStartDate not supplied', () => {
        const mockName = 'FUTURE VACANCY WITHOUT START DATE';
        const mockFutureVacancy = {
          name: mockName,
          estimatedLaunchDate: futureDate,
        };

        const futureVacancies = getters.futureVacancies(state, { allVacancies: [mockFutureVacancy, ...mockVacancies] });

        expect(futureVacancies.length).toEqual(2);
        expect(futureVacancies[0].name).toEqual(mockName);
      });
      it('includes vacancies without set close date', () => {
        const mockName = 'FUTURE VACANCY WITHOUT CLOSE DATE';
        const mockFutureVacancy = {
          name: mockName,
          applicationOpenDate: futureDate,
        };

        const futureVacancies = getters.futureVacancies(state, { allVacancies: [mockFutureVacancy, ...mockVacancies] });

        expect(futureVacancies.length).toEqual(2);
        expect(futureVacancies[0].name).toEqual(mockName);
      });
    });

    describe('inProgressVacancies', () => {
      it('returns only exercises in progress', () => {

        const inProgressVacancies = getters.inProgressVacancies(state, { allVacancies: mockVacancies });

        expect(inProgressVacancies.length).toEqual(1);
        expect(inProgressVacancies[0].name).toEqual('PROGRESS VACANCY');
      });

      it('excludes vacancies without set close date', () => {
        const mockName = 'PROGRESS VACANCY WITHOUT CLOSE DATE';
        const mockInProgressVacancy = {
          name: mockName,
            applicationOpenDate: pastDate,
        };

        const inProgressVacancies = getters.inProgressVacancies(state, { allVacancies: [mockInProgressVacancy, ...mockVacancies] });

        expect(inProgressVacancies.length).toEqual(1);
        expect(inProgressVacancies[0].name).toEqual('PROGRESS VACANCY');
      });
    });

  });
});
