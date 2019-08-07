import { Timestamp } from '@/firebase';

/**
 * A utility method to sanitize data from a Firestore record
 *
 * Data returned from a Firestore document may contain objects which make it unsuitable for a vuex store.
 * Vuex stores work best when they contain plain JavaScript objects with Primitive values and plain Date objects.
 *
 * Beyond JS Primitives, Firestore records may contain Timestamp objects (a special object provided by the Firebase SDK)
 * as well as DocumentReference objects (in the case of 'reference' fields).
 *
 * This method will:
 *    - convert firebase.firestore.Timestamp objects into plain Date objects
 *
 * Example usage:
 *    import sanitizeFirestore from '@/utils/sanitize-firestore';
 *    const data = sanitizeFirestore(documentSnapshot.data());
 */

const reviver = (key, value) => {
  // Convert serialized Timestamp objects to Date objects
  if (value && typeof value == 'object' && typeof value.seconds == 'number' && typeof value.nanoseconds == 'number') {
    value = new Timestamp(value.seconds, value.nanoseconds).toDate();
  }
  return value;
};

const sanitizeFirestore = (data) => {
  // Return falsy values straight away
  if (!data) return data;

  const json = JSON.stringify(data);
  return JSON.parse(json, reviver);
};

export default sanitizeFirestore;
