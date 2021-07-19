import QualifyingTests from '@/views/QualifyingTests/QualifyingTests.vue';
import { createTestSubject } from '../../helpers';

const dateInTest = new Date('2020-01-01T09:15:00Z');
const dateInPast = new Date('2019-01-01T09:15:00Z');
const dateInFuture = new Date('2021-01-01T09:15:00Z');

const started = {
  date: new Date('Jan 01 2020 09:30:00 GMT+0000'),
  status: 'started',
};

const completed = {
  date: new Date('Jan 01 2020 10:00:00 GMT+0000'),
  status: 'completed',
};

const reset = {
  date: new Date('Jan 01 2020 10:30:00 GMT+0000'),
  status: 'reset',
};

const activated = {
  date: new Date('Jan 01 2020 09:00:00 GMT+0000'),
  status: 'activated',
};

const created = {
  date: new Date('Dec 31 2019 00:00:00 GMT+0000'),
  status: 'created',
};

const mockQT = {
  status: 'activated',
  statusLog: {
    created: created.date,
    activated: activated.date,
  },
  qualifyingTest: {
    startDate: new Date('Jan 01 2020 00:00:00 GMT+0000'),
    endDate: new Date('Jan 01 2020 23:59:00 GMT+0000'),
  },
  duration: {
    testDurationAdjusted: 40,
    testDuration: 40,
    reasonableAdjustment: 0,
  },
};

const RealDate = Date.now;

describe('views/QualifyingTests/QualifyingTests', () => {  
  let wrapper;

  beforeEach(() => {
    wrapper = createTestSubject(QualifyingTests, {
      stubs: ['RouterLink'],
    });
    wrapper.vm.$store.state.qualifyingTestResponses.records = [
      mockQT, 
    ];
  });
  
  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  
  describe('tabs', () => { 
    describe('Open tab', () => { 

      beforeAll(() => {
        global.Date.now = jest.fn(() => dateInTest);
      });

      afterAll(() => {
        global.Date.now = RealDate;
      });

      describe('Open tab, test not started', () => {

        it('renders open tab by default', () => {
          expect(wrapper.find('h1.govuk-heading-l').text()).toBe('open');
        });

        it('status not started', () => {
          expect(wrapper.vm.status(wrapper.vm.$store.state.qualifyingTestResponses.records[0])).toBe('not-started');
        });

        it('lists open test as open', () => {
          expect(wrapper.vm.openTests.length).toBe(1);
        });
      });

      describe('Open tab, test started', () => { 
        beforeEach(()=>{
          wrapper.vm.$store.state.qualifyingTestResponses.records[0].statusLog.started = started.date;
          wrapper.vm.$store.state.qualifyingTestResponses.records[0].status = started.status;
        });
        it('lists open tests', () => {
          expect(wrapper.vm.openTests.length).toBe(1);
        });
        it('status started', () => {
          expect(wrapper.vm.status(wrapper.vm.$store.state.qualifyingTestResponses.records[0])).toBe(started.status);
        });
      });
      
      describe('Open tab, test reset, not restarted', () => { 
        beforeEach(()=>{
          wrapper.vm.$store.state.qualifyingTestResponses.records[0].statusLog = {
            ...wrapper.vm.$store.state.qualifyingTestResponses.records[0].statusLog,
            completed: completed.date,
            reset: reset.date,
          };
          wrapper.vm.$store.state.qualifyingTestResponses.records[0].status = 'activated';
        });
        it('lists open tests', () => {
          expect(wrapper.vm.openTests.length).toBe(1);
        });
        it('status started', () => {
          expect(wrapper.vm.status(wrapper.vm.$store.state.qualifyingTestResponses.records[0])).toBe('not-started');
        });
      });

      describe('Open tab, test reset, restarted', () => { 
        beforeEach(()=>{
          wrapper.vm.$store.state.qualifyingTestResponses.records[0].statusLog = {
            created: new Date('Jan 01 2020 00:00:00 GMT+0000'),
            activated: new Date('Jan 01 2020 09:00:00 GMT+0000'),
            started: new Date('Jan 01 2020 09:30:00 GMT+0000'),
            completed: new Date('Jan 01 2020 10:00:00 GMT+0000'),
            reset: new Date('Jan 01 2020 10:30:00 GMT+0000'),
          };
          wrapper.vm.$store.state.qualifyingTestResponses.records[0].status = 'started';
        });
        it('lists open tests', () => {
          expect(wrapper.vm.openTests.length).toBe(1);
        });
        it('status started', () => {
          expect(wrapper.vm.status(wrapper.vm.$store.state.qualifyingTestResponses.records[0])).toBe('started');
        });
      });
    });

    describe('future tab', () => {

      beforeAll(() => {
        global.Date.now = jest.fn(() => dateInPast);
      });

      afterAll(() => {
        global.Date.now = RealDate;
      });

      beforeEach(()=>{
        wrapper.setData({
          activeTab: 'future',
        });
      });

      it('future tab open', () => {
        expect(wrapper.find('h1.govuk-heading-l').text()).toBe('future');
      });

      it('lists open tests', () => {
        expect(wrapper.vm.futureTests.length).toBe(1);
      });
      
      xit('status', () => {
        expect(wrapper.vm.status(wrapper.vm.$store.state.qualifyingTestResponses.records[0])).toBe('not-started');
      });
    });

    describe('past tab', () => {

      beforeAll(() => {
        global.Date.now = jest.fn(() => dateInFuture);
      });

      afterAll(() => {
        global.Date.now = RealDate;
      });  

      beforeEach(()=>{
        wrapper.setData({
          activeTab: 'past',
        });
      });

      it('past tab open', () => {
        expect(wrapper.find('h1.govuk-heading-l').text()).toBe('past');
      });

      it('lists open tests', () => {
        expect(wrapper.vm.closedTests.length).toBe(1);
      });
      
      xit('status', () => {
        expect(wrapper.vm.status(wrapper.vm.$store.state.qualifyingTestResponses.records[0])).toBe('not-started');
      });
    });
  });

}); 
