import { difference, transformOnSelection } from '@/helpers/array';

describe('helpers/array/difference', () => {
  it('returns difference between two arrays', () => {
    expect(difference([1, 2, 3], [2, 3])).toEqual([1]);
    expect(difference([1, 2, 3], [1, 2, 3, 4])).toEqual([]);
  });
  it('returns empty array if two arrays are the same', () => {
    expect(difference([1, 2, 3], [1, 2, 3])).toEqual([]);
  });
});

describe('helpers/array/transformOnSelection', () => {
  it('returns original new value if there is no match of target value', () => {
    expect(transformOnSelection([1, 2], [1], 'prefer-not-to-say')).toEqual([1, 2]);
    expect(transformOnSelection([1], [1, 2], 'prefer-not-to-say')).toEqual([1]);
    expect(transformOnSelection([1, 2, 'prefer-not-to-say'], [1, 2], 'other')).toEqual([1, 2, 'prefer-not-to-say']);
  });
  it('returns an arry including only target value if new value contains it', () => {
    expect(transformOnSelection([1, 2, 'prefer-not-to-say'], [1, 2], 'prefer-not-to-say')).toEqual(['prefer-not-to-say']);
  });
});
