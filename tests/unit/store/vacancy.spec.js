import vacancy from '@/store/vacancy';

describe('store/vacancy', () => {
    const getters = vacancy.getters;
    let state;
    const mockVacancy = {
        name: 'OPEN VACANCY',
        applicationOpenDate: 'pastDate',
        applicationCloseDate: 'futureDate',
        id: 'mockID',
    };
    
    beforeEach(() => {
        state = {
            record: {},
        };
    });
    describe('getters', () => {
        describe('id', () => {
            it('returns id if record.id is not null ', () => {
                state.record = mockVacancy;
                expect(getters.id(state)).toEqual(mockVacancy.id);
            });
            it('returns null if record.id is null', () => {
                state.record.id = null;
                expect(getters.id(state)).toEqual(null);
            });
        });
    });
});                

