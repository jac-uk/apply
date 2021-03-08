import { splitFullName } from '@/helpers/splitFullName';

describe('@/helpers/splitFullName', () => {
  it('is a function', () => {
    expect(splitFullName).toBeInstanceOf(Function);
  });

describe('when `full name` contains two single words', () => {
  it('splits `full name` into `first name` and `last name`', () => {
    const result = splitFullName('John Smith');
    expect(result[0]).toBe('John');
    expect(result[1]).toBe('Smith');
  });
});

  describe('when `full name` contains one word', () => {
    it('places the value into `last name`', () => {
      const result = splitFullName('Smith');
      expect(result[0]).toBe('');
      expect(result[1]).toBe('Smith');
    });
  });

  describe('when `full name` contains two words with a hyphen', () => {
    it('places the value into `last name`', () => {
      const result = splitFullName('Parker-Smith');
      expect(result[0]).toBe('');
      expect(result[1]).toBe('Parker-Smith');
    });
  });

  describe('when `full name` contains three single words', () => {
    it('places first word into `first name` and two other words into `last name`', () => {
      const result = splitFullName('John Parker Smith');
      expect(result[0]).toBe('John');
      expect(result[1]).toBe('Parker Smith');
    });
  });

  describe('when `full name` contains two words with a hyphen and a single word', () => {
    it('places the hyphenated value into `first name` and a single value into `last name`', () => {
      const result = splitFullName('Lauren-May Smith');
      expect(result[0]).toBe('Lauren-May');
      expect(result[1]).toBe('Smith');
    });
  });

  describe('when `full name` contains a single word and two words with a hyphen', () => {
    it('places a single value into `first name` and a hyphenated value into `last name`', () => {
      const result = splitFullName('John Parker-Smith');
      expect(result[0]).toBe('John');
      expect(result[1]).toBe('Parker-Smith');
    });
  });

});
