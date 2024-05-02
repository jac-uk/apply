/*eslint func-style: ["error", "declaration"]*/

export {
  filteredPreferences,
  tidyData
};

function filteredPreferences(vacancy, formData, formId) {
  if (!vacancy) return [];
  const preferences = vacancy[formId];  // all relevant preferences
  const allPreferences = [];
  if (vacancy.locationPreferences) allPreferences.push(...vacancy.locationPreferences);
  if (vacancy.jurisdictionPreferences) allPreferences.push(...vacancy.jurisdictionPreferences);
  if (vacancy.additionalWorkingPreferences) allPreferences.push(...vacancy.additionalWorkingPreferences);
  const allData = {};
  if (formData.locationPreferences) Object.assign(allData, formData.locationPreferences);
  if (formData.jurisdictionPreferences) Object.assign(allData, formData.jurisdictionPreferences);
  if (formData.additionalWorkingPreferences) Object.assign(allData, formData.additionalWorkingPreferences);
  const mainQuestions = [];
  const linkedQuestions = [];
  if (Array.isArray(preferences)) {
    preferences.forEach(item => {
      if (item.linkedQuestion && item.linkedAnswer) {
        if (!allData[item.linkedQuestion]) return;
        const linkedQuestion = allPreferences.find(question => question.id === item.linkedQuestion);
        if (linkedQuestion) {
          switch (linkedQuestion.questionType) {
          case 'single-choice':
            if (allData[item.linkedQuestion] === item.linkedAnswer) {
              linkedQuestions.push(item);
            }
            break;
          case 'multiple-choice':
            if (allData[item.linkedQuestion].indexOf(item.linkedAnswer) >= 0) {
              linkedQuestions.push(item);
            }
            break;
          case 'ranked-choice':
            if (Object.keys(allData[item.linkedQuestion]).includes(item.linkedAnswer)) {
              linkedQuestions.push(item);
            }
            break;
          }
        }
      } else {
        mainQuestions.push(item);
      }
    });
  }
  return mainQuestions.concat(linkedQuestions);
}

function tidyData(preferences, data, preference) {
  // check whether we can remove preference that was just updated
  if (preference) {
    const ident = preference.id;
    const type = preference.questionType;
    switch (type) {
    case 'single-choice':
      if (!data[ident]) {
        delete data[ident];
      }
      break;
    case 'multiple-choice':
      if (data[ident].length === 0) {
        delete data[ident];
      }
      break;
    case 'ranked-choice':
      if (Object.keys(data[ident]).length === 0) {
        delete data[ident];
      }
      break;
    }
  }
  // remove unused answers
  Object.keys(data).filter(key => key !== 'progress').forEach(key => {
    if (!preferences.find(item => item.id === key)) {
      delete data[key];
    }
  });

}
