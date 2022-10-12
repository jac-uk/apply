import * as filters from '@/filters';

describe('global filters', () => {

  describe('capitalize', () => {
    it('empty if no value supplied', () => {
      const result = filters.capitalize();
      expect(result).toBeEmpty();
    });
    it('first letter capitalized', () => {
      const myString = 'the first letter should be capitalized';
      const myStringReturn = 'The first letter should be capitalized';
      const result = filters.capitalize(myString);
      expect(result).toBe(myStringReturn);
    });

    describe('dealing with Numbers', () => {
      const myNumber = 123456789;
      const myNumberReturn = '123456789';

      it('convert numbers to string', () => {
        const result = filters.capitalize(myNumber);
        expect(result).toBeString();
      });
      it('Do not capitalize the first number character', () => {
        const result = filters.capitalize(myNumber);
        expect(result).toBe(myNumberReturn);
      });
    });

    describe('dealing with Arrays', () => {
      const myArray = ['one', 'two', 'three'];
      const myArrayResult = 'One,two,three';

      it('convert Arrays to string', () => {
        const result = filters.capitalize(myArray);
        expect(result).toBeString();
      });
      it('capitalize the first letter of Array', () => {
        const result = filters.capitalize(myArray);
        expect(result).toBe(myArrayResult);
      });
    });

    describe('dealing with Objects', () => {
      const myObj = { one: 'one', two: 'two', three: 'three' };

      it('convert Objects to string', () => {
        const result = filters.capitalize(myObj);
        expect(result).toBeString();
      });
    });
  });

  describe('hyphenize', () => {
    it('empty if no value supplied', () => {
      const result = filters.hyphenize();
      expect(result).toBeEmpty();
    });

    it('returns a string if called with a boolean', () => {
      const myVal = true;
      const myValreturn = 'true';

      const result = filters.hyphenize(myVal);
      expect(result).toBeString();
      expect(result).toBe(myValreturn);
    });

    describe('dealing with Strings', () => {
      const myString = 'The string should be Hyphenize';
      const myStringReturn = 'the-string-should-be-hyphenize';

      it('should return a lowercased string with "-" on the spaces', () => {
        const result = filters.hyphenize(myString);
        expect(result).toBe(myStringReturn);
      });
    });

    describe('dealing with Numbers', () => {
      const myNumber = 123456789;

      it('convert numbers to string', () => {
        const result = filters.hyphenize(myNumber);
        expect(result).toBeString();
      });
      it('Hyphenate the numbers in strings', () => {
        const myNumber = '12 345 6789';
        const myNumberReturn = '12-345-6789';
        const result = filters.hyphenize(myNumber);
        expect(result).toBe(myNumberReturn);
      });
    });

    describe('dealing with Arrays', () => {
      const myArray = ['one', 'two', 'three'];

      it('to be empty', () => {
        const result = filters.hyphenize(myArray);
        expect(result).toBeEmpty();
      });
    });

    describe('dealing with Objects', () => {
      const myObj = { one: 'one', two: 'two', three: 'three' };
      it('to be empty', () => {
        const result = filters.hyphenize(myObj);
        expect(result).toBeEmpty();
      });
    });
  });

  describe('formatDate', () => {
    it('doesn\'t return anything if no value supplied', () => {
      const result = filters.formatDate();

      expect(result).toBeUndefined();
    });

    describe('called with a Date argument', () => {

      xit('returns a full formatted date if a value was supplied', () => {
        const date = new Date();

        const result = filters.formatDate(date);
        expect(result).toEqual(date.toLocaleDateString());
      });

      it('returns a short date if called with type "month"', () => {
        const date = new Date();

        const result = filters.formatDate(date, 'month');
        expect(result).toEqual(`${date.toLocaleString('default', { month: 'long' })} ${date.getUTCFullYear()}`);
      });
    });
  });

  describe('toYesNo', () => {
    it('returns original value if not Boolean', () => {
      const stringValue = 'mock value';

      const result = filters.toYesNo(stringValue);

      expect(result).toEqual(stringValue);
    });

    describe('called with a boolean argument', () => {
      it('returns "Yes" if value was "true"', () => {
        const boolValue = true;

        const result = filters.toYesNo(boolValue);

        expect(result).toEqual('Yes');
      });

      it('returns "No" if value was "false"', () => {
        const boolValue = false;

        const result = filters.toYesNo(boolValue);

        expect(result).toEqual('No');
      });
    });
  });

  describe('lookup', () => {
    it('returns original value if not a string/null', () => {
      const numberValue = 42;

      const result = filters.lookup(numberValue);

      expect(result).toEqual(numberValue);
    });

    it('returns default "unanswered" if null', () => {
      const nullValue = null;

      const result = filters.lookup(nullValue);

      expect(result).toEqual('Answer not supplied');
    });

    it('returns "unanswered" if no value provided', () => {
      const result = filters.lookup();

      expect(result).toEqual('Answer not supplied');
    });

    describe('called with a String argument', () => {
      it('returns converted value if match found', () => {
        const validValue = 'gender-neutral';

        const result = filters.lookup(validValue);

        expect(result).toEqual('Gender neutral');
      });

      it('returns original value if match not found', () => {
        const invalidValue = 'unicorns-and-rainbows';

        const result = filters.lookup(invalidValue);

        expect(result).toEqual(invalidValue);
      });
    });
  });
});
