import filters from '@/filters';

describe('global filters', () => {
  describe('formatDate', () => {
    it('doesn\'t return anything if no value supplied', () => {
      const result = filters.formatDate();

      expect(result).toBeUndefined();
    });

    describe('called with a Date argument', () => {

      it('returns a full formatted date if a value was supplied', () => {
        const date = new Date();

        const result = filters.formatDate(date);
        expect(result).toEqual(date.toLocaleDateString());
      });

      it('returns a short date if called with type "month"', () => {
        const date = new Date();

        const result = filters.formatDate(date, 'month');
        expect(result).toEqual(`${date.toLocaleString('default', {month: 'long'})} ${date.getUTCFullYear()}`);
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

      expect(result).toEqual('Answer not supplied')
    });

    it('returns "unanswered" if no value provided', () => {
      const result = filters.lookup();

      expect(result).toEqual('Answer not supplied')
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
      })
    });
  });
});
