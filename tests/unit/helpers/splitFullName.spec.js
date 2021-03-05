import { splitFullName } from '@/helpers/splitFullName';

describe('@/helpers/splitFullName', () => {
  it('is a function', () => {
    expect(splitFullName).toBeInstanceOf(Function);
  });

describe('when `first name` contains one value and `last name` contains one value', () => {
  it('correctly splits `full name` into `first name` and `last name`', () => {
    const result = splitFullName('John Smith');
    expect(result[0]).toBe('John');
    expect(result[1]).toBe('Smith');
  });
});

  describe('when `first name` contains one value and `last name` contains two values', () => {
    it('correctly splits `full name` into `first name` and `last name`', () => {
      const result = splitFullName('John Parker Smith');
      expect(result[0]).toBe('John');
      expect(result[1]).toBe('Parker Smith');
    });
  });

  describe('when `first name` contains two hyphenated values and `last name` contains one value', () => {
    it('correctly splits `full name` into `first name` and `last name`', () => {
      const result = splitFullName('Lauren-May Smith');
      expect(result[0]).toBe('Lauren-May');
      expect(result[1]).toBe('Smith');
    });
  });

  describe('when `first name` contains one value and `last name` contains two hyphenated values', () => {
    it('correctly splits `full name` into `first name` and `last name`', () => {
      const result = splitFullName('John Parker-Smith');
      expect(result[0]).toBe('John');
      expect(result[1]).toBe('Parker-Smith');
    });
  });

});
