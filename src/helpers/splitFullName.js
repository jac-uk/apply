export const splitFullName = (fullName) => {
  const name = fullName.split(' ');
  const firstName = name[0];
  name.shift();
  const lastName = name.join(' ');
  return ([firstName, lastName]);
};
