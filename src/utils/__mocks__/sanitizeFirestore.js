// Wrap sanitizeFirestore with a jest spy function so we can assert that it was called
// Insert a `sanitized` property in the resultant object so it's easy to detect

const realSanitizeFirestore = jest.requireActual('@/utils/sanitizeFirestore').default;

const sanitizeFirestore = jest.fn((data) => {
  // Return falsy values straight away
  if (!data) return data;

  const sanitized = realSanitizeFirestore(data);
  sanitized.sanitized = true;
  return sanitized;
});

export default sanitizeFirestore;
