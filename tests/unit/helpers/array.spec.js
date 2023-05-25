import * as arrayHelper from '@/helpers/array';

describe('helpers/array/difference', () => {
  it('returns difference between two arrays', () => {
    expect(arrayHelper.difference([1, 2, 3], [2, 3])).toBeArray([1]);
    expect(arrayHelper.difference([1, 2, 3], [1, 2, 3, 4])).toBeArray([]);
  });
  it('returns empty array if two arrays are the same', () => {
    expect(arrayHelper.difference([1, 2, 3], [1, 2, 3])).toBeArray([]);
  });
});
