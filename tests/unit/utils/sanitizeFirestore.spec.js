import sanitizeFirestore from '@/utils/sanitizeFirestore';
import {Timestamp} from '@/firebase';

describe('utils/sanitizeFirestore', () => {
  const date = new Date('2015-12-23 22:33:44');
  const timestamp = Timestamp.fromDate(date);

  it('converts Firestore Timestamp objects into equivalent Date objects', () => {
    const data = {
      name: 'John Smith',
      applied_date: timestamp,
      qt_passed: true,
      qt_score: 28,
    };

    const sanitized = sanitizeFirestore(data);

    expect(sanitized.applied_date).toBeInstanceOf(Date);
    expect(sanitized.applied_date).toEqual(data.applied_date.toDate());
    expect(sanitized.applied_date).toEqual(date);
  });

  it('converts deeply nested Timestamps', () => {
    const data = {
      some: {
        deeply: {
          nested: {
            data: {
              with: {
                a: {
                  timestamp: timestamp,
                },
              },
            },
          },
        },
      },
    };

    const sanitized = sanitizeFirestore(data);

    expect(sanitized.some.deeply.nested.data.with.a.timestamp).toBeInstanceOf(Date);
    expect(sanitized.some.deeply.nested.data.with.a.timestamp).toEqual(date);
  });

  it('leaves other data untouched', () => {
    const data = {
      name: 'John Smith',
      phone: {
        home: '+441234567890',
        mobile: '+447890123456',
      },
      emails: [
        'jsmith@gmail.com',
        'john.smith@outlook.com',
      ],
      qt_passed: true,
      qt_score: 28,
      a_null_value: null,
    };

    const sanitized = sanitizeFirestore(data);

    expect(sanitized.name).toEqual('John Smith');
    expect(sanitized.phone).toEqual({
      home: '+441234567890',
      mobile: '+447890123456',
    });
    expect(sanitized.emails).toEqual([
      'jsmith@gmail.com',
      'john.smith@outlook.com',
    ]);
    expect(sanitized.qt_passed).toEqual(true);
    expect(sanitized.qt_score).toEqual(28);
    expect(sanitized.a_null_value).toBeNull();
  });

  it('doesn\'t change the input object (when passed by reference)', () => {
    const data = {
      name: 'John Smith',
      applied_date: timestamp,
      qt_passed: true,
      qt_score: 28,
    };

    sanitizeFirestore(data);

    expect(data.applied_date).toBe(timestamp);
  });

  it('returns a new object', () => {
    const data = {
      name: 'John Smith',
      email: 'johnsmith@example.com',
    };

    const sanitized = sanitizeFirestore(data);

    expect(sanitized).toEqual(data);
    expect(sanitized).not.toBe(data);
  });

  const falsy = [null, undefined, false];
  it.each(falsy)('does not sanitize falsy value `%s`', (value) => {
    const sanitized = sanitizeFirestore(value);
    expect(sanitized).toBe(value);
  });
});
