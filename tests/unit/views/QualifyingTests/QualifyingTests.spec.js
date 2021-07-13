import QualifyingTests from '@/views/QualifyingTests/QualifyingTests.vue';
import { createTestSubject } from '../../helpers';

const mockQT = {
  status: 'activated',
  statusLog: {
    created: new Date('Dec 31 2019 00:00:00 GMT+0000'),
    activated: new Date('Jan 01 2020 09:00:00 GMT+0000'),
    // started: new Date('Oct 28 2020 13:43:37 GMT+0000'),
    // completed: new Date('Oct 28 2020 15:28:50 GMT+0000'),
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

const dateInTest = new Date('Jan 01 2020 09:15:00 GMT+0000');
const dateInPast = new Date('Jan 01 2019 00:00:00 GMT+0000');
const dateInFuture = new Date('Jan 01 2021 00:00:00 GMT+0000');

describe('views/QualifyingTests/QualifyingTests', () => {  
  let wrapper;
  
  beforeEach(()=>{
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
  
  describe('Open tab', () => { 
    Date.now = jest.fn(() => dateInTest);
    describe('Open tab, test not started', () => { 
      it('renders open tab by default', () => {
        expect(wrapper.find('h1.govuk-heading-l').text()).toBe('open');
      });
      it('status not started', () => {
        expect(wrapper.vm.status(wrapper.vm.$store.state.qualifyingTestResponses.records[0])).toBe('not-started');
      });
      it.only('lists open test as open', () => {
        expect(wrapper.vm.openTests.length).toBe(1);
      });
    });
    describe('Open tab, test started', () => { 
      beforeEach(()=>{
        wrapper.vm.$store.state.qualifyingTestResponses.records[0].statusLog.started = new Date('Oct 28 2020 09:30:00 GMT+0000');
        wrapper.vm.$store.state.qualifyingTestResponses.records[0].status = 'started';
      });
      it('lists open tests', () => {
        expect(wrapper.vm.openTests.length).toBe(1);
      });
      it('status started', () => {
        expect(wrapper.vm.status(wrapper.vm.$store.state.qualifyingTestResponses.records[0])).toBe('started');
      });
    });
    describe('Open tab, test reset, not restarted', () => { 
      beforeEach(()=>{
        wrapper.vm.$store.state.qualifyingTestResponses.records[0].statusLog = {
          created: new Date('Oct 27 2020 00:00:00 GMT+0000'),
          activated: new Date('Oct 27 2020 09:00:00 GMT+0000'),
          started: new Date('Oct 27 2020 09:30:00 GMT+0000'),
          completed: new Date('Oct 27 2020 10:00:00 GMT+0000'),
          reset: new Date('Oct 27 2020 10:30:00 GMT+0000'),
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
          created: new Date('Oct 27 2020 00:00:00 GMT+0000'),
          activated: new Date('Oct 27 2020 09:00:00 GMT+0000'),
          started: new Date('Oct 27 2020 09:30:00 GMT+0000'),
          completed: new Date('Oct 27 2020 10:00:00 GMT+0000'),
          reset: new Date('Oct 27 2020 10:30:00 GMT+0000'),
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
  Date.now = jest.fn(() => dateInPast);
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
  });
  
  describe('past tab', () => {
    Date.now = jest.fn(() => dateInFuture);
    beforeEach(()=>{
      wrapper.setData({
        activeTab: 'past',
      });
    });
    it('renders the component', () => {
      expect(wrapper.find('h1.govuk-heading-l').text()).toBe('past');
    });
  });
  
}); 
