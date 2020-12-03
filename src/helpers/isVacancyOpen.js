
const isVacancyOpen = (openDate, closeDate, extensionDate) => {

  if (openDate && closeDate) {
    const myCloseDate = extensionDate || closeDate;
    const today = new Date();
    return today > openDate && today < myCloseDate;
  }
  return false;
};

export default isVacancyOpen;
