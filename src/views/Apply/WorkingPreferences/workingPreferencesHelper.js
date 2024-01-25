/*eslint func-style: ["error", "declaration"]*/

export {
  filteredPreferences,
  tidyData
};

function filteredPreferences(preferences, data) {
  if (!preferences) return [];
  const mainQuestions = [];
  const linkedQuestions = [];
  preferences.forEach(item => {
    if (item.linkedQuestion && item.linkedAnswer) {
      if (!data[item.linkedQuestion]) return;
      const linkedQuestion = preferences.find(question => question.question === item.linkedQuestion);
      if (linkedQuestion) {
        switch (linkedQuestion.questionType) {
        case 'single-choice':
          if (data[item.linkedQuestion] === item.linkedAnswer) {
            linkedQuestions.push(item);
          }
          break;
        case 'multiple-choice':
          if (data[item.linkedQuestion].indexOf(item.linkedAnswer) >= 0) {
            linkedQuestions.push(item);
          }
          break;
        case 'ranked-choice':
          if (Object.keys(data[item.linkedQuestion]).includes(item.linkedAnswer)) {
            linkedQuestions.push(item);
          }
          break;
        }
      }
    } else {
      mainQuestions.push(item);
    }
  });
  return mainQuestions.concat(linkedQuestions);
}

function tidyData(preferences, data, preference) {
  // check whether we can remove preference that was just updated
  if (preference) {
    const ident = preference.question;
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
    if (!preferences.find(item => item.question === key)) {
      delete data[key];
    }
  });  

}
