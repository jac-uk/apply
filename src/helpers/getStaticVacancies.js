import staticVacancies from '@/assets/vacancies.json';

const getStaticVacancies = () => {
  return staticVacancies.map(vacancy => {
    if (typeof vacancy.applicationOpenDate === 'string' && vacancy.applicationOpenDate.length) {
      vacancy.applicationOpenDate = new Date(vacancy.applicationOpenDate);
    }

    if (typeof vacancy.applicationCloseDate === 'string' && vacancy.applicationCloseDate.length) {
      vacancy.applicationCloseDate = new Date(vacancy.applicationCloseDate);
    }

    return vacancy;
  });
};

export default getStaticVacancies;
