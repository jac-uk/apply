import createTimeline from '@/helpers/Timeline/createTimeline';
const TimelineArray = [
  {
    date: new Date() - 1,
    name: 'one',
  },
  {
    date: new Date() - 2,
    name: 'two',
  },
  {
    date: new Date() - 3,
    name: 'three',
  },
  {
    date: new Date() - 4,
    name: 'four',
  },
  {
    date: new Date() - 5,
    name: 'five',
  },
];
const reversedTlArray = TimelineArray.reverse();

describe('helpers/Form/createTimeline', () => {
  describe('given an array with a length of 5', () => {
    describe('when maxEntriesNum is 0', () => {
      it('doesn\'t modify array', () => {
        expect(createTimeline(TimelineArray, 0).length).toEqual(5);
      });
    });
    describe('when maxEntriesNum is 4', () => {
      it('trims length to 4', () => {
        expect(createTimeline(TimelineArray, 4).length).toEqual(4);
      });
    });
  });
  xdescribe('when maxEntriesNum is 0', () => {
    it('sorts resulting array', () => {
      expect(createTimeline(TimelineArray, 0)).toEqual(reversedTlArray);
    });
  });
  xdescribe('when maxEntriesNum is 4', () => {
    it('sorts array and clips it', () => {
      expect(createTimeline(TimelineArray, 4)).toEqual(reversedTlArray.slice(0,4));
    });
  });
});

